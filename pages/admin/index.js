import { getAllCategories } from "../../utils/category.js";
import { getAllCollections } from "../../utils/collections.js";
import { getAllMessages } from "../../utils/createMessage.js";
import { getAllProducts } from "../../utils/getallProdudcts.js";

const availableProductInput = document.getElementById("pr-total");

const catsinput = document.getElementById("cats");
const colinput = document.getElementById("colls");

const totalMessagesInput = document.getElementById("msg");
const totalMessages2Input = document.getElementById("msg1");
const totalMessages3Input = document.getElementById("msg3");

const pravalibleInput = document.getElementById("pr-available");

const loadDashboardInformation = async () => {
  try {
    const [products, messages, categories, collections] = await Promise.all([
      getAllProducts(),
      getAllMessages(),
      getAllCategories(),
      getAllCollections(),
    ]);

    availableProductInput.textContent = products.length;
    pravalibleInput.textContent = products.filter((p) => p.isAvailable).length;

    totalMessagesInput.textContent = messages.length;

    totalMessages2Input.textContent =
      messages.length - messages.filter((m) => m.isAnswered).length;

    totalMessages3Input.textContent = messages.length;

    catsinput.textContent = categories.length;
    colinput.textContent = collections.length;

    // console.log(totalProducts);

    return {
      totalProducts: 0,
      productsAvailable: 0,
      totalCats: 0,
      totalCols: 0,
      totalMessages: 0,
      totalMessagesNoResp: 0,
    };
  } catch (error) {
    console.log(error);
  }
};

loadDashboardInformation();
