/*========================================================*/
/*============== GLOBAL OBJECTS & VARIABLES ==============*/
/*========================================================*/


let diceObj = [
  {currentValue: 0, hold: false},
  {currentValue: 0, hold: false},
  {currentValue: 0, hold: false},
  {currentValue: 0, hold: false},
  {currentValue: 0, hold: false}
]

let scoreSheet = [
  {
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null
  },
  {
    threeOfAKind: null,
    fourOfAKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    yahtzee: null,
    chance: null
  },
  {
    upperTotal: null,
    bonus: null,
    upperGrandTotal: null,
    lowerGrandTotal: null,
    gameGrandTotal: null
  }
]

// Score sheet DOM elements
let bonusDisp = document.getElementById('bonusDisp');
let upperGrandTotalDisp = document.getElementById('upperGrandTotalDisp');
let threeOfKindScoreDisp = document.getElementById('threeOfKindScoreDisp');
let fourOfKindScoreDisp = document.getElementById('fourOfKindScoreDisp');
let fullHouseScoreDisp = document.getElementById('fullHouseScoreDisp');
let smallStraightScoreDisp = document.getElementById('smallStraightScoreDisp');
let largeStraightScoreDisp = document.getElementById('largeStraightScoreDisp');
let yahtzeeScoreDisp = document.getElementById('yahtzeeScoreDisp');
let chanceScoreDisp = document.getElementById('chanceScoreDisp');
let upperGrandTotalDisp2 = document.getElementById('upperGrandTotalDisp2');
let lowerGrandTotalDisp = document.getElementById('lowerGrandTotalDisp');
let gameGrandTotalDisp = document.getElementById('gameGrandTotalDisp');

let scoreCell = document.getElementsByClassName('scoreCell');
let totalCell = document.getElementsByClassName('totalCell');

// Dice DOM elements
let diceOneDisp = document.getElementById('diceOneDisp');
let diceTwoDisp = document.getElementById('diceTwoDisp');
let diceThreeDisp = document.getElementById('diceThreeDisp');
let diceFourDisp = document.getElementById('diceFourDisp');
let diceFiveDisp = document.getElementById('diceFiveDisp');
let dice = document.getElementsByClassName('dice');
let diceDisp = document.getElementsByClassName('diceDisp');

// Button DOM elements
let holdButtons = document.getElementsByClassName('holdButtons');
let rollButton = document.getElementById('rollButton');

// Message DOM element
let message = document.getElementById('message');

// Global variables
let diceValueArray = [];
let rollCount = 0;
let scoreSubmitted = true;
let gameFinished;


/*============================================*/
/*============== GAME MECHANICS ==============*/
/*============================================*/


function diceRoll() {
  // Executed when the roll button is clicked.

  rollCount++;
  scoreSubmitted = false;

  // Enable hold buttons on first roll so the player can hold dice.
  if (rollCount === 1) {
    enableHoldButtons();
  }
  
  // Assigns a random number to each dice. If a dice is set to hold, no new number will be assigned.
  // Pushes the individual dice values to an array and sorts them numerically.
  if (rollCount <= 3) {
    diceValueArray = [];
    for (let i = 0; i < diceObj.length; i++) {
      if (!diceObj[i].hold) {
        diceObj[i].currentValue = Math.floor(((Math.random() * 6) + 1));
      }
      diceValueArray.push(diceObj[i].currentValue);
      diceValueArray.sort((a, b) => a - b);
    }

    // Update the dice images.
    displayDice(0, diceOneDisp);
    displayDice(1, diceTwoDisp);
    displayDice(2, diceThreeDisp);
    displayDice(3, diceFourDisp);
    displayDice(4, diceFiveDisp);
  } 

  // Once the max number of rolls is hit, the hold button and roll buttons are disabled.
  if (rollCount === 3) {
    disableHoldButtons();
    disableRollButton();
  }

  // Update the message display after each roll.
  updateMessageDisplay();
}

function toggleHold(key, holdElementId) {
  //Toggles the hold functionality and calls the appropriate function to show either a normal dice image or a 'hold' dice image.

  diceObj[key].hold = !diceObj[key].hold;
  if (diceObj[key].hold) {
    displayDiceHold(key, holdElementId);
  } else {
    displayDice(key, holdElementId);
  }
}

