import http from "../../http-common.ts";

const login = (email: string, password: string) => {
  const payload = {
    email: email,
    password: password,
  };
  return http.post("/auth/login", payload);
};

const AuthenticationService = {
  login,
};

export default AuthenticationService;
