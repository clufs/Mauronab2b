// TODO: esconder
const API_TOKEN =
  "patTRKRcSL4up26VJ.702eb69258477880445b01cd1871cdc48b4be3b9267f76c0abc8d7793ae9d98c";
const AIRTABLE_BASE_ID = "appBdlDY0GiZ23YTj";
const AIRTABLE_TABLE_ID = "tblRxDEjTHnqHAQk6";
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
  AIRTABLE_TABLE_ID
)}`;

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
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
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

export async function getAllMessages() {
  const res = await fetch(AIRTABLE_URL, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const messages = data.records.map((rec) => {
    return { id: rec.id, isAnswered: rec.isAnswered ?? false, ...rec.fields };
  });

  console.log(messages);
  return messages;
}

export const updateMessageStatus = async (messageId, isAnswered) => {
  const payload = {
    fields: {
      isAnswered: isAnswered,
    },

    typecast: true,
  };

  try {
    const res = await fetch(`${AIRTABLE_URL}/${messageId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("yay", data);
  } catch (error) {
    console.error("cagamos", error);
  }
};