function displayDice(index, element) {
  // Displays 'non-held' dice image depending on the current dice value.

  const diceObject = diceObj[index];
  if (diceObject.hold) {
    return;
  }
  switch (diceObject.currentValue) {
    case 1:
      element.src='assets/images/1.svg';
      break;
    case 2:
      element.src='assets/images/2.svg';
      break;
    case 3:
      element.src='assets/images/3.svg';
      break;
    case 4:
      element.src='assets/images/4.svg';
      break;
    case 5:
      element.src='assets/images/5.svg';
      break;
    case 6:
      element.src='assets/images/6.svg';
  }
}

function displayDiceHold(index, element) {
  // Displays the 'held-dice' image depending on the current dice value.

  switch (diceObj[index].currentValue) {
    case 1:
      element.src='assets/images/1hold.svg';
      break;
    case 2:
      element.src='assets/images/2hold.svg';
      break;
    case 3:
      element.src='assets/images/3hold.svg';
      break;
    case 4:
      element.src='assets/images/4hold.svg';
      break;
    case 5:
      element.src='assets/images/5hold.svg';
      break;
    case 6:
      element.src='assets/images/6hold.svg';
  }  
}

function updateMessageDisplay() {
  // Displays the correct message in the display area depending on what is happening in the game.

  if (scoreSheet[2].gameGrandTotal !== null) {
    message.textContent = "YOU SCORED " + scoreSheet[2].gameGrandTotal +"!";
  } else if (rollCount === 0) {
    message.textContent = "PRESS ROLL";
  } else if (rollCount === 1) {
    message.textContent = "2 ROLLS REMAINING";
  } else if (rollCount === 2) {
    message.textContent = "1 ROLL REMAINING";
  } else if (rollCount === 3) {
    message.textContent = "ENTER YOUR SCORE";
  } 
}

function resetDice()  {
  // Resets the dice hold value and displays 'non-held' dice.
  // Executed by calculationEnd every time a score is inputted or when newGame function is executed.

  // Reset the hold value for each dice to false.
  for (let i = 0; i <diceObj.length; i++) {
    diceObj[i].hold = false;
  }

  // Display the 'non-held' dice.
  displayDice(0, diceOneDisp);
  displayDice(1, diceTwoDisp);
  displayDice(2, diceThreeDisp);
  displayDice(3, diceFourDisp);
  displayDice(4, diceFiveDisp);
}

function newGame() {
  // Executed when the user clicks the New Game button. Resets everything for a new game to begin.

  // Reset roll count and set scoreSubmitted to true to stop any scores being entered before the first roll.
  rollCount = 0;
  gameFinished = false;
  scoreSubmitted = true;

  // Reset the score cells on the HTML score sheet.
  for (let i = 0; i < scoreCell.length; i++) {
    scoreCell[i].textContent = "...";
  }

  // Reset the total cells on the HTML score sheet.
  for (let i = 0; i < totalCell.length; i++) {
    totalCell[i].textContent = "";
  }

  // Reset the score sheet object.
  for (var i = 0; i < scoreSheet.length; i++) {
    for (var prop in scoreSheet[i]) {
      if (scoreSheet[i][prop] !== null) {
        scoreSheet[i][prop] = null;
      }
    }
  }

  // Reset the dice values.
  for (let i = 0; i < diceObj.length; i++) {
    diceObj[i].currentValue = 1;
  }

  resetDice();
  updateMessageDisplay();
  enableRollButton();
  disableHoldButtons();
}

function calculationEnd() {
  // Once a score is inputted by the player, this function is executed setting everything up for the next go. 

  scoreSubmitted = true;
  rollCount = 0;

  disableHoldButtons();
  calculateTotals();
  resetDice();
  updateMessageDisplay();

  // If the game is finished the roll button is disabled so the player can only press the new game button.
  if (!gameFinished) {
    enableRollButton();
  } else {
    disableRollButton();
  }
}

