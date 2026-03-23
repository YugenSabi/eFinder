export function useSession() {
  return {
    isAuthenticated: false,
    loading: false,
  };
}

export function useLoginFlow() {
  return {
    loading: false,
    error: null,
    submitLogin: (payload: unknown) => payload,
  };
}
