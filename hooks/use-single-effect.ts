import { type DependencyList, useEffect, useRef } from "react";

/**
 * The normal useEffect has a default behaviour of being called twice at every render, this behaviour is what this hook removes. it still works like the usual useEffect, so it rerenders once its dependency changes, but that renrender will only occur once. As such, this hook can be used as a more optimized alternative for useEffect. This behaviour is only applicable in dev mode so the hook is only different from the normal useEffect in dev mode. In prod, it has no additional impact, just a regular useEffect.
 */
export const useSingleEffect = (
  action: () => void,
  dependencies?: DependencyList,
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      action();
    }

    return () => {
      isFirstRender.current = false;
    };
  }, dependencies);
};
