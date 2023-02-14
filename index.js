/*
 *******************
 *ELEMENTS*
 *******************
 */
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

/*
 *******************
 *TURNAMENT FUNCTIONS*
 *******************
 */

/**
 * Say if the string compared are not empty strings or they are the same string
 * @param {string} teamA
 * @param {string} teamB
 * @returns {boolean} True/false if the match is valid or not
 */
function isMatchValid({ teamA, teamB }) {
  return !(
    teamA.trim() === "" ||
    teamB.trim() === "" ||
    teamA.toLowerCase() === teamB.toLowerCase()
  );
}

/**
 ** Main function of the tournament, the objectiv is to check if the match is valid.
 ** add the team stats to the team list, add the additional informations to the teamList Array,
 ** defines a winner, push the Team A, Team B and the winner to the matchList Array, and then update the matchListElement in the HTML
 ** Then check if it has a winner, and update the wins of the Team depending on the winner.
 ** Finally update the rankListElement in the HTML and same thing with the table of stats (statsTableElement) based on the winner
 ** And if the match isn't valid it throws an alert
 * @param {string} teamA
 * @param {string} teamB
 * @param {number} scoreTeamA
 * @param {number} scoreTeamB
 * @param {number} shotAtGoalTeamA
 * @param {number} shotAtGoalTeamB
 * @param {number} cornersTeamA
 * @param {number} cornersTeamB
 * @param {number} ballOutOfPlayTeamA
 * @param {number} ballOutOfPlayTeamB
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

/**
 *
 * @param {string} teamA
 * @param {string} teamB
 * @param {number} scoreTeamA
 * @param {number} scoreTeamB
 * @returns the winner
 */
function getWinner({ teamA, teamB, scoreTeamA, scoreTeamB }) {
  let winner;
  if (scoreTeamA > scoreTeamB) {
    winner = teamA;
  } else if (scoreTeamB > scoreTeamA) {
    winner = teamB;
  }
  return winner;
}

/**
 * It add the two Teams A & B
 * @param {string} teamA
 * @param {string} teamB
 */
function addTeamsToTeamList({ teamA, teamB }) {
  findTeamNameAndPushIt(teamA);
  findTeamNameAndPushIt(teamB);
}

/**
 * If the name of the team is not null and the team Name doesnt already exist in the list, it pushs it,
 * with the differents informations
 * @param {string} teamName
 */
function findTeamNameAndPushIt(teamName) {
  if (teamName && !teamList.find((team) => team.name === teamName)) {
    teamList.push({
      name: teamName,
      wins: 0,
      additionalInformation: { corners: 0, ballOutOfPlay: 0, shotAtGoal: 0 },
    });
  }
}

/**
 * * Defines the index of the winning team and stores it in a variable
 * * Then it adds the different stats based on the index of the two teams in the array teamList
 * @param {string} teamA
 * @param {string} teamB
 * @param {number} scoreTeamA
 * @param {number} scoreTeamB
 * @param {number} shotAtGoalTeamA
 * @param {number} shotAtGoalTeamB
 * @param {number} cornersTeamA
 * @param {number} cornersTeamB
 * @param {number} ballOutOfPlayTeamA
 * @param {number} ballOutOfPlayTeamB
 */
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

/**
 *
 * @param {string} winner
 * @returns {number} the index the winner in the teamList array
 */
function getIndexOfWinningTeam(winner) {
  return teamList.findIndex((team) => team.name === winner);
}

/*
 *******************
 *ELEMENT UPDATE FUNCTIONS*
 *******************
 */

/**
 * Updates the list element in the HTML
 * * Creates a teamA, teamB and winner based on the last element of the array
 * * Creates a new element <li>
 * * Creates a new text node with name of the team A and B plus the winner
 * * If winner is null or undefined => No winner is displayed (this could happen when its a draw)
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

/**
 * It creates the necessary information for dsplaying the stats in the stat table
 * * Resets the content of the table
 * * It loops through the list parameter which is an Array and defining the name, wins and additionalInformation
 * * By looping the through the list, it creates a new <tr>
 * * It calls the createRowData by passing the name, wins and the additional inforamtions
 * * Then it loops through the createRowData function by simply appending the element which is all the <td> elements to the created <tr>
 * * Finally it append the row (<tr>) to the HTML table
 * @param {Array} list
 */
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
  });
}

