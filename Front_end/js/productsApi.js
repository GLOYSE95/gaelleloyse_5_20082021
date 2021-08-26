const cameraCard = document.getElementById("cardCamera");

var cameras;

//Appel produits // Requete APIasync
async function fetchCameras() {
  let rep = await fetch("http://localhost:3000/api/cameras", { method: "GET" });
  let response = await rep.json();
  return response;
}
cameras = fetchCameras();
console.log("blabla ", cameras);

function productCard() {
  for (camera in cameras) {
    cardCamera.innerHTML = `
          <img class="" src="${camera.imageUrl}"/>
          <h5 class="" >${camera.name}</h5>
          <p class="" >${camera.description}</p>
          <p class="">${camera.price}</p>
          `;
  }
}
