const SEPARATOR = "%**%";
const PROMPT_TEXT = "Please enter a name for the storage";

const saveButtonElement = document.getElementById("saveStorageButton");
const loadButtonElement = document.getElementById("loadStorageButton");

function saveTournament(saveName) {
  const joinedArray = [
    matchListElement.innerHTML,
    rankListElement.innerHTML,
  ].join(SEPARATOR);
  localStorage.setItem(saveName, joinedArray);
}

function loadTournament(saveName) {
  const contentOfListHTML = localStorage.getItem(saveName);
  if (contentOfListHTML) {
    const splitedList = contentOfListHTML.split(SEPARATOR);
    // TODO vérifier la longueur de split, qu'il y a bien les éléments
    matchListElement.innerHTML = splitedList[0];
    rankListElement.innerHTML = splitedList[1];
  }
}
// TODO faire des noms de fonctions plus claires => ex. saveInLocalStorage
function save() {
  const promptValue = prompt(PROMPT_TEXT);
  // checkThePromptValue(promptValue);
  if (promptValue) {
    saveTournament(promptValue);
  }
}

function load() {
  const promptValue = prompt(PROMPT_TEXT);
  //  checkThePromptValue(promptValue);
  if (promptValue) {
    loadTournament(promptValue);
  }
}

function checkThePromptValue(promptValue) {
  if (promptValue === "") {
    alert("Please enter a name");
    return;
  }
  // TODO check if null
}

saveButtonElement.onclick = save;
loadButtonElement.onclick = load;