/**
 * Same logic as the updateMatchListElement but with a foreach
 * * Resets the rankList content
 * * Loops through the teamList Array
 * * For every team in this Array it creates a <li> element
 * * Creats a text node with the respectiv name and wins
 * * It appends the texte node in the <li> element
 * * Finally it appends the <li> element to the rankList content
 */
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

/**
 * It defines a new arrray called rowData
 * * Loops through the ...params
 * * For each parameter in params, it creates a <td> element
 * * Creates a text node with the <param> of the foreach
 * * append the text node to the <td> element
 * * Finally it pushes the <td> element to the rowData Array
 * @param  {...any} params
 * @returns {Array} rowData
 */
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

/**
 * Defines the index of the winning team
 * * Adds 1 win to the winner in the teamList Array
 * * Finally it sorts the teamList Array in descending, for the team who has the most wins come on top of the list
 * @param {string} winner
 */
function updateTeamWins(winner) {
  const indexOfWinningTeam = getIndexOfWinningTeam(winner);
  teamList[indexOfWinningTeam].wins += 1;

  teamList = teamList.sort((teamA, teamB) => teamB.wins - teamA.wins);
}

/**
 * Calls the function updateStatsTableElement with the parametes
 * * The attribute parameter is here to define the wins and name of the teams
 * @param {string} attribute
 * @param {boolean} reverseOrder
 */
function sortTableColumn(attribute, reverseOrder) {
  updateStatsTableElement(
    teamList.sort((teamA, teamB) =>
      getSortValue(teamA[attribute], teamB[attribute], reverseOrder)
    )
  );
}

/**
 * Calls the function updateStatsTableElement with two attributes (attribute1 and attribute2)
 * * attribute1 correspond to the additionalInformation and the attribute2 correspond to the corners shot at goals etc...
 * @param {string} attribute1
 * @param {string} attribute2
 * @param {boolean} reverseOrder
 */
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
 * This function get the result of the compared values and return -1, 0 or 1.
 * * Same thing as the Array.prototype.sort function
 * * The reverseOrder is a boolean that tells in which order to sort
 * * If reverseOrder is true = -1 else 1 then we do like the Array.prototype.sort function
 * @param {number | string} value1
 * @param {number | string} value2
 * @param {Boolean} reverseOrder
 * @returns {boolean}
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

/**
 * Calls the function sortTableColumn with the name parameter and the false value as the reverseOrder (sort in descending)
 */
function onTableClickName() {
  sortTableColumn("name", false);
}

/**
 * Calls the function sortTableColumn with the wins parameter and the true value as the reverseOrder (sort in ascending)
 */
function onTableClickWins() {
  sortTableColumn("wins", true);
}

/**
 * Calls the function sortTableColumnMultipleAttribute with the additionalInformation, corners parameter and the true value as the reverseOrder (sort in ascending)
 */
function onTableClickCorners() {
  sortTableColumnMultipleAttribute("additionalInformation", "corners", true);
}

/**
 * Calls the function sortTableColumnMultipleAttribute with the additionalInformation, shotAtGoal parameter and the true value as the reverseOrder (sort in ascending)
 */
function onTableClickShotAtGoal() {
  sortTableColumnMultipleAttribute("additionalInformation", "shotAtGoal", true);
}

/**
 * Calls the function sortTableColumnMultipleAttribute with the additionalInformation, ballOutOfPlay parameter and the true value as the reverseOrder (sort in ascending)
 */
function onTableClickBallOutOfPlay() {
  sortTableColumnMultipleAttribute(
    "additionalInformation",
    "ballOutOfPlay",
    true
  );
}

/**
 * It prevents the default behavior of the browser for managing the form¨
 * * Creates a FormData based on the formElement id in the HTML and stores it in a variable
 * * Retrieve all the values of the form and stores it all in variables
 * * Calls the function addMatchToMatchList with the parameters associated with variables with defined before
 * @param {SubmitEvent} event 
 */
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
