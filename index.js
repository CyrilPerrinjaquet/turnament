// ELEMENTS
// This the part of HTML, we retrieve the id of the form element and the id of the match list
// This is the part of retrieving the form, list of match and the list of rank

const formElement = document.getElementById("formMatchs");
const matchListElement = document.getElementById("matchsList");
const rankListElement = document.getElementById("ranksList");
// This the part of retrieving the stats

const statsTableElement = document.getElementById("tournamentStats");
// Each of the variables below are related to the sorting of each attribute in the HTML Table

const tableHeaderNameElement = document.getElementById("tableHeaderName");
const tableHeaderWinsElement = document.getElementById("tableHeaderWins");
const tableHeaderCornersElement = document.getElementById("tableHeaderCorners");
const tableHeaderShotAtGoalElement = document.getElementById(
  "tableHeaderShotAtGoal"
);
const tableHeaderBallOutOfPlayElement = document.getElementById(
  "tableHeaderBallOutOfPlay"
);

/*
 *******************
 *VARIABLES*
 *******************
 */

const matchList = [];
let teamList = [];

function isMatchValid({ teamA, teamB }) {
  return !(
    teamA.trim() === "" ||
    teamB.trim() === "" ||
    teamA.toLowerCase() === teamB.toLowerCase()
  );
}

/*
 *******************
 *TURNAMENT FUNCTIONS*
 *******************
 */

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

/*
 *******************
 *ELEMENT UPDATE FUNCTIONS*
 *******************
 */

function updateMatchListElement() {
  const { teamA, teamB, winner } = matchList[matchList.length - 1];

  const newMatchItem = document.createElement("li");
  const itemText = document.createTextNode(
    `${teamA} VS ${teamB} => ${winner ?? "No winner"}`
  );
  newMatchItem.appendChild(itemText);
  matchListElement.appendChild(newMatchItem);
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

/*
 *******************
 *SORTING FUNCTIONS*
 *******************
 */

function updateTeamWins(winner) {
  const indexOfWinningTeam = getIndexOfWinningTeam(winner);
  teamList[indexOfWinningTeam].wins += 1;

  teamList = teamList.sort((teamA, teamB) => teamB.wins - teamA.wins);
}

function sortTableColumn(attribute, reverseOrder) {
  updateStatsTableElement(
    teamList.sort((teamA, teamB) =>
      getSortValue(teamA[attribute], teamB[attribute], reverseOrder)
    )
  );
}

function sortTableColumnMultipleAttribute(
  attribute1,
  attribute2,
  reverseOrder
) {
  updateStatsTableElement(
    teamList.sort((teamA, teamB) =>
      getSortValue(
        teamA[attribute1][attribute2],
        teamB[attribute1][attribute2],
        reverseOrder
      )
    )
  );
}

/**
 * ! This function get the result of the comparted values and return -1, 0 or 1. 
 * It is like the Array.prototype.sort function
 * @param {number | string} value1
 * @param {number | string} value2
 * @param {Boolean} reverseOrder
 * @returns
 */
function getSortValue(value1, value2, reverseOrder) {
  if (value1 > value2) {
    return reverseOrder ? -1 : 1;
  } else if (value1 === value2) {
    return 0;
  } else {
    return reverseOrder ? 1 : -1;
  }
}

/*
 *******************
 *EVENT HANDLERS*
 *******************
 */

function onTableClickName() {
  sortTableColumn("name", false);
}

function onTableClickWins() {
  sortTableColumn("wins", true);
}

function onTableClickCorners() {
  sortTableColumnMultipleAttribute("additionalInformation", "corners", true);
}

function onTableClickShotAtGoal() {
  sortTableColumnMultipleAttribute("additionalInformation", "shotAtGoal", true);
}

function onTableClickBallOutOfPlay() {
  sortTableColumnMultipleAttribute(
    "additionalInformation",
    "ballOutOfPlay",
    true
  );
}

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

/*
 *******************
 *EVENTS*
 *******************
 */

tableHeaderWinsElement.onclick = onTableClickWins;
tableHeaderCornersElement.onclick = onTableClickCorners;
tableHeaderShotAtGoalElement.onclick = onTableClickShotAtGoal;
tableHeaderBallOutOfPlayElement.onclick = onTableClickBallOutOfPlay;
tableHeaderNameElement.onclick = onTableClickName;
formElement.onsubmit = getDataFromForm;
