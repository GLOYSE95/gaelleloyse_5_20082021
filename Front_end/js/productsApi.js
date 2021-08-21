let camera;

const fetchCamera = async () => {
  camera = await fetch("http://localhost:3000/api/cameras")
    .then((resp) => resp.json())
    .then((data) => console.log(data));
};
fetchCamera();
