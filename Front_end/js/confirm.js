//--------Page Confirm
// Récupération du prix total
let prixConfirm = JSON.parse(localStorage.getItem("totalPrixConfirm"));
// Récupération du Numéro de commande numberConfirm
let numberConfirm = JSON.parse(localStorage.getItem("numberConfirm"));

//text html à ajouter
const prixTotalConfirm = document.getElementById("totalConfirm");
const numberOrderConfirm = document.getElementById("numberCommande");

var prixTotalConfirmHtml = `
  <p class="priceCommande">Prix total de votre commande : ${prixConfirm} €</div>`;
prixTotalConfirm.innerHTML = prixTotalConfirmHtml;

var numberCommandeHtml = `
<p class="numberCommande">${numberConfirm} </p> `;
numberOrderConfirm.innerHTML = numberCommandeHtml;

//Récupération de l'order id
