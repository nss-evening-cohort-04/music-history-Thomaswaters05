var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Iron!ic > by Alanis Moris*ette on the album Jagged Little Pill";


// **add an array at the beginning and end of the array**

songs.unshift("m.A.A.d City\" - by Kendrick Lamar on the album \"Good Kid, M.A.A.D City");
songs.push("Blessings\" - by Chance The Rapper on the album \"Coloring Book");


//** Loop over the array and remove any words or characters that don't belong**

var printOnPage = document.getElementById("secondPartMH");

for (var i = 0; i < songs.length; i++) {
  songs[i] = songs[i].replace(/\>/, '-');
  songs[i] = songs[i].replace(/\*/, '');
  songs[i] = songs[i].replace(/\(/, '');
  songs[i] = songs[i].replace(/\@/, '');
  songs[i] = songs[i].replace(/\!/, '');
  console.log(songs[i]);
  printOnPage.innerHTML += "<p>" + songs[i] + "</p>";
}


















// Must add each string to the DOM in index.html in the main content area.