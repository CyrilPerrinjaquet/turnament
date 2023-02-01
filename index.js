// This the part of HTML, we retrieve the id of the form element and the id of the match list
const formElement = document.getElementById("formMatchs");
const matchListElement = document.getElementById("matchsList");
const rankListElement = document.getElementById("ranksList");
const statListElement = document.getElementById("statsOfTheTeams");

const matchList = [];
let teamList = [];
// TODO : Juste simplement rajouter les informations dans teamList au lieu de recréer un array
//  Exemple Objet TeamList : {name: "un Nom", wins: 2, additionalInformations: {corners: 2, shot: 10, ballOutOfPlay: 15}}
// TODO : Chercher via l'API du form en JS comment est-ce que je peux faire pour faire un truc plus propre que de faire un ".get" à chaque fois
function getDataFromForm(event) {
  event.preventDefault();

  const dataForm = new FormData(formElement);
  const teamA = dataForm.get("teamA");
  const teamB = dataForm.get("teamB");
  const scoreTeamA = parseInt(dataForm.get("scoreTeamA"));
  const scoreTeamB = parseInt(dataForm.get("scoreTeamB"));
  const shotAtGoalTeamA = dataForm.get("shotAtGoalTeamA");
  const shotAtGoalTeamB = dataForm.get("shotAtGoalTeamB");
  const cornersTeamA = parseInt(dataForm.get("cornersTeamA"));
  const cornersTeamB = parseInt(dataForm.get("cornersTeamB"));
  const outingsTeamA = dataForm.get("outingsTeamA");
  const outingsTeamB = dataForm.get("outingsTeamB");

  addMatchToMatchList({
    teamA,
    teamB,
    scoreTeamA,
    scoreTeamB,
    shotAtGoalTeamA,
    shotAtGoalTeamB,
    cornersTeamA,
    cornersTeamB,
    outingsTeamA,
    outingsTeamB,
  });
}

function isMatchValid({ teamA, teamB }) {
  return !(
    teamA.trim() === "" ||
    teamB.trim() === "" ||
    teamA.toLowerCase() === teamB.toLowerCase()
  );
}

function addMatchToMatchList({
  teamA,
  teamB,
  scoreTeamA,
  scoreTeamB,
  shotAtGoalTeamA,
  shotAtGoalTeamB,
  cornersTeamA,
  cornersTeamB,
  outingsTeamA,
  outingsTeamB,
}) {
  if (isMatchValid({ teamA, teamB, scoreTeamA, scoreTeamB })) {
    addTeamsToTeamList({ teamA, teamB });
    addAdditionalInformationsToStats({
      teamA,
      teamB,
      shotAtGoalTeamA,
      shotAtGoalTeamB,
      cornersTeamA,
      cornersTeamB,
      outingsTeamA,
      outingsTeamB,
    });
    const winner = getWinner({ teamA, teamB, scoreTeamA, scoreTeamB });
    matchList.push({ teamA, teamB, winner });
    updateMatchListElement();
    if (winner) {
      updateTeamWins(winner);
    }
    updateRanksListElement();
    updateAdditionalInformations(winner);
    updateStatListElement();
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
    `${teamA.substring(0, 11)} VS ${teamB.substring(0, 11)} => ${
      winner ?? "No winner"
    }`
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
    teamList.push({
      name: teamName,
      wins: 0,
      additionalInformation: { corners: 0, ballOutOfPlay: 0, shotAtGoal: 0 },
    });
  }
}

function updateRanksListElement() {
  rankListElement.innerHTML = "";
  teamList.forEach((team) => {
    const newRankItem = document.createElement("li");
    const itemText = document.createTextNode(
      `${team.name.substring(0, 11)} has ${team.wins} wins, corners : ${
        team.additionalInformation.corners
      }, shotAtGoal : ${
        team.additionalInformation.shotAtGoal
      }, ballOutOfPlay : ${team.additionalInformation.ballOutOfPlay}`
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

function addAdditionalInformationsToStats({
  teamA,
  teamB,
  shotAtGoalTeamA,
  shotAtGoalTeamB,
  cornersTeamA,
  cornersTeamB,
  ballOutOfPlayTeamA,
  ballOutOfPlayTeamB,
}) {
  // TODO Concept d'isolation
  let indexOfWinningTeam = teamList.findIndex((team) => team.name === teamA);
  teamList[indexOfWinningTeam].additionalInformation.corners += cornersTeamA;
  teamList[indexOfWinningTeam].additionalInformation.shotAtGoal +=
    shotAtGoalTeamA;
  teamList[indexOfWinningTeam].additionalInformation.ballOutOfPlay +=
    ballOutOfPlayTeamA;

  indexOfWinningTeam = teamList.findIndex((team) => team.name === teamB);
  teamList[indexOfWinningTeam].additionalInformation.corners += cornersTeamB;
  teamList[indexOfWinningTeam].additionalInformation.shotAtGoal +=
    shotAtGoalTeamB;
  teamList[indexOfWinningTeam].additionalInformation.ballOutOfPlay +=
    ballOutOfPlayTeamB;
}

formElement.onsubmit = getDataFromForm;
