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

const getSoldReportByDate = async (
  access_token,
  { start_date, end_date },
  callback
) => {
  try {
    const callApi = await fetch(
      `${process.env.NEXT_PUBLIC_API}/sold-report?start_date=${start_date}&end_date=${end_date}`,
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
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

export { getSoldReportData, getSoldReportByDate };
