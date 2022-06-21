import { useJwtHook } from "./../hooks/useJwtHook";

export const checkAuth = () => {
  const token = useJwtHook.getToken();
  const user = useJwtHook.getUserStorage();

  if (token && user) {
    return true;
  }
  return false;
};

export const getUserStorage = () => {
  const user = useJwtHook.getUserStorage();
  if (user) {
    return user;
  }
  return null;
};

export const getToken = () => {
  const token = useJwtHook.getToken();
  if (token) {
    return token;
  }
  return null;
};
