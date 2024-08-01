document.addEventListener("DOMContentLoaded", () => {
  let fetchBtn = document.getElementById("fetchBtn");
  let photo = document.getElementById("photo");
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let location = document.getElementById("location");
  let coordinates = document.getElementById("coordinates");
  let timezone = document.getElementById("timezone");
  let dataOfBirth = document.getElementById("dataOfBirth");
  let phone = document.getElementById("phone");
  let cell = document.getElementById("cell");
  let username = document.getElementById("username");

  function updateUI(result) {
    let dateOfBirthObject = new Date(result.dob.date);
    photo.src = result.picture.large;
    name.innerText = `${result.name.title} ${result.name.first} ${result.name.last}`;
    email.innerText = `Email: ${result.email}`;
    location.innerText = `Location: ${result.location.street.number} ${result.location.street.name}, ${result.location.city}, ${result.location.state}, ${result.location.country}, ${result.location.postcode}`;
    coordinates.innerText = `Coordinates: ${result.location.coordinates.latitude}, ${result.location.coordinates.longitude}`;
    timezone.innerText = `Timezone: ${result.location.timezone.description}, (UTC ${result.location.timezone.offset})`;
    dataOfBirth.innerText = `Data of Birth: ${dateOfBirthObject.toLocaleDateString(
      "en-US"
    )} (Age: ${result.dob.age})`;
    phone.innerText = `Phone: ${result.phone}`;
    cell.innerText = `Cell: ${result.cell}`;
    username.innerText = `Username: ${result.login.username}`;
  }

  let cachedData = localStorage.getItem("data")
  if (cachedData) {
    let data = JSON.parse(cachedData);
    updateUI(data.results[0])
  }


  fetchBtn.addEventListener("click", () => {
    fetch("https://randomuser.me/api/")
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        response.json().then((data) => {
          localStorage.setItem("data", JSON.stringify(data));
          updateUI(data.results[0]);
        });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  });
});
