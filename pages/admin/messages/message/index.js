import {
  getAllMessages,
  updateMessageStatus,
} from "../../../../utils/createMessage.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const nameEl = document.getElementById("msg-name");
const companyEl = document.getElementById("msg-company");
const dateEl = document.getElementById("msg-date");
const messageEl = document.getElementById("msg-message");
const emailEl = document.getElementById("msg-email");
const phoneEl = document.getElementById("msg-phone");
const statusPillEl = document.getElementById("msg-status");

let currentMsg = null;

function formatDate(fech) {
  if (!fech) return "";
  const d = new Date(fech);
  return `${d.getUTCDate().toString().padStart(2, "0")}/${(d.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getUTCFullYear()}`;
}

function renderPill(isAnswered) {
  statusPillEl.textContent = isAnswered ? "Respondido" : "Recibido";
  statusPillEl.className = `pill ${isAnswered ? "respondido" : "recibido"}`;
}

async function loadMessage() {
  try {
    const messages = await getAllMessages();
    const msg = messages.find((m) => m.id === id);
    currentMsg = msg;

    if (!msg) {
      nameEl.textContent = "Mensaje no encontrado";
      return;
    }

    nameEl.textContent = msg.Name || "Sin nombre";
    companyEl.textContent = msg.Empresa ? `Empresa: ${msg.Empresa}` : "";
    dateEl.textContent = formatDate(msg.CreateAt);
    messageEl.textContent = msg.Message || "";
    emailEl.textContent = msg.Email || "";
    phoneEl.textContent = msg.Phone || "";

    renderPill(msg.isAnswered);
  } catch (err) {
    console.error(err);
    nameEl.textContent = "Error al cargar el mensaje.";
  }
}

statusPillEl.addEventListener("click", async () => {
  if (!currentMsg) return;

  const nuevoEstado = !currentMsg.isAnswered;
  renderPill(nuevoEstado);
  currentMsg.isAnswered = nuevoEstado;

  try {
    await updateMessageStatus(id, nuevoEstado);
  } catch (err) {
    console.error("Error al actualizar:", err);
  }
});

loadMessage();
