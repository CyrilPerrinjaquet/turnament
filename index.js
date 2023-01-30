// This the part of HTML, we retrieve the id of the form element and the id of the match list
const formElement = document.getElementById("formMatchs");
const matchListElement = document.getElementById("matchsList");
const rankListElement = document.getElementById("ranksList");

const matchList = [];
let teamList = [];

function getDataFromForm(event) {
  event.preventDefault();
  const dataForm = new FormData(formElement);
  const teamA = dataForm.get("teamA");
  const teamB = dataForm.get("teamB");
  const scoreTeamA = dataForm.get("scoreTeamA");
  const scoreTeamB = dataForm.get("scoreTeamB");
  addMatchToMatchList({ teamA, teamB, scoreTeamA, scoreTeamB });
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
    addTeamsToTeamList({ teamA, teamB });
    const winner = getWinner({ teamA, teamB, scoreTeamA, scoreTeamB });
    matchList.push({ teamA, teamB, winner });
    updateMatchListElement();
    if (winner) {
      updateTeamWins(winner);
    }
    updateRanksListElement();
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
  findTeamNameAndPushIt(teamA);
  findTeamNameAndPushIt(teamB);
}

function findTeamNameAndPushIt(teamName) {
  if (teamName && !teamList.find((team) => team.name === teamName)) {
    teamList.push({ name: teamName, wins: 0 });
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

function updateTeamWins(winner) {
  const indexOfWinningTeam = teamList.findIndex((team) => team.name === winner);
  teamList[indexOfWinningTeam].wins += 1;

  teamList = teamList.sort((teamA, teamB) => teamB.wins - teamA.wins);
}

formElement.onsubmit = getDataFromForm;