function calculateTotals() {
  // Executed by the calculationEnd function once a player inputs a score.
  // This function calculates and displays the different score totals.

  // Extract the score sheet values into an array.
  let upperScoreArray = Object.values(scoreSheet[0]);
  let lowerScoreArray = Object.values(scoreSheet[1]);

  // Check the above arrays for any missing scores.
  let isScoreMissingUpper = upperScoreArray.includes(null);
  let isScoreMissingLower = lowerScoreArray.includes(null);

  let reducer = (accumulator, current) => accumulator + current;

  // If all the upper section scores are in, calculate and display the upper totals. 
  if (!isScoreMissingUpper) {
    scoreSheet[2].upperTotal = upperScoreArray.reduce(reducer);
    if (scoreSheet[2].upperTotal >= 63) {
      scoreSheet[2].bonus = 35;
    } else {
      scoreSheet[2].bonus = 0;
    }
    scoreSheet[2].upperGrandTotal = scoreSheet[2].upperTotal + scoreSheet[2].bonus;
    
    upperTotalDisp.textContent = scoreSheet[2].upperTotal;
    bonusDisp.textContent = scoreSheet[2].bonus;
    upperGrandTotalDisp.textContent = scoreSheet[2].upperGrandTotal;
    upperGrandTotalDisp2.textContent = scoreSheet[2].upperGrandTotal;
  }

  // If all the lower section scores are in, calculate and display the lower totals. 
  if (!isScoreMissingLower) {
    scoreSheet[2].lowerGrandTotal = lowerScoreArray.reduce(reducer);
    lowerGrandTotalDisp.textContent = scoreSheet[2].lowerGrandTotal;
  }

  // If both the upper and lower scores are all in, calculate and display the final score and set the gameFinished variable to true.
  if (scoreSheet[2].upperGrandTotal !== null && scoreSheet[2].lowerGrandTotal !== null) {
    scoreSheet[2].gameGrandTotal = scoreSheet[2].upperGrandTotal + scoreSheet[2].lowerGrandTotal;
    gameGrandTotalDisp.textContent = scoreSheet[2].gameGrandTotal;

    gameFinished = true;
  }
}

function enableHoldButtons() {
  for (let i = 0; i < holdButtons.length; i++) {
    holdButtons[i].removeAttribute("disabled", "");
  }
}

function disableHoldButtons() {
  for (let i = 0; i < holdButtons.length; i++) {
    holdButtons[i].setAttribute("disabled", "");
  }
}

function enableRollButton() {
  rollButton.removeAttribute("disabled", "");
}

function disableRollButton() {
  rollButton.setAttribute("disabled", "");
}


/*=========================================================*/
/*============== SCORE CALCULATION FUNCTIONS ==============*/
/*=========================================================*/


function calculateUpper(scoreSheetValueKey, selectedValue, domElementId) {
  // Calculates the upper section scores.
  // The score is calculated by totalling only the dice of the selected value.

  const domElement = document.getElementById(domElementId);
  if (!scoreSubmitted && scoreSheet[0][scoreSheetValueKey] === null) {
    scoreSheet[0][scoreSheetValueKey] = 0;
    diceObj.forEach(item => {
      if (item.currentValue === selectedValue) {
        scoreSheet[0][scoreSheetValueKey] += selectedValue;
      }
    });
  domElement.textContent = scoreSheet[0][scoreSheetValueKey];
  calculationEnd();
  }
}

function calculateThreeOfKind() {
  // Checks if the dice values qualify for three of a kind.
  // If so, player receives a score of the total of all five dice. If not a three of a kind, player receives score of zero.

  if (!scoreSubmitted && scoreSheet[1].threeOfAKind === null) {
    if (diceValueArray[0] === diceValueArray[1] && diceValueArray[1] === diceValueArray[2]) {
      for (let i = 0; i < diceObj.length; i++) {
        scoreSheet[1].threeOfAKind += diceObj[i].currentValue; 
      }
    } else if (diceValueArray[1] === diceValueArray[2] && diceValueArray[2] === diceValueArray[3]) {
      for (let i = 0; i < diceObj.length; i++) {
        scoreSheet[1].threeOfAKind += diceObj[i].currentValue; 
      }
    } else if (diceValueArray[2] === diceValueArray[3] && diceValueArray[3] === diceValueArray[4]) {
      for (let i = 0; i < diceObj.length; i++) {
        scoreSheet[1].threeOfAKind += diceObj[i].currentValue; 
      }
    } else {
        scoreSheet[1].threeOfAKind = 0;
      }
    threeOfKindScoreDisp.textContent = scoreSheet[1].threeOfAKind;
    calculationEnd();
  }
}

