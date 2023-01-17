// HTML
const formElement = document.getElementById("formMatchs");
const matchListElement = document.getElementById("matchsList");


// Array 
const matchList = [];


function getDataFromForm(event) {
    event.preventDefault();
    const dataForm = new FormData(formElement);
    const teamA = dataForm.get("teamA");
    const teamB = dataForm.get("teamB");
    const scoreTeamA = dataForm.get("scoreTeamA");
    const scoreTeamB = dataForm.get("scoreTeamB");

    addMatchToMatchList({ teamA, teamB, scoreTeamA, scoreTeamB });
}

function isMatchValid({ teamA, teamB, scoreTeamA, scoreTeamB }) {
    if (teamA.trim() === "" || teamB.trim() === "") {
        return false;
    }
    if (teamA === teamB) {
        return false;
    }

    return true;

    // Team A != Team B ; => surtout ca 
}

function addMatchToMatchList({ teamA, teamB, scoreTeamA, scoreTeamB }) {
    let winner;

    if (scoreTeamA > scoreTeamB) {
        winner = teamA;
    } else {
        winner = teamB
    }

    if (isMatchValid({ teamA, teamB, scoreTeamA, scoreTeamB })) {
        matchList.push({ teamA: teamA, teamB: teamB, winner: winner });
        updateMatchListElement();
    } else {
        alert("Match isn't valid");
    }
}

function updateMatchListElement() {
    const lastElementFromArray = matchList[matchList.length - 1];

    const newMatchItem = document.createElement("li");
    const itemText = document.createTextNode(lastElementFromArray.teamA + " VS " + lastElementFromArray.teamB + " Winner is => " + lastElementFromArray.winner);

    newMatchItem.appendChild(itemText);
    matchListElement.appendChild(newMatchItem);
}


formElement.onsubmit = getDataFromForm;
