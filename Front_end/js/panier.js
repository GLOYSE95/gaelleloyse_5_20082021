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
    //console.log(elementSupprime);
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

  //----------------inserer le bouton Passer la commande
  //pointer sur div
  const passerCommande = document.getElementById("total");
  const passerCommandeHtml = `
<form>
<input type="submit" name="validate" value="Passer la commande" class="inputValidation inputCommande" id="commander">
</form>
`;
  //inserer html
  passerCommande.insertAdjacentHTML("afterend", passerCommandeHtml);
}

//----------calcul du prix total du panier

//pointer sur la div
const prixTotal = document.getElementById("total");

//Tableau qui stocke les tous prix du panier
var tableauDesPrix = [];
var totalPrix = 0;

//Boucle de lecture de tous les prix et stockage dans tableau
if (localStorageOrinoco !== null) {
  for (k = 0; k < localStorageOrinoco.length; k++) {
    //supprimer sigle euro
    prixDuPanier = localStorageOrinoco[k].prix.substring(0, 4);
    tableauDesPrix.push(prixDuPanier);
  }
}
//transformer tableau string en tableau number
const tableauDesPrixNumber = tableauDesPrix.map((i) => Number(i));

//variable du calcul prix total
for (l = 0; l < tableauDesPrixNumber.length; l++) {
  totalPrix += tableauDesPrixNumber[l];
}
//text html à ajouter
var prixTotalHtml = `
<div class="priceCamera panierParagraphe">Prix total de votre panier : ${totalPrix} €</div>`;
prixTotal.innerHTML = prixTotalHtml;

//----------Affichage du formulaire de commande
//Pointer sur bouton commander et constante Html formulaire
const btnCommander = document.getElementById("commander");
const commanderHtml = `

        <div class="h2--background">
          <h2>Formulaire de commande</h2>
        </div>

        <form action="" method="post" id="formCommande">
          <div class="bg-light bg-light-form">

            <div class="form-group">
              
                <label for="firstname">Prénom</label></br>
                <input type="text" name="prenom" class="col-6 inputFormulaire miInput" id="firstName">
                <p id="errorFirstName" class="error"></p>
                <label for="lastname">Nom</label> </br>
                <input required type="text" name="nom" class="col-6 inputFormulaire miInput" id="lastName">
                <p id="errorLastName" class="error"></p>
                
              
                <label for="email">E-mail</label></br>
                <input required type="email" name="email" class="col-6 inputFormulaire miInput" id="email">
                <p id="errorEmail" class="error"></p>
                
              
                <label for="address">Adresse de livraison</label></br>
                <input required type="text" name="adresseLiv" class="col-12 inputFormulaire adressInput" id="address">
                <p id="errorAddress" class="error"></p>
                
              
                <label for="city">Ville</label></br>
                <input required type="text" name="villeLiv" class="col-6 inputFormulaire miInput" id="city">
                <p id="errorCity" class="error"></p>
                
            </div>

            <input type="checkbox" name="cgv" class="form-check-input inputValidation" id="cgv">
            <label for="cgv">J'accepte les conditions générales de vente</label>
            <p id="errorCGV" class="error"></p>
            <input type="submit" name="validate" value="Valider votre commande" class="inputFormulaire inputValidation" id="validerCommande">
          </form>

            
      </article>`;
//------Ecouter au click pour Afficher le formulaire
btnCommander.addEventListener("click", (event) => {
  event.preventDefault();

  //------Pointer sur la div container
  const formulaireAffichage = document.getElementById("formulaireContact");
  formulaireAffichage.innerHTML = commanderHtml;

  //-------------------------Formulaire de commande
  //Ecouter au click : pour enregistrer les valeurs du formulaire dans le local storage

  //selectionner le btn valider
  const validerLaCommande = document.getElementById("validerCommande");

  //Ecouter au click
  validerLaCommande.addEventListener("click", (event) => {
    event.preventDefault();

    //Creation objet contact avec donnés user
    let contact = {};
    class contactForm {
      constructor() {
        this.firstName = document.getElementById("firstName").value;
        this.lastName = document.getElementById("lastName").value;
        this.email = document.getElementById("email").value;
        this.address = document.getElementById("address").value;
        this.city = document.getElementById("city").value;
      }
    }
    contact = new contactForm();
    console.log(contact);
  });

  //---------------------validation du formulaire
  /// utilisation des Expressions régulières Regex

  //Pointer le formulaire et l'input
  const leFormulaire = document.getElementById("formCommande");
  //Pointer l'input firstname
  const leFormulairePrenom = document.getElementById("firstName");
  console.log(leFormulairePrenom);

  //Ecouter au click change sur l'input
  leFormulairePrenom.addEventListener("change", function () {
    let firstNameRegex = /^[A-Z-a-zëïö]+$/;

    if (leFormulairePrenom.value.trim() == "") {
      let errorFirstName = document.getElementById("errorFirstName");
      errorFirstName.innerHTML = "Veuillez saisir votre prénom";
      return false;
    }
    if (firstNameRegex.test(leFormulairePrenom.value)) {
      console.log("true");
      errorFirstName.innerHTML = "Prénom valide, merci";
      errorFirstName.style.color = "green";
      return true;
    } else {
      errorFirstName.innerHTML = "Seuls les lettres sont autorisés";
      console.log("false");

      return false;
    }
  });
});
