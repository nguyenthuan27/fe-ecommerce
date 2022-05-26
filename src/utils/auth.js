const isAuthenticatedUser = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("Authorization1");
  }
  return false;
};

export { isAuthenticatedUser };
