const login = async ({ username, password }, callback) => {
  "use client";
  try {
    const waitRes = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const response = await waitRes.json();
    if (response.error) throw new Error(response.message);
    const retback = await callback(false, response);
    return retback;
  } catch (error) {
    const retback = await callback(error, false);
    return retback;
  }
};
export { login };
