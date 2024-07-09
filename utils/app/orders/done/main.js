const getDoneOrders = async (access_token, callback) => {
  try {
    const callApi = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/orders/done`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );
    const response = await callApi.json();
    if (response.error) throw new Error(response.error);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

export { getDoneOrders };
