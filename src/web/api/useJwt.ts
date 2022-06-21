import JwtService from "./jwtService";

// ** Export Service as useJwt
export default function useJwt(jwtOverrideConfig: any) {
  const jwt = new JwtService(jwtOverrideConfig);

  return {
    jwt,
  };
}
