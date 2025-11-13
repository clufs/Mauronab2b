const API_TOKEN =
  "patTRKRcSL4up26VJ.702eb69258477880445b01cd1871cdc48b4be3b9267f76c0abc8d7793ae9d98c";
const BASE_ID = "appBdlDY0GiZ23YTj";
const TABLE_NAME = "tblZAmVfbwxXhH8gf"; //cateogira
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

export const getAllCollections = async () => {
  try {
    const r = await fetch(API_URL.toString(), {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      cache: "no-store",
    });

    const data = await r.json();

    // console.log(data);

    const collections = data.records.map((item) => {
      return {
        id: item.id,
        name: item.fields.name,
      };
    });

    // console.log(cats);

    return collections;
  } catch (error) {
    console.log(error);
  }
};
