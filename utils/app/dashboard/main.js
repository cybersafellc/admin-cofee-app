const getProfit = async (access_token, callback) => {
  try {
    const waitRes = await fetch(
      `${process.env.NEXT_PUBLIC_API}/sold-report/total-profit`,
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
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getSold = async (access_token, callback) => {
  try {
    const waitRes = await fetch(
      `${process.env.NEXT_PUBLIC_API}/sold-report/total-order`,
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
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const getSoldReportData = async (access_token, { take, skip }, callback) => {
  try {
    const waitRes = await fetch(
      `${process.env.NEXT_PUBLIC_API}/sold-report?skip=${skip || 0}&take=${
        take || 10
      }`,
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
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

export { getProfit, getSold, getSoldReportData };
