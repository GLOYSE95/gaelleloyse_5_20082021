const cameraCard = document.getElementById("selectCamera");

// récupération de l'id de l'Url affichée
const getCameraId = () => {
  return new URL(location.href).searchParams.get("id");
};

//Récupération des données du produit affiché
const fetchCamera = async () => {
  await fetch(`http://localhost:3000/api/cameras/${getCameraId()}`)
    .then((res) => res.json())
    .then((data) => (cam = data));
};

//arrondir le prix
const centEuro = (x) => {
  return (x = x / 100);
};

// Afficher l'élément dans le html
const displayCamera = async () => {
  await fetchCamera();

  //constante pour le tableau des lentilles;
  const options = cam.lenses;

  //pointer la balise select et ajouter le nombre d'options;
  const pointeurOptions = document.getElementById("optionsProduct");
  for (let i = 0; i < options.length; i++) {
    let create = document.createElement("option");
    pointeurOptions.appendChild(create);
    create.textContent = cam.lenses[i];
    //creation des attributs value;
    create.setAttribute("value", `opt${i + 1}`);
  }

  document.getElementById("imgProduct").src = cam.imageUrl;
  document.getElementById("h3Product").textContent = cam.name;
  document.getElementById("descriptProduct").textContent = cam.description;
  document.getElementById("priceProduct").textContent = `${centEuro(
    cam.price
  )} €`;
};
displayCamera();

const envoyerDonnées = async () => {
  await fetchCamera();
  // les données à envoyer à la page panier

  // Récupérer la value de l'option choisie par user
  const pointeurOptions = document.getElementById("optionsProduct");

  //pointer le bouton "ajouter panier" et écouter au click
  const btnAjout = document.getElementById("btnEnvoiPanier");
  btnAjout.addEventListener("click", (event) => {
    event.preventDefault();
    const optionChoice = pointeurOptions.value;
    let addToCard = {
      nomProduit: cam.name,
      idProduit: cam._id,
      optionProduit: optionChoice,
      quantité: 1,
      prix: `${centEuro(cam.price)} €`,
    };

    //Stocker les choix user dans le local storage
    //Variable données du Local Storage  + converties en json
    let localStorageOrinoco = JSON.parse(localStorage.getItem("produitUser"));
    const localStorageAjoutProduit = () => {
      localStorageOrinoco.push(addToCard);
      localStorage.setItem("produitUser", JSON.stringify(localStorageOrinoco));
    };
    //Si panier vide
    if (localStorageOrinoco) {
      //Si produit dans le panier
      localStorageAjoutProduit();
    } else {
      //Si panier pas vide
      localStorageOrinoco = [];
      localStorageAjoutProduit();
    }
  });
};
envoyerDonnées();
