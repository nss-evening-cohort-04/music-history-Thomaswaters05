function activateListView() {
  $("list-music-view").style.display = "block";
  $("add-music-view").style.display = "none";
}

function activateAddView() {
  $("add-music-view").style.display = "flex";
  $("list-music-view").style.display = "none";
}

function parseJSON() {
  let data = JSON.parse(this.responseText);
  musicObjectsArray = data.songList;
  for (let i = 0; i < musicObjectsArray.length; i++) {
    musicObjectsArray[i].id = counter;
    counter++;
  }
  populateSongDiv(musicObjectsArray);
  console.log("JSON loaded: ",musicObjectsArray);
}

function populateSongDiv(array) {
  songListDiv.innerHTML = "";
  let musicContentDivs = "";
  for (let i = 0; i < array.length; i++) {
    musicContentDivs +=
      "<div class='music-content' id='" + array[i].id + "'>" +
        "<button class='delete'>Delete</button>" +
        "<p>" +
          array[i].song_name +
          " by " +
          array[i].artist_name +
          " on the album " +
          array[i].album_name +
        "</p>" +
      "</div>";
  }
  musicContentDivs += "<button id='more-btn'>More ></button>";
  songListDiv.innerHTML = musicContentDivs;
  songListDiv.scrollTop = songListDiv.scrollHeight;
}

function collectUserInput() {
  let userInputSongName = $("song-name");
  let userInputArtist = $("artist");
  let userInputAlbum = $("album");
  let userInputObject = {
    "song_name": userInputSongName.value,
    "artist_name": userInputArtist.value,
    "album_name": userInputAlbum.value,
    "id": counter
  }
  counter++;
  musicObjectsArray.push(userInputObject);
  populateSongDiv(musicObjectsArray);
  console.log("User input added to array/DOM: ",musicObjectsArray);
  userInputSongName.value = "";
  userInputArtist.value = "";
  userInputAlbum.value = "";
  activateListView();
  songListDiv.scrollTop = songListDiv.scrollHeight;
}

function deleteObjectFromDOMAndArray(eventTarget) {
  //first, remove clicked element from the DOM
  songListDiv.removeChild(eventTarget.parentElement);
  console.log("song removed from DOM");

  //then, remove clicked object from the messagesArray
  let clickedID = eventTarget.parentElement.id;
  for (let i = 0; i < musicObjectsArray.length; i++) {
    if (musicObjectsArray[i].id == clickedID) {
      musicObjectsArray.splice(i, 1);
      console.log("Object deleted from array; refreshed array: ",musicObjectsArray);
      break;
    }
  }
}

function JSON2() {
  let data = JSON.parse(this.responseText);
  let JSON2musicObjectsArray = data.songList;
  for (let i = 0; i < JSON2musicObjectsArray.length; i++) {
    JSON2musicObjectsArray[i].id = counter;
    musicObjectsArray.push(JSON2musicObjectsArray[i]);
    counter++;
  }
  populateSongDiv(musicObjectsArray);
  console.log("JSON2 loaded: ",musicObjectsArray);
}

//On page load, activate the list view
activateListView();
$("list-view-btn").on("click", activateListView);
$("add-view-btn").on("click", activateAddView);
$("add-btn").on("click", collectUserInput);
$("body").on("click", function() {
  if (event.target.classList[0] === "delete") {
    deleteObjectFromDOMAndArray(event.target);
  } else if (event.target.id === "more-btn") {
    let myRequest2 = new XMLHttpRequest();
    myRequest2.on("load", JSON2);
    myRequest2.open("GET", "songs1.json");
    myRequest2.send();
  }
});

let musicObjectsArray = [];
let songListDiv = document.getElementById("song_list_id");
let counter = 0;


let myRequest = new XMLHttpRequest();
myRequest.on("load", parseJSON);
myRequest.open("GET", "songs.json");
myRequest.send();