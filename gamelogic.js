console.log("Print a message for each 'round' of the game showing the cards played by each user, who won the round, and how many cards each player now has")
/*
player class with {
    card/deck array that has number and suit
    get value function
    length function
    add cards function
    remove cards function
}

create 52 card deck
shuffle function and assign to player objects
    inputs: array of cards, which player to assign to
    if given 3 inputs, evenly distribute to both players

    there was a shuffle function from my memory card game from pre-work...

pseudo code:
while both player have cards (
    get one card from each player
    player1 hand = object[key][0] syntax notquite there, but access the key pointing to the deck array and get the first element


    compare the top card in each hand
    if p1 > p2 
        shuffle cards and add to p1
    if p2 > p1
        shuffle cards and add to p2
    else
        WAR!
        if players have enough cards to pull out 3
            pull out three cards and add to front of hand
        else if a player has no cards, other player wins!
        else
            pull out all cards left and add to front of hand. Maybe save old hand to hand-in-waiting?
        
        compare first card in each sub array and loop back through conditionals. while statement? or separate function? function could call itself from within itself...


)
Entire game as object
functions:
play round function
play war function

other properties
player 1
player 2
value list. (an array of values 2,3,... K,A)

Notes from Noah's powerpoint:
So in all, the whole game of war can be run with the following variables and functions (actions)
firstPlayerDeck = [];
secondPlayerDeck = [];
cardDeck = [];
spoilsOfWar = [];
warDeclared = boolean;
winnerOfRound = null;

startGame()
shuffle()
distributeCards()
conductTurn()
addCardsInPlay()
determineWinner()
prepareForWar()
assignWinnerCards()
receiveSpoilsOfWar()
finishTurn()
endGame()



*/

// some logic from my memory card game: (edited to suit this game)

let ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
let suits = ["hearts","spades","clubs","diamonds"]
let cards = [];

for (let j=0; j<4; j++) {
	for (let i=0; i<ranks.length; i++) {
		cards[i+ranks.length*j] = {
			rank: ranks[i],
            suit: suits[j],
            value: i+2, //doesn't actually matter if value: i or i+2
			randomNum: Math.random()
		}
	}
}

//each entry in the cards array is an object so in the sort function, a and b refer to each object entry and .randomNumber calls that property and sorts the cards array based on its random number.
function shuffle(deck) {
	return deck.sort(function(a,b){return (b.randomNum - a.randomNum)});
}

cards = shuffle(cards);

let cardsP1 = []
let cardsP2 = [];

for (i = 0; i <cards.length; i++) {
    if (i%2 == 0) {
        cardsP1.push(cards[i])
    } else {
        cardsP2.push(cards[i])
    }
}

//zakk suggested game object when zack was asking a question
let game = {
    deckP1: cardsP1, //an array of objects
    deckP2: cardsP2,
    handP1: [], //single object, or subarray of objects
    handP2: [],
    flipCards: function() {
        this.handP1 = cardsP1[0]
        this.cardsP1.shift()
        this.handP2 = cardsP2[0]
        this.cardsP2.shift()
    },
    warCards: function(n=3) { //pass in n number of cards to take out. default 3 if both players have enough cards
        for (let i = 0; i < n; i++) {
            this.handP1.unshift(cardsP1[i])
            this.cardsP1.shift()
            this.handP2.unshift(cardsP2[i])
            this.cardsP2.shift()
        }
    }
}
if (handP1.value>handP2.value) {
    cardsP1.push(handP1,handP2)
} else if (handP1.value<handP2.value) {
    cardsP2.push(handP1,handP2)
} else {
    //WAR!
}
