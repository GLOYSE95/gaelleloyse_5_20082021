const cameraCard = document.getElementById("selectCamera");
let cameras;
let camera;
let theProduct;
let i;
let textTheProduct = `
  <div class="oneCard">
    <div class="contain-imgCamera">
      <img class="imgCamera" src=" " alt="photo" />
    </div>
    <div class="textCamera">
      <h3 class=" "> </h3>
      <p class=" "> </p>
      <p class="priceCamera"> Prix : €</p>
    </div>
  </div>
  `;

// Requete API récupération des données
const fetchCam = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .then((data) => (cameras = data));
  //return cameras;
};
fetchCam();

//recupération Id produit selectionné par url
var queryUrlId = window.location.search;
//console.log(queryUrlId);

//recupération valeur Id produit selectionné
var idObject = queryUrlId.slice(4);
//console.log(idObject);

//recupération des données du produit selectionné
const selectProduct = async () => {
  await fetchCam();

  //console.log(`${cameras}`);?????
  //console.log(cameras);
  //console.log(cameras[3]._id);

  for (let i in cameras) {
    if (cameras[i]._id == idObject) {
      theProduct = cameras[i];
      console.table(theProduct);
    } else {
      console.log("produit non correspondant");
    }
  }
};
selectProduct();
