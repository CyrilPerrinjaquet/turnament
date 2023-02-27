const SEPARATOR = "%**%";
const PROMPT_TEXT = "Please enter a file name";

const saveButtonElement = document.getElementById("saveStorageButton");
const loadButtonElement = document.getElementById("loadStorageButton");
const matchListElementToSave = document.getElementById("matchsList");
const rankListElementToSave = document.getElementById("ranksList");
const statsTableElementToSave = document.getElementById("tournamentStats");

function saveTournament(saveName) {
  if (
    !matchListElementToSave.innerHTML.includes(SEPARATOR) &&
    !rankListElementToSave.innerHTML.includes(SEPARATOR) &&
    !statsTableElementToSave.innerHTML.includes(SEPARATOR)
  ) {
    const joinedArray = [
      matchListElementToSave.innerHTML,
      rankListElementToSave.innerHTML,
      statsTableElementToSave.innerHTML,
    ].join(SEPARATOR);
    localStorage.setItem(saveName, joinedArray);
  }
}

function loadTournament(saveName) {
  /**
  * TODO [BUG] Quand on load les stats, et qu'on veut trier, 
  * le contenu disparaît entièrement, 
  * il faudrait parser l'HTML pour récuperer les bonnes valeurs comme ci dessous :  
  * Ex. : teamList = [{name: "TeamA", wins: 0, additionalInformation: { corners: 0, ballOutOfPlay: 0, shotAtGoal: 0 }}] 
  */ 
  
  const localStorageContent = localStorage.getItem(saveName);
  if (localStorageContent && localStorageContent.includes(SEPARATOR)) {
    const splitedList = localStorageContent.split(SEPARATOR);
    if (splitedList.length === 3) {
      matchListElementToSave.innerHTML = splitedList[0];
      rankListElementToSave.innerHTML = splitedList[1];
      statsTableElementToSave.innerHTML = splitedList[2];
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
