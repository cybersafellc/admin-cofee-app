const accessTokenCheck = async (access_token) => {
  try {
    const waitRes = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/verify-token`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );
    const response = await waitRes.json();
    if (response.error) {
      throw new Error(response.message);
    }
    return true;
  } catch (error) {
    return false;
  }
};

const refreshToken = async (refresh_token, callback) => {
  try {
    const waitRes = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/refresh-token`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${refresh_token}`,
        },
        cache: "no-store",
      }
    );
    const response = await waitRes.json();
    if (response.error) throw new Error(response.message);
    const retback = await callback(false, response.data.access_token);
    return retback;
  } catch (error) {
    const retback = await callback(error, false);
    return retback;
  }
};

export { accessTokenCheck, refreshToken };
