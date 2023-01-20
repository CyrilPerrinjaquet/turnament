// This the part of HTML, we retrieve the id of the form element and the id of the match list
const formElement = document.getElementById("formMatchs");
const matchListElement = document.getElementById("matchsList");
const rankListElement = document.getElementById("ranksList");

const matchList = [];
const teamList = [];

function getDataFromForm(event) {
  event.preventDefault();
  const dataForm = new FormData(formElement);
  const teamA = dataForm.get("teamA");
  const teamB = dataForm.get("teamB");
  const scoreTeamA = dataForm.get("scoreTeamA");
  const scoreTeamB = dataForm.get("scoreTeamB");
  addMatchToMatchList({ teamA, teamB, scoreTeamA, scoreTeamB });
  addTeamsToTeamList({ teamA, teamB });
  updateTeamWins({ team });
}

function isMatchValid({ teamA, teamB }) {
  return !(
    teamA.trim() === "" ||
    teamB.trim() === "" ||
    teamA.toLowerCase() === teamB.toLowerCase()
  );
}

function addMatchToMatchList({ teamA, teamB, scoreTeamA, scoreTeamB }) {
  if (isMatchValid({ teamA, teamB, scoreTeamA, scoreTeamB })) {
    const winner = getWinner({ teamA, teamB, scoreTeamA, scoreTeamB });
    matchList.push({ teamA, teamB, winner });
    updateMatchListElement();
  } else {
    alert("Match isn't valid");
  }
}

function getWinner({ teamA, teamB, scoreTeamA, scoreTeamB }) {
  let winner;
  if (scoreTeamA > scoreTeamB) {
    winner = teamA;
  } else if (scoreTeamB > scoreTeamA) {
    winner = teamB;
  }
  return winner;
}

function updateMatchListElement() {
  const { teamA, teamB, winner } = matchList[matchList.length - 1];

  const newMatchItem = document.createElement("li");
  const itemText = document.createTextNode(
    `${teamA} VS ${teamB} => ${winner ?? "No winner"}`
  );
  newMatchItem.appendChild(itemText);
  matchListElement.appendChild(newMatchItem);
}

function addTeamsToTeamList({ teamA, teamB }) {
  if (!teamList.find((element) => element.name === teamA)) {
    teamList.push({ name: teamA, wins: 0 });
  }

  if (!teamList.find((element) => element.name === teamB)) {
    teamList.push({ name: teamB, wins: 0 });
  }
}

function updateRanksListElement() {
  rankListElement.innerHTML = "";
  teamList.forEach((team) => {
    const newRankItem = document.createElement("li");
    const itemText = document.createTextNode(
      `${team.name} has ${team.wins} wins`
    );
    newRankItem.appendChild(itemText);
    rankListElement.appendChild(newRankItem);
  });
}

formElement.onsubmit = getDataFromForm;
