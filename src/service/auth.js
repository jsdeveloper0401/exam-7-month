import http from "./config";
const auth = {
    sign_in: (data) => http.post("/login", data),
    sign_up: (data) => http.post("/register", data),
    sign_verify: (data) => http.post("/verify", data),
};
export default auth;
