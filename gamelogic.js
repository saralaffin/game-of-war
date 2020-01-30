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

// some logic from my memory card game:
//make loop to fill card array.
//rank will become one character from array
//change the position of the comment to add more cards
var ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var suits = ["hearts","spades","clubs","diamonds"]
var cards = [];

for (j=0; j<4; j++) {
	for (i=0; i<ranks.length; i++) {
		cards[i+ranks.length*j] = {
			rank: ranks[i],
			suit: suits[j],
			randomNum: Math.random()
		}
	}
}

//each entry in the cards array is an object so in the sort function, a and b refer to each object entry and .randomNumber calls that property and sorts the cards array based on its random number.
var shuffle = function(deck) {
	return deck.sort(function(a,b){return (b.randomNum - a.randomNum)});
}

cards = shuffle(cards);

var cardsP1 = cards.subarray(0,26)
var cardsP2 = cards.subarray(26)