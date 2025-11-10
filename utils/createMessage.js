const AIRTABLE_PAT =
  "patTRKRcSL4up26VJ.702eb69258477880445b01cd1871cdc48b4be3b9267f76c0abc8d7793ae9d98c";
const AIRTABLE_BASE_ID = "appBdlDY0GiZ23YTj";
const AIRTABLE_TABLE_ID = "tblRxDEjTHnqHAQk6";
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

export async function createMessage({ name, company, email, phone, message }) {
  if (!name || !company || !email || !message) {
    return { ok: false, error: "Faltan campos obligatorios." };
  }

  const payload = {
    records: [
      {
        fields: {
          Name: name,
          Empresa: company,
          Email: email,
          Phone: phone || "",
          Message: message,
        },
      },
    ],
    typecast: true,
  };

  try {
    const res = await fetch(AIRTABLE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        ok: false,
        error: data || "Error creando el registro.",
      };
    }
    return { ok: true, data };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Error de red o CORS." };
  }
}
