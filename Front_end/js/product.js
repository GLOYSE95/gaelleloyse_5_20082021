const cameraCard = document.getElementById("selectCamera");
let camera;

// récupération de l'id de l'Url affichée
const getCameraId = () => {
  return new URL(location.href).searchParams.get("id");
};
getCameraId();

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

  //constante pour le tab des lentilles;
  const options = cam.lenses;

  //pointer la balise select et ajouter le nbr d'options;
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
  const optionSelect = document.getElementById("optionsProduct");
  const optionChoice = optionSelect.value;

  //pointer le bouton et écouter au click
  const btnAjout = document.getElementById("btnEnvoiPanier");
  btnAjout.addEventListener("click", (event) => {
    event.preventDefault();
    const optionChoice = optionSelect.value;
    let addToCard = {
      nomProduit: cam.name,
      idProduit: cam._id,
      optionProduit: optionChoice,
      quantité: 1,
      prix: `${centEuro(cam.price)} €`,
    };

    console.log(addToCard);
  });
};
envoyerDonnées();
