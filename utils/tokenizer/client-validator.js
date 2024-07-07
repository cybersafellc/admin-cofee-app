const { getCookie, deleteCookie, setCookie } = require("cookies-next");
const { accessTokenCheck, refreshToken } = require("./token");

const clientValidator = async (redirect) => {
  const access_token = getCookie("access_token");
  const refresh_token = getCookie("refresh_token");

  const checkAccessToken = await accessTokenCheck(access_token);
  if (!checkAccessToken) {
    const newAccessToken = await refreshToken(
      refresh_token,
      (err, access_token_update) => {
        return access_token_update;
      }
    );
    if (!newAccessToken) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      redirect.push("/login");
    }
    setCookie("access_token", newAccessToken);
    return;
  }
  return;
};

export default clientValidator;
