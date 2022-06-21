import useJwt from "../api/useJwt";

const { jwt } = useJwt({});

export const useJwtHook = jwt;
