// This the part of HTML, we retrieve the id of the form element and the id of the match list
const formElement = document.getElementById("formMatchs");
const matchListElement = document.getElementById("matchsList");
const rankListElement = document.getElementById("ranksList");
const statsTableElement = document.getElementById("tournamentStats");
const tableHeaderNameElement = document.getElementById("tableHeaderName");
const tableHeaderWinsElement = document.getElementById("tableHeaderCorners");
const tableHeaderCornersElement = document.getElementById(
  "tableHeaderShotAtGoal"
);
const tableHeaderShotAtGoalElement = document.getElementById(
  "tableHeaderBallOutOfPlay"
);
const tableHeaderBallOutOfPlayElement =
  document.getElementById("tableHeaderName");

const matchList = [];
let teamList = [];
//  Exemple Objet TeamList : {name: "un Nom", wins: 2, additionalInformations: {corners: 2, shot: 10, ballOutOfPlay: 15}}
function getDataFromForm(event) {
  event.preventDefault();

  const dataForm = new FormData(formElement);
  const teamA = dataForm.get("teamA");
  const teamB = dataForm.get("teamB");
  const scoreTeamA = parseInt(dataForm.get("scoreTeamA"));
  const scoreTeamB = parseInt(dataForm.get("scoreTeamB"));
  const shotAtGoalTeamA = parseInt(dataForm.get("shotAtGoalTeamA"));
  const shotAtGoalTeamB = parseInt(dataForm.get("shotAtGoalTeamB"));
  const cornersTeamA = parseInt(dataForm.get("cornersTeamA"));
  const cornersTeamB = parseInt(dataForm.get("cornersTeamB"));
  const ballOutOfPlayTeamA = parseInt(dataForm.get("ballOutOfPlayTeamA"));
  const ballOutOfPlayTeamB = parseInt(dataForm.get("ballOutOfPlayTeamB"));

  addMatchToMatchList({
    teamA,
    teamB,
    scoreTeamA,
    scoreTeamB,
    shotAtGoalTeamA,
    shotAtGoalTeamB,
    cornersTeamA,
    cornersTeamB,
    ballOutOfPlayTeamA,
    ballOutOfPlayTeamB,
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
  ballOutOfPlayTeamA,
  ballOutOfPlayTeamB,
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
      ballOutOfPlayTeamA,
      ballOutOfPlayTeamB,
    });
    const winner = getWinner({ teamA, teamB, scoreTeamA, scoreTeamB });
    matchList.push({ teamA, teamB, winner });
    updateMatchListElement();
    if (winner) {
      updateTeamWins(winner);
    }
    updateRanksListElement();
    updateStatsTableElement(teamList);
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
      `${team.name} has ${team.wins} wins`
    );
    newRankItem.appendChild(itemText);
    rankListElement.appendChild(newRankItem);
  });
}

function updateTeamWins(winner) {
  const indexOfWinningTeam = getIndexOfWinningTeam(winner);
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
  let indexOfWinningTeam = getIndexOfWinningTeam(teamA);
  teamList[indexOfWinningTeam].additionalInformation.corners += cornersTeamA;
  teamList[indexOfWinningTeam].additionalInformation.shotAtGoal +=
    shotAtGoalTeamA;
  teamList[indexOfWinningTeam].additionalInformation.ballOutOfPlay +=
    ballOutOfPlayTeamA;

  indexOfWinningTeam = getIndexOfWinningTeam(teamB);
  teamList[indexOfWinningTeam].additionalInformation.corners += cornersTeamB;
  teamList[indexOfWinningTeam].additionalInformation.shotAtGoal +=
    shotAtGoalTeamB;
  teamList[indexOfWinningTeam].additionalInformation.ballOutOfPlay +=
    ballOutOfPlayTeamB;
}

function getIndexOfWinningTeam(winner) {
  return teamList.findIndex((team) => team.name === winner);
}

function updateStatsTableElement(list) {
  statsTableElement.innerHTML = "";
  list.forEach(({ name, wins, additionalInformation }) => {
    const newTableRow = document.createElement("tr");
    createRowData(
      name,
      wins,
      additionalInformation.corners,
      additionalInformation.shotAtGoal,
      additionalInformation.ballOutOfPlay
    ).forEach((element) => newTableRow.appendChild(element));

    statsTableElement.appendChild(newTableRow);
    statsTableElement.onclick;
  });
}

function createRowData(...params) {
  const rowData = [];
  params.forEach((param) => {
    const newTableData = document.createElement("td");
    const itemText = document.createTextNode(`${param}`);
    newTableData.appendChild(itemText);
    rowData.push(newTableData);
  });

  return rowData;
}

tableHeaderNameElement.onclick = () => {
  const sorted = teamList.sort((teamA, teamB) => {
    if (teamA.name < teamB.name) {
      return -1;
    } else {
      return 1;
    }
  });

  updateStatsTableElement(sorted);
};

tableHeaderWinsElement.onclick = () => {
  const sorted = teamList.sort((teamA, teamB) => {
    if (teamA.wins < teamB.wins) {
      return 1;
    } else {
      return -1;
    }
  });

  updateStatsTableElement(sorted);
};

tableHeaderCornersElement.onclick = () => {
  const sorted = teamList.sort((teamA, teamB) => {
    if (
      teamA.additionalInformation.corners < teamB.additionalInformation.corners
    ) {
      return 1;
    } else {
      return -1;
    }
  });

  updateStatsTableElement(sorted);
};

tableHeaderShotAtGoalElement.onclick = () => {
  const sorted = teamList.sort((teamA, teamB) => {
    if (
      teamA.additionalInformation.shotAtGoal <
      teamB.additionalInformation.shotAtGoal
    ) {
      return 1;
    } else {
      return -1;
    }
  });

  updateStatsTableElement(sorted);
};

tableHeaderBallOutOfPlayElement.onclick = () => {
  const sorted = teamList.sort((teamA, teamB) => {
    if (
      teamA.additionalInformation.ballOutOfPlay <
      teamB.additionalInformation.ballOutOfPlay
    ) {
      return 1;
    } else {
      return -1;
    }
  });

  updateStatsTableElement(sorted);
};

formElement.onsubmit = getDataFromForm;
