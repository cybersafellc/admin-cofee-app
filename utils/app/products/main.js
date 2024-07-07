const getProducts = async (callback) => {
  try {
    const callApiProducts = await fetch(
      `${process.env.NEXT_PUBLIC_API}/products`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );
    const response = await callApiProducts.json();
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const searchProducts = async (query, callback) => {
  try {
    const callApiProducts = await fetch(
      `${process.env.NEXT_PUBLIC_API}/products?q=${query}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );
    const response = await callApiProducts.json();
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const addProducts = async (
  { formData, name, price, description },
  access_token,
  callback
) => {
  try {
    const callApiAddImages = await fetch(
      `${process.env.NEXT_PUBLIC_API}/products/images`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      }
    );
    const resImage = await callApiAddImages.json();
    if (resImage.error) throw new Error(resImage.message);

    const callApiAddProducts = await fetch(
      `${process.env.NEXT_PUBLIC_API}/products`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          name: name,
          price: price,
          img: resImage.data.filename,
          description: description,
        }),
      }
    );
    const resProducts = await callApiAddProducts.json();
    if (resProducts.error) throw new Error(resProducts.message);
    return await callback(false, resProducts.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const markAsold = async (id, access_token, callback) => {
  try {
    const callApiMarkASold = await fetch(
      `${process.env.NEXT_PUBLIC_API}/products/sold`,
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
      }
    );
    const response = await callApiMarkASold.json();
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const markAReady = async (id, access_token, callback) => {
  try {
    const callApiMarkASold = await fetch(
      `${process.env.NEXT_PUBLIC_API}/products/ready`,
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
      }
    );
    const response = await callApiMarkASold.json();
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

const deleted = async (id, access_token, callback) => {
  try {
    const callApiMarkASold = await fetch(
      `${process.env.NEXT_PUBLIC_API}/products`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    const response = await callApiMarkASold.json();
    if (response.error) throw new Error(response.message);
    return await callback(false, response.data);
  } catch (error) {
    return await callback(error, false);
  }
};

export {
  getProducts,
  searchProducts,
  addProducts,
  markAsold,
  markAReady,
  deleted,
};
