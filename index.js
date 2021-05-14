const formulario = document.getElementById("form");
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  let transactionFormData = new FormData(formulario);
  let transactionObj = convertFormDataToTransactionObj(transactionFormData);
  saveTransactionObj(transactionObj);
  insertRowInTransaccionTable(transactionObj);
  form.reset();
});
function drawCategory() {
  let allCategory = ["Alquiler", "Comida", "Diversion"];
  for (let index = 0; index < allCategory.length; index++) {
    insertCategory(allCategory[index]);
  }
}

function getNewTransactinId() {
  let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
  let newTransactionId = JSON.parse(lastTransactionId) + 1;
  localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
  return newTransactionId;
}

function convertFormDataToTransactionObj(transactionFormData) {
  let tipeSelector = transactionFormData.get("tipeSelector");
  let Descripcion = transactionFormData.get("Descripcion");
  let Monto = transactionFormData.get("Monto");
  let Categoria = transactionFormData.get("Categoria");
  let transactionId = getNewTransactinId();
  return {
    tipeSelector: tipeSelector,
    Descripcion: Descripcion,
    Monto: Monto,
    Categoria: Categoria,
    transactionId: transactionId, //*1
  };
}

document.addEventListener("DOMContentLoaded", function (event) {
  drawCategory();
  let myTransactionObjArray = JSON.parse(
    localStorage.getItem("transactionData")
  );
  myTransactionObjArray.forEach(function (arrayObj) {
    insertRowInTransaccionTable(arrayObj);
  });
});
function insertRowInTransaccionTable(transactionObj) {
  let transactionTableRef = document.getElementById("transaccionTable");
  let newtransaccionrowref = transactionTableRef.insertRow(-1);
  newtransaccionrowref.setAttribute(
    "data-attribute-id",
    transactionObj["transactionId"] //*1
  );
  let newtypecellref = newtransaccionrowref.insertCell(0);
  newtypecellref.textContent = transactionObj["tipeSelector"];
  newtypecellref.classList.add("col-3");
  newtypecellref = newtransaccionrowref.insertCell(1);
  newtypecellref.textContent = transactionObj["Descripcion"];
  newtypecellref.classList.add("col-3");
  newtypecellref = newtransaccionrowref.insertCell(2);
  newtypecellref.textContent = newtypecellref.textContent =
    transactionObj["Monto"];
  newtypecellref.classList.add("col-3");
  newtypecellref = newtransaccionrowref.insertCell(3);
  newtypecellref.textContent = newtypecellref.textContent =
    transactionObj["Categoria"];
  newtypecellref.classList.add("col-3");
  let DeleteCell = newtransaccionrowref.insertCell(4);
  let DeleteButton = document.createElement("button");
  DeleteButton.classList.add("btn-primary");
  DeleteButton.classList.add("btn");
  DeleteButton.textContent = "Eliminar";
  DeleteCell.appendChild(DeleteButton);

  DeleteButton.addEventListener("click", (event) => {
    let transactionRow = event.target.parentNode.parentNode;
    let transactionId = transactionRow.getAttribute("data-attribute-id");
    transactionRow.remove();
    deleteTransactionObjet(transactionId);
  });
}

function deleteTransactionObjet(transactionId) {
  let transactionObjetArray = JSON.parse(
    localStorage.getItem("transactionData")
  );
  let transactionIndexInArray = transactionObjetArray.findIndex(
    (element) => element.transactionId == transactionId
  );
  transactionObjetArray.splice(transactionIndexInArray, 1);
  let transactionArrayJSON = JSON.stringify(transactionObjetArray);
  localStorage.setItem("transactionData", transactionArrayJSON);
}
function insertCategory(categoryName) {
  const selectElement = document.getElementById("Categoria");
  let htmlToInsert = `<option>${categoryName}</option>`;
  selectElement.insertAdjacentHTML("beforeend", htmlToInsert);
}

// Validar el formulario con javascript

// function isValidTransactionForm(transactionObj) {
//   let isValidForm = true;
//   if (!transactionObj["Descripcion"]) {
//     console.log("Elegi tu tipo de transacción");
//     isValidForm = false;
//   }
//   return isValidForm;
// }
function saveTransactionObj(transactionObj) {
  let myTransactionArray =
    JSON.parse(localStorage.getItem("transactionData")) || [];
  myTransactionArray.push(transactionObj);
  let transactionObjJSON = JSON.stringify(myTransactionArray);
  localStorage.setItem("transactionData", transactionObjJSON);
}
