const SEPARATOR = "%**%";
const PROMPT_TEXT = "Please enter a file name";

const saveButtonElement = document.getElementById("saveStorageButton");
const loadButtonElement = document.getElementById("loadStorageButton");

function saveTournament(saveName) {
  if (
    !matchListElement.innerHTML.includes(SEPARATOR) &&
    !rankListElement.innerHTML.includes(SEPARATOR)
  ) {
    const joinedArray = [
      matchListElement.innerHTML,
      rankListElement.innerHTML,
    ].join(SEPARATOR);
    localStorage.setItem(saveName, joinedArray);
  }
}

function loadTournament(saveName) {
  const localStorageContent = localStorage.getItem(saveName);
  if (localStorageContent && localStorageContent.includes(SEPARATOR)) {
    const splitedList = localStorageContent.split(SEPARATOR);
    if (splitedList.length === 2) {
      matchListElement.innerHTML = splitedList[0];
      rankListElement.innerHTML = splitedList[1];
    }
  }
}

function saveInLocalStorage() {
  const promptValue = prompt(PROMPT_TEXT);
  if (promptValue && promptValue.trim() != "") {
    saveTournament(promptValue);
  }
}

function loadFromLocalStorage() {
  const promptValue = prompt(PROMPT_TEXT);
  if (promptValue && promptValue.trim() != "") {
    loadTournament(promptValue);
  }
}

saveButtonElement.onclick = saveInLocalStorage;
loadButtonElement.onclick = loadFromLocalStorage;
