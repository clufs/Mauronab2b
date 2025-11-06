const API_TOKEN =
  "patTRKRcSL4up26VJ.702eb69258477880445b01cd1871cdc48b4be3b9267f76c0abc8d7793ae9d98c";
const BASE_ID = "appBdlDY0GiZ23YTj";
const TABLE_NAME = "tblKeVehYqvqXIPS8";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

//? cambia v1 si cambias el schema de lproducto osea si le cambiamo, agregamos o quitamos alguna caracteristica (por ejemplo peso, altura)
const LS_KEY = "airtable:products:v1";

const ttl_ms = 1000 * 60 * 10;

export const getAllProducts = async ({ force = false } = {}) => {
  const r = await fetch(API_URL.toString(), {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    cache: "no-store",
  });
  const data = await r.json();
  const products = await Promise.all(
    (data.records || []).map(async (rec) => {
      const f = rec.fields || {};
      const catIds = Array.isArray(f.categoryId) ? f.categoryId : [];
      const firstCatId = catIds[0] || null;
      const firstColId = f.Collection;

      const categoryName = firstCatId
        ? await _getCategoryNameById(firstCatId)
        : "Sin categoría";

      const collectionName = firstColId
        ? await _getCollectionNameById(firstColId)
        : "Sin Colection";

      return {
        name: f.name || f.Name || "Producto",
        price: f.price,
        minQuantity: f.minQuantity,
        category: categoryName,
        collection: collectionName,
        height: f.height || "sin datos",
        width: f.width || "sin datos",
        capacity: f.capacity || "sin datos",
        weight: f.weight || "sin datos",
        leadTime: f.leadTime || "sin datos de tiempo de produccion.",
      };
    })
  );

  return products;
};

const _getCategoryNameById = async (id) => {
  const CATEGORY_TABLE_NAME = "tblkvGkKdCQKdc2ew";
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`;

  const r = await fetch(API_URL.toString(), {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    cache: "no-store",
  });

  const data = await r.json();

  return data.fields.name;
};

const _getCollectionNameById = async (id) => {
  const CATEGORY_TABLE_NAME = "tblZAmVfbwxXhH8gf";
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`;

  const r = await fetch(API_URL.toString(), {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    cache: "no-store",
  });

  const data = await r.json();

  return data.fields.name;
};
