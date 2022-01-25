const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

//Search
async function searchSongs(searchTerm) {
  const res = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await res.json();

  showData(data);
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
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
        ? `<button class='btn' onclick="getMoreSongs('${data.prev}')">
        Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class='btn' onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }
    `;
  } else {
    more.innerHTML = "";
  }
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
