//-------------------------------Stocker les choix user dans le local storage

//Variable données du Local Storage  + converties en json
let localStorageOrinoco = JSON.parse(localStorage.getItem("produitUser"));
const localStorageAjoutProduit = () => {
  localStorageOrinoco.push(addToCard);
  localStorage.setItem("produitUser", JSON.stringify(localStorageOrinoco));
};
//------pointer sur la div container
const containProduct = document.getElementById("containPanier");

//------------------------------Afficher les produits du localStorage

//------html panier vide
if (localStorageOrinoco === null || localStorageOrinoco == 0) {
  containProduct.innerHTML = `
      <div class="bg-light panierProduct">
        <p class="panierParagraphe paragrapheUppercase">Votre panier est vide</p>
    </div>`;
} else {
  //------html panier avec sélection users

  const camera = () => {
    return JSON.parse(localStorage.getItem("produitUser"));
  };

  containProduct.innerHTML = camera()
    .map(
      (element) =>
        `
        <div class="bg-light panierProduct">
        <div class="panierSelectionImg">
            <img src=${element.imgProduit}>
        </div>
        <div class="panierSelection">
            <div class="panierSelectionName">
                <h5 id="panierProductName" class="oneCard--h3">Produit sélectionné : <span>${element.nomProduit}</span></span></h5>
            </div>
            <div for="personalisation">
                <p class="panierParagraphe">Option lentille : ${element.option}</p>
            </div>
            <div>
            <p class="panierParagraphe">Quantité : 1ex </p>
            </div>
                <p class="priceCamera panierParagraphe" id="priceProduct">Prix : <span>${element.prix}</span></p>    
                <form>
                    <input type="reset" name="annulation" value="Supprimer du panier" class="inputSuppression">
                </form> 
            </div>
        </div>
    </div>
      
   `
    )
    .join("");
}

//----selection des boutons supprimer
let selectBtnSupprimer = document.querySelectorAll(".inputSuppression");

for (let j = 0; j < selectBtnSupprimer.length; j++) {
  selectBtnSupprimer[j].addEventListener("click", (event) => {
    event.preventDefault();

    elementSupprime = localStorageOrinoco.splice([j], 0);
    console.log(elementSupprime);
    //localStorage.setItem("produitUser");
    //window.location.href = "panier.html";
  });
}

//Vider entièrement le panier si il n'est pas vide
if (localStorageOrinoco !== null) {
  const viderPanierHtml = `
    <input type="reset" id="viderPanier" value="Vider le panier">`;
  //inserer le html
  containProduct.insertAdjacentHTML("beforeend", viderPanierHtml);
  const viderPanier = document.querySelector("#viderPanier");

  //écouter au click et vider
  viderPanier.addEventListener("click", (event) => {
    event.preventDefault;
    localStorage.removeItem("produitUser");
    window.location.href = "panier.html";
  });
}
//----------calcul du prix total du panier
const prixTotal = document.getElementById("total");

var prixTotalHtml = `
<div class="priceCamera panierParagraphe">Prix total de votre panier : </div>`;

var prixTotalTableau = [];
if (localStorageOrinoco !== null) {
  for (k = 0; k < localStorageOrinoco.length; k++) {
    prixDuPanier = localStorageOrinoco[k].prix;
    prixTotalTableau.push(prixDuPanier);
    console.log(prixTotalTableau);
  }
}
