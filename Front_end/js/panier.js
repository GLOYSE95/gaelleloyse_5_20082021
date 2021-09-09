//-------------------------------Stocker les choix user dans le local storage

//Variable données du Local Storage  + converties en json
let localStorageOrinoco = JSON.parse(localStorage.getItem("produitUser"));
const localStorageAjoutProduit = () => {
  localStorageOrinoco.push(addToCard);
  localStorage.setItem("produitUser", JSON.stringify(localStorageOrinoco));
};
console.log(localStorageOrinoco);

//------------------------------Afficher les produits du localStorage

//------pointer sur la div container
const containProduct = document.getElementById("containPanier");

//------html panier vide
const panierVide = `
<div class="bg-light panierProduct">
    <p class="panierParagraphe paragrapheUppercase">Votre panier est vide</p>
</div>`;
const panierPlein = `
<div class="bg-light panierProduct">
    <div class="panierSelectionName">
        <h5 id="panierProductName" class="oneCard--h3">Produit sélectionné : <span>${localStorageOrinoco.nomProduit}</span></span></h5>
    </div>
    <div for="personalisation">
        <p class="panierParagraphe">Option lentille :blabla</p>
    </div>
    <div>
        <p class="panierParagraphe">Quantité : 1ex </p>
    </div>
    <p class="priceCamera panierParagraphe" id="priceProduct">Prix : blabla<span>xxeuros</span></p>    
    <form>
        <input type="reset" name="annulation" value="Supprimer du panier" class="inputSuppression">
    </form> 
</div>
<div class="totalPanier">
    <div class="bg-light panierTotalPrice">
        <div id="total" class="priceCamera panierParagraphe">Prix total de votre panier : <span>xxxeuros</span></div>           
    </div>
</div>
`;

//------html panier avec sélection users

//------Si le panier est vide ou non
if (localStorageOrinoco === null) {
  containProduct.innerHTML = panierVide;
} else {
  containProduct.innerHTML = panierPlein;
}
