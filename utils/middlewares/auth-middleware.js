const { NextResponse } = require("next/server");
const { accessTokenCheck, refreshToken } = require("../tokenizer/token");

const authMiddleware = async (request) => {
  const access_token = await request.cookies.get("access_token")?.value;
  const refresh_token = await request.cookies.get("refresh_token")?.value;
  const checkAccessToken = await accessTokenCheck(access_token);
  if (!checkAccessToken) {
    const access_token_update = await refreshToken(
      refresh_token,
      (err, access_token) => {
        return access_token;
      }
    );
    if (!access_token_update) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
    const response = NextResponse.next();
    response.cookies.set("access_token", access_token_update);
    return response;
  }

  return NextResponse.next();
};

export default authMiddleware;
