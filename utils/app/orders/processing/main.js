const getOrders = async (access_token, callback) => {
  try {
    const callApiGetOrders = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/orders/processing`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );
    const response = await callApiGetOrders.json();
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const markADone = async (access_token, id, callback) => {
  try {
    const callApiDone = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/orders/done`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          id: id,
        }),
        cache: "no-store",
      }
    );
    const response = await callApiDone.json();
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

export { getOrders, markADone };
