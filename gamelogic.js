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

class Card {
    constructor(rank, suit, value, randomNum) {
        this.rank = rank
        this.suit = suit
        this.value = value
        this.randomNum = randomNum
    }
}


let ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
let suits = ["hearts","spades","clubs","diamonds"]
let cards = [];

for (let j=0; j<4; j++) {
	for (let i=0; i<ranks.length; i++) {
        cards[i+ranks.length*j] = new Card(ranks[i], suits[j], i+2, Math.random())
        // {
		// 	rank: ranks[i],
        //     suit: suits[j],
        //     value: i+2, //doesn't actually matter if value: i or i+2
		// 	randomNum: Math.random()
		// }
	}
}

//each entry in the cards array is an object so in the sort function, a and b refer to each object entry and .randomNumber calls that property and sorts the cards array based on its random number.
function shuffle(deck) {
	return deck.sort(function(a,b){return (b.randomNum - a.randomNum)});
}

cards = shuffle(cards);

let deckP1 = [];
let deckP2 = [];

for (let i = 0; i <cards.length; i++) {
    if (i%2 == 0) {
        deckP1.push(cards[i])
    } else {
        deckP2.push(cards[i])
    }
}

// console.log(deckP1)
// console.log(deckP2)




class Card {
    constructor(suit,rank,score) {
        this.suit = suit
        this.rank = rank
        this.score = score
    }
}



class Deck {
    constructor(arr) {
       this.cards = arr
    }

    length() {
        return this.cards.length
    }

    draw() {
        return this.cards[Math.floor(Math.random()*52)]
    }
}

const playDeck = new Deck([]) 

let ranks = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];
let suits = ["hearts","spades","clubs","diamonds"]

for (let j=0; j<4; j++) {
   for (let i=0; i<ranks.length; i++) {
       playDeck.cards.push( new Card(ranks[i], suits[j], i))
   }
}













//zakk suggested game object when zack was asking a question
let game = {
    cardsP1: deckP1, //an array of objects
    cardsP2: deckP2,
    handP1: [], //subarray of object(s)
    handP2: [],
    flipCards: function(n=1) { //pass in n number of cards to take out, 1 usually
        for (let i = 0; i < n; i++) {
            this.handP1.unshift(this.cardsP1[i])
            this.cardsP1.shift()
            this.handP2.unshift(this.cardsP2[i])
            this.cardsP2.shift()
        }
    },
    compareCards: function(index=0) {
        //return true if comparison was simple and hands assigned 
        //return false if tied game.handP1[0].value
        //console.log("i'm inside the function! ", game.handP1[0].value )
        if (this.handP1[index].value >= this.handP2[index].value) {
            this.cardsP1 = this.cardsP1.concat(this.handP1)
            this.cardsP1 = this.cardsP1.concat(this.handP2)

            this.handP1 = []
            this.handP2 = []
            return true
        } else if (this.handP1[index].value < this.handP2[index].value) {
            this.cardsP2 = this.cardsP2.concat(this.handP1)
            this.cardsP2 = this.cardsP2.concat(this.handP2)

            this.handP1 = []
            this.handP2 = []
            return true
        } else {
            return false
        }
    },
    inWar: false,
    inWarIndex: 0
}
// console.log(cardsP1[0])
// console.log(cardsP2[0])
// console.log(game.handP1)
// console.log(game.handP2)
// game.warCards()
// console.log(game.handP1)
/*
console.log("first entry in cardsP1:")
console.log(game.cardsP1[0])



console.log("handP1 after flipCards:")
console.log(game.handP1[4].value)
console.log("length of cardsP1")
console.log(game.cardsP1)
console.log("length of cardsP1 after concat")
// game.cardsP1 = game.cardsP1.concat(game.handP1)
// game.cardsP1 = game.cardsP1.concat(game.handP2)
console.log(game.cardsP1)
*/
game.flipCards(6)
console.log("starting! length of p1:",game.cardsP1.length)
    console.log("length of p2: ",game.cardsP2.length)
    console.log("length of hand p1: ",game.handP1.length)
    console.log("length of hand p2: ",game.handP2.length)
//game.flipCards(1)
while (!(game.cardsP1.length === 0) && !(game.cardsP2.length === 0) ) { //while both players have cards, i.e. !not = 0
    if (game.compareCards(0)) {
        game.flipCards(6)
    } 
    console.log("iteration! length of p1: /n",game.cardsP1.length)
    console.log("length of p2: ",game.cardsP2.length)
    console.log("length of hand p1: ",game.handP1.length)
    console.log("length of hand p2: ",game.handP2.length)
    /* else {
        //WAR!
        if (game.inWar && inWarIndex < 3) {
            compareCards(game.inWarIndex)
            inWarIndex++
        } else {
            game.inWar = true //and assign cards to hand
            if ( (game.cardsP1.length >= 3) && (game.cardsP2.length >= 3) ) {
                game.flipCards(3)
            } else {
                // else assign however many cards are left
                game.flipCards(Mat.max(game.cardsP1.length, game.cardsP2.length))
            }
        //compare cards and increase index
    }  */
}


console.log(game.handP1.length)
console.log(game.handP2.length)
