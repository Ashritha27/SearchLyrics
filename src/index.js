const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

//Search
function searchSongs(searchTerm) {
  fetch(`${apiURL}/suggest/${searchTerm}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}

//Event lisytender
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please enter search term");
  } else {
    searchSongs(searchTerm);
  }
});
