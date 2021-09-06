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
  console.log(cam);
};

//arrondir le prix
const centEuro = (x) => {
  return (x = x / 100);
};

// Afficher l'élément dans le html
const displayCamera = async () => {
  await fetchCamera();

  document.getElementById("imgProduct").src = cam.imageUrl;
  document.getElementById("h3Product").textContent = cam.name;
  document.getElementById("descriptProduct").textContent = cam.description;
  document.getElementById("priceProduct").textContent = `${centEuro(
    cam.price
  )} €`;
  document.getElementById("opt1").textContent = cam.lenses[0];
  document.getElementById("opt2").textContent = cam.lenses[1];
};
displayCamera();
