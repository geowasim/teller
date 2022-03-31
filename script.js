const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//disable - enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

//Passing Jokes to VoiceRSS

function tellMe(joke) {
  VoiceRSS.speech({
    key: "e03a1b4f20b8453480d52212df6ad8b8",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  let joke = "";

  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    data.setup
      ? (joke = `${data.setup} ...${data.delivery}`)
      : (joke = data.joke);

    // Text-to-Speech
    toggleButton();
    tellMe(joke);
    // DisableButton
  } catch (error) {
    console.log("error in fetching", error);
  }
}

//eventListener on click new joke

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

// https://github.com/geowasim/teller.git
// getJokes();
