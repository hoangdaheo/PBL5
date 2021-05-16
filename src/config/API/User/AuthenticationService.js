import HandleApi from "../HandleAPI";

const postRegister = async (params) => {
  return await HandleApi.APIPost("Register", params);
};

const postLogin = async (params) => {
  console.log(params);
  return await HandleApi.APIPost("Login", params);
};
const saveDataLogin = (data) => {
  localStorage.setItem("@Login", JSON.stringify(data));
};

const clearDataLogin = () => {
  localStorage.clear();
};

const isLogin = () => {
  return !!localStorage.getItem("@Login");
};

const AuthenticationService = {
  postRegister,
  postLogin,
  saveDataLogin,
  clearDataLogin,
  isLogin,
};

export default AuthenticationService;
