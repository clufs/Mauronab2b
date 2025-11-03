export const getAllProducts = async () => {
  const API_TOKEN =
    "patTRKRcSL4up26VJ.702eb69258477880445b01cd1871cdc48b4be3b9267f76c0abc8d7793ae9d98c";
  const BASE_ID = "appwp3UiiW7qxP6Sx";
  const TABLE_NAME = "tbl36q0pB5z5L6y3w";
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  const r = await fetch(API_URL.toString(), {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    cache: "no-store",
  });

  const data = await r.json();

  const products = data.records.map((items) => {
    return {
      nombre: items.fields.Nombre,
      // TODO: aca tiene que ir la parte de las caracteristicas del producto
    };
  });

  return products;
};
