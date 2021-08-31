const cameraCard = document.getElementById("selectCamera");
let monProduit;

// Requete API récupération des données
const fetchCam = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .then((data) => (cameras = data));
};

//recupération Id produit selectionné par url
var queryUrlId = window.location.search;
//console.log(queryUrlId);

//recupération valeur Id produit selectionné
var idObject = queryUrlId.slice(4);
//console.log(idObject);

//innerHTML du produit par l'id
const showProduct = async () => {
  await fetchCam();
  //console.log(cameras[3]._id);
  //console.log(idObject);
  for (i = 0; i < 5; i++) {
    if (cameras[i]._id == idObject) {
      //console.log("ca fonctionne");
      console.log(cameras[i]);

      cameraCard.innerHTML = `
        <div class="oneCard">
          <div class="contain-imgCamera">
              <img class="imgCamera" src="${cameras[i].imageUrl}" alt="photo" />
          </div>
          <div class="textCamera">
            <h3 class=" ">${cameras[i].name}</h3>
          <p class=" " >${cameras[i].description}</p>
            <p class="priceCamera"> Prix : ${cameras[i].price} €</p>
           </div>
       </div>
   `.join("");
    }
  }
};
showProduct();
