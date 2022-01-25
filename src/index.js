const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";
var searchT = "";
//Search
async function searchSongs(searchTerm) {
  const res = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await res.json();

  showData(data);
}

function showData(data) {
  let output = "";
  data.data.forEach((song) => {
    output += `
    <li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" 
      data-songtitle="${song.title}">Get Lyrics</button>
    </li>
    `;
  });

  result.innerHTML = `
  <ul class="songs">
   ${output}
  </ul>
  `;

  result.innerHTML = `
  <ul class="songs">
    ${data.data
      .map(
        (song) =>
          `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" 
      data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
      )
      .join("")}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

async function getLyrics(artist, songtitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songtitle}`);
  const data = await res.json();

  result.innerHTML = data.lyrics.replace(/(\r\n| \r|\n)/g, "</br>");
  more.innerHTML = "";

  more.innerHTML = `
  <button class="btn" onClick="searchSongs('${searchT}')" >Back</button>
  `;
}
// Get prev and next songs

//Event lisytender
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  searchT = searchTerm;
  if (!searchTerm) {
    alert("Please enter search term");
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.tagName == "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songtitle = clickedEl.getAttribute("data-songtitle");
    getLyrics(artist, songtitle);
  }
});
