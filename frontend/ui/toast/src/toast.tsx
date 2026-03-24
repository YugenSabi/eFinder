export function useToast() {
  return {
    showToast: (message: string) => {
      if (typeof window !== 'undefined') {
        window.console.info('[toast]', message);
      }
    },
  };
}
