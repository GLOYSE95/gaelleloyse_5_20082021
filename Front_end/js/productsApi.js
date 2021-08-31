// pointeur index.html
const cameraCard = document.getElementById("cardCamera");
const cardSelectCamera = document.getElementById("cardSelectCamera");
const linkProduct = document.getElementsByClassName("oneCard");

// Requete API récupération des données
const fetchCam = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .then((data) => (cameras = data));
};

//arrondir le prix
const centEuro = (x) => {
  return (x = x / 100);
};

//Appel produits innerHtml
const showProducts = async () => {
  await fetchCam();

  cameraCard.innerHTML = cameras
    .map(
      (camera) =>
        `
      <a href="./produits.html?id=${camera._id}">
        <div class="oneCard">
          <div class="contain-imgCamera">
              <img class="imgCamera" src="${camera.imageUrl}" alt="photo" />
          </div>
          <div class="textCamera">
            <h3 class=" ">${camera.name}</h3>
          <p class=" " >${camera.description}</p>
            <p class="priceCamera"> Prix : ${centEuro(camera.price)} €</p>
           </div>
       </div>
     </a>
   `
    )
    .join("");
};

showProducts();
