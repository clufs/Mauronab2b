const API_TOKEN =
  "patTRKRcSL4up26VJ.702eb69258477880445b01cd1871cdc48b4be3b9267f76c0abc8d7793ae9d98c";
const AIRTABLE_BASE_ID = "appBdlDY0GiZ23YTj";
const AIRTABLE_TABLE_ID = "tblKeVehYqvqXIPS8";
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
  AIRTABLE_TABLE_ID
)}`;

export const createProduct = async () => {};

export const updateProduct = async (productId, payload) => {
  const {
    name,
    price,
    description,
    minQuantity,
    height,
    width,
    capacity,
    leadTime,
    isAvailable,

    categoryId,
    Collection,

    ProductImage,
  } = payload;

  try {
    const res = await fetch(`${AIRTABLE_URL}/${productId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: { ...payload }, typecast: true }),
    });

    const data = await res.json();
    console.log("yay its alive", data);
  } catch (error) {
    console.error("cagamos", error);
  }
};

export const deleteProduct = async () => {};

export const getProduct = async () => {};
