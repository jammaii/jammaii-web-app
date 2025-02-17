import { useMemo, useRef } from 'react';
import { useSingleEffect } from '@/hooks/use-single-effect';

export const useFileObjectUrl = (file?: File) => {
  // Keep ref of each file url so we are able to revoke it.
  const fileUrlRef = useRef<string>();

  const revokeStaleUrl = () => {
    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
  };

  useMemo(() => {
    // Revoke old url once a new file is selected.
    revokeStaleUrl();
    if (!file) return;
    fileUrlRef.current = URL.createObjectURL(file);
  }, [file]);

  // Normal useEffect runs twice in dev mode which prematurely revokes the url.
  // So using this to accomodate both prod and dev.
  useSingleEffect(() => {
    // Revoke current url on componount unmount.
    return revokeStaleUrl;
  }, []);

  return { fileUrl: fileUrlRef.current };
};
