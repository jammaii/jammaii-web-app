// Inspired by react-hot-toast library
import * as React from 'react';

import type { ToastActionElement, ToastProps } from '@/components/ui/toast';
import {
  GENERIC_ERROR_MESSAGE,
  GENERIC_SUCCESS_MESSAGE
} from '@/constants/strings';
import { isString, safeParseJSON } from '@/lib/utils';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  custom?: React.ReactNode;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = {
  ADD_TOAST: 'ADD_TOAST';
  UPDATE_TOAST: 'UPDATE_TOAST';
  DISMISS_TOAST: 'DISMISS_TOAST';
  REMOVE_TOAST: 'REMOVE_TOAST';
};

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false
              }
            : t
        )
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id }
    });
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });

  return {
    id: id,
    dismiss,
    update
  };
}

/**
 * Toast error messages.
 * This extends the TRPC error or any error object that includes a message prop.
 */
const toastError = <T extends { message?: string }>(
  error?: T | null | undefined
) => {
  toast({
    variant: 'destructive',
    description: getErrorMessage(error)
  });
};

const getErrorMessage = <T extends { message?: string }>(
  error?: T | null | undefined
) => {
  if (!error?.message) return GENERIC_ERROR_MESSAGE;

  // This is important for zod validation errors which returns
  // a stringified array of error instead of a single error message.
  const parsedError = safeParseJSON(error.message);

  // JSON parse fails which means error.message is just a plain string.
  if (parsedError === undefined) return error.message;

  // Return `GENERIC_ERROR_MESSAGE` when parsed value is null.
  if (!parsedError) return GENERIC_ERROR_MESSAGE;

  // This will most likely never happen since JSON.parse returns an object.
  // This is to aid the type inference in the code portion below.
  if (typeof parsedError !== 'object') return error.message;

  // If the error.message is a stringifed javascript object.
  if (!Array.isArray(parsedError)) {
    // Return the message property of the object, if it exists.
    if ('message' in parsedError && isString(parsedError.message))
      return parsedError.message;

    // Most likely never happen but will be a good debug tool if it does.
    return error.message;
  }

  // This is for validation errors which is returned as an array.
  // We only show the first item to the user.
  const innerErrorItem: unknown = parsedError[0];

  // Confirm that the item is a valid error object, then return message.
  if (
    innerErrorItem &&
    typeof innerErrorItem === 'object' &&
    !Array.isArray(innerErrorItem) &&
    'message' in innerErrorItem &&
    isString(innerErrorItem.message)
  )
    return innerErrorItem.message;

  // Most likely never happen but will be a good debug tool if it does.
  // Also aids the type inference.
  return error.message;
};

/**
 * Toast success messages.
 * You can provide an optional message to show. Defaults to `GENERIC_SUCCESS_MESSAGE`.
 * Options.quiet can be set to an expression that resolves to a boolean. When it is
 * true, the toast doesn't go off. An e.g is when you only want toast when data is defined.
 */
const toastSuccess = (options?: { message?: string; quiet?: boolean }) => {
  if (options?.quiet) return;

  const successMessage = options?.message || GENERIC_SUCCESS_MESSAGE;

  toast({
    variant: 'default',
    description: successMessage
  });
};

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
    toastError,
    toastSuccess
  };
}

export { useToast };
