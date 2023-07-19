const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let faceUpCard = {color: '', cardId: ''};
let canClick = true;
let matchedPairs = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let cardId = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    newDiv.setAttribute("id", cardId);
    cardId ++;
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // Check to see if cards can be clicked and card is not already flipped
  if (canClick && !event.target.classList.contains("flipped")) {
    // Flip card
    event.target.classList.add("flipped");
    let targetCardColor = event.target.classList[0];
    let targetCardId = event.target.id;

    // If no saved card, save card to var
    if (faceUpCard.color == '') {
      faceUpCard.color = targetCardColor;
      faceUpCard.cardId = targetCardId;

    // Else, compare to var and make sure 
    } else {
      canClick = false;

      // If colors match check win condition
      if (targetCardColor == faceUpCard.color && targetCardId != faceUpCard.cardId) {
        canClick = true;
        faceUpCard.color = '';
        faceUpCard.cardId = '';
        matchedPairs ++;
        if (matchedPairs == 5) {
          // You win!
          document.getElementsByTagName("h1")[0].innerText = "You win!";
        }
      // Else, flip cards after 1 second
      } else {
        setTimeout(() => {
          let card1 = document.getElementById(faceUpCard.cardId);
          let card2 = document.getElementById(targetCardId);

          console.log(`Card Id 1:${faceUpCard.cardId}, Card Id 2:${targetCardId}`)
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          faceUpCard.color = '';
          faceUpCard.cardId = '';
          canClick = true;
        }, 1000);
      }
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