function calculateFourOfKind() {
  // Checks if the dice values qualify for four of a kind.
  // If so, player receives a score of the total of all five dice. If not a four of a kind, player receives score of zero.

  if (!scoreSubmitted && scoreSheet[1].fourOfAKind === null) {
    if (diceValueArray[1] === diceValueArray[2] && diceValueArray[2] === diceValueArray[3]) {
      if (diceValueArray[2] === diceValueArray[0] || diceValueArray[2] === diceValueArray[4]) {
        for (let i = 0; i < diceObj.length; i++) {
          scoreSheet[1].fourOfAKind += diceObj[i].currentValue;
        }
      } else {
        scoreSheet[1].fourOfAKind = 0;
      }
    } else {
      scoreSheet[1].fourOfAKind = 0;
    }
    fourOfKindScoreDisp.textContent = scoreSheet[1].fourOfAKind;
    calculationEnd();
  }
}

function calculateFullHouse() {
  // Checks if the dice values qualify for full house.
  // If so, player receives a fixed score of 25. If not a full house, player receives score of zero.

  let comboOne = false;
  let comboTwo = false;
  if (!scoreSubmitted && scoreSheet[1].fullHouse === null) {
    if (diceValueArray[0] === diceValueArray[1]) {
      if (diceValueArray[2] === diceValueArray[3] && diceValueArray[3] === diceValueArray[4]) {
        if (diceValueArray[1] !== diceValueArray[2]) {
          comboOne = true;
        }
      }
    }
    if (diceValueArray[0] === diceValueArray[1] && diceValueArray[1] === diceValueArray[2]) {
      if (diceValueArray[3] === diceValueArray[4]) {
        if (diceValueArray[2] !== diceValueArray[3]) {
          comboTwo = true;
        }
      }
    }
    if (comboOne || comboTwo) {
      scoreSheet[1].fullHouse = 25;
    } else {
      scoreSheet[1].fullHouse = 0;
    }
    fullHouseScoreDisp.textContent = scoreSheet[1].fullHouse;
    calculationEnd();
  }
}

function calculateSmallStraight() {
  // Checks if the dice values qualify for small straight.
  // If so, player receives a fixed score of 30. If not a small straight, player receives score of zero.

  let status = false;
  let possibleSmallStraights = [
  [1,1,2,3,4],
  [1,2,2,3,4],
  [1,2,3,3,4],
  [1,2,3,4,4],
  [1,2,3,4,5],
  [1,2,3,4,6],
  [2,2,3,4,5],
  [2,3,3,4,5],
  [2,3,4,4,5],
  [2,3,4,5,5],
  [1,3,4,5,6],
  [2,3,4,5,6],
  [3,3,4,5,6],
  [3,4,4,5,6],
  [3,4,5,5,6],
  [3,4,5,6,6]
  ];
  if (!scoreSubmitted && scoreSheet[1].smallStraight === null) {
    for (let i = 0; i < possibleSmallStraights.length; i++) {
      if (JSON.stringify(diceValueArray) === JSON.stringify(possibleSmallStraights[i])) {
        status = true;
      }
    }
    if (status === true) {
      scoreSheet[1].smallStraight = 30;
    } else {
      scoreSheet[1].smallStraight = 0;
    }
    smallStraightScoreDisp.textContent = scoreSheet[1].smallStraight;
    calculationEnd();
  }
}

function calculateLargeStraight() {
  // Checks if the dice values qualify for large straight.
  // If so, player receives a fixed score of 40. If not a large straight, player receives score of zero.

  let status = false;
  let possibleLargeStraights = [[1,2,3,4,5],[2,3,4,5,6]];
  if (!scoreSubmitted && scoreSheet[1].largeStraight === null) {
    possibleLargeStraights.forEach(item => {
      if (JSON.stringify(diceValueArray) === JSON.stringify(item)) {
        status = true;
      }
    });
    if (status === true) {
      scoreSheet[1].largeStraight = 40;
    } else {
      scoreSheet[1].largeStraight = 0;
    }
    largeStraightScoreDisp.textContent = scoreSheet[1].largeStraight;
    calculationEnd();
  }
}

function calculateYahtzee() {
  // Checks if the dice values qualify for yahtzee.
  // If so, player receives a fixed score of 50. If not a yahtzee, player receives score of zero.

  let status = true;
  if (!scoreSubmitted && scoreSheet[1].yahtzee === null) {
    for (let i = 1; i < diceValueArray.length; i++){
      if (diceValueArray[i - 1] !== diceValueArray[i]) {
        status = false;
        break
      }
    }
    if (status) {
      scoreSheet[1].yahtzee = 50;
    } else {
      scoreSheet[1].yahtzee = 0;
    }
    yahtzeeScoreDisp.textContent = scoreSheet[1].yahtzee;
    calculationEnd();
  }
}

function calculateChance() {
  // Calculates the score of the chance.
  // Player receives a score of the total dice values.

  if (!scoreSubmitted && scoreSheet[1].chance === null) {
    for (let i = 0; i < diceObj.length; i++) {
      scoreSheet[1].chance += diceObj[i].currentValue;
    }
    chanceScoreDisp.textContent = scoreSheet[1].chance;
    calculationEnd();
  }
}


/*==============================================*/
/*============== HELP BOX POP UPS ==============*/
/*==============================================*/


let threeOfAKindHelpMarker = document.getElementById('threeOfAKindHelp');

threeOfAKindHelpMarker.addEventListener('mouseover', function() {
  document.getElementById('threeOfAKindHelpBox').style.display = 'block';
});
threeOfAKindHelpMarker.addEventListener('mouseout', function() {
  document.getElementById('threeOfAKindHelpBox').style.display = 'none';
});


let fourOfAKindHelpMarker = document.getElementById('fourOfAKindHelp');

fourOfAKindHelpMarker.addEventListener('mouseover', function() {
  document.getElementById('fourOfAKindHelpBox').style.display = 'block';
});
fourOfAKindHelpMarker.addEventListener('mouseout', function() {
  document.getElementById('fourOfAKindHelpBox').style.display = 'none';
});


let fullHouseHelpMarker = document.getElementById('fullHouseHelp');

fullHouseHelpMarker.addEventListener('mouseover', function() {
  document.getElementById('fullHouseHelpBox').style.display = 'block';
});
fullHouseHelpMarker.addEventListener('mouseout', function() {
  document.getElementById('fullHouseHelpBox').style.display = 'none';
});


let smallStraightHelpMarker = document.getElementById('smallStraightHelp');

smallStraightHelpMarker.addEventListener('mouseover', function() {
  document.getElementById('smallStraightHelpBox').style.display = 'block';
});
smallStraightHelpMarker.addEventListener('mouseout', function() {
  document.getElementById('smallStraightHelpBox').style.display = 'none';
});


let largeStraightHelpMarker = document.getElementById('largeStraightHelp');

largeStraightHelpMarker.addEventListener('mouseover', function() {
  document.getElementById('largeStraightHelpBox').style.display = 'block';
});
largeStraightHelpMarker.addEventListener('mouseout', function() {
  document.getElementById('largeStraightHelpBox').style.display = 'none';
});


let yahtzeeHelpMarker = document.getElementById('yahtzeeHelp');

yahtzeeHelpMarker.addEventListener('mouseover', function() {
  document.getElementById('yahtzeeHelpBox').style.display = 'block';
});
yahtzeeHelpMarker.addEventListener('mouseout', function() {
  document.getElementById('yahtzeeHelpBox').style.display = 'none';
});


let chanceHelpMarker = document.getElementById('chanceHelp');

chanceHelpMarker.addEventListener('mouseover', function() {
  document.getElementById('chanceHelpBox').style.display = 'block';
});
chanceHelpMarker.addEventListener('mouseout', function() {
  document.getElementById('chanceHelpBox').style.display = 'none';
});


let howToPlay = document.getElementById('howToPlay');

howToPlay.addEventListener('mouseover', function() {
  document.getElementById('ruleBox').style.display = 'block';
});
howToPlay.addEventListener('mouseout', function() {
  document.getElementById('ruleBox').style.display = 'none';
});
