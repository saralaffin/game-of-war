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


class Card {
    constructor(suit,rank,value) {
        this.suit = suit
        this.rank = rank
        this.value = value
    }
}



class Deck {
    constructor() {
       this.cards = []
    }

    length() {
        return this.cards.length
    }

    shift() {
        return this.cards.shift()
    }

    draw() {
        let card = this.cards[Math.floor(Math.random()*this.length())]
        this.cards.splice(this.cards.indexOf(card),1)
        return card
    }

    push(card) {
        this.cards.push(card)
    }

    fill() {
      let ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
      let suits = ["\u2665","\u2663","\u2660","\u2666"]

      for (let j=0; j<4; j++) {
        for (let i=0; i<ranks.length; i++) {
        this.cards.push( new Card( suits[j], ranks[i], i))
        }
      }
    }
    concat(arr) {
        this.cards = this.cards.concat(arr)
    }
}

const playDeck = new Deck() 
playDeck.fill()

console.log(playDeck.length())

let deckP1 = new Deck();
let deckP2 = new Deck();

for (let i = 0; 0 < playDeck.length(); i++) {
    if (i%2 == 0) {
        deckP1.push(playDeck.draw())
    } else {
        deckP2.push(playDeck.draw())
    }
}



//zakk suggested game object when zack was asking a question
//lets try for a class object!
class Game {
    constructor(deckP1, deckP2){
        this.cardsP1 = deckP1, //object of class Deck containing cards array of objects (of class Card)
        this.cardsP2 = deckP2,
        this.handP1 = [], //subarray of object(s) in the card Class
        this.handP2 = [],
        this.inWar = false
    }
    
    
    flipCards(n = 1) { //pass in n number of cards to take out, 1 usually
        for (let i = 0; i < n; i++) {
            this.handP1.unshift(this.cardsP1.shift())
            
            this.handP2.unshift(this.cardsP2.shift())
        }
    }
    
    compareCards(index = 0) {
        //return true if comparison was simple and hands assigned 
        //return false if tied 
        if (this.handP1[index].value > this.handP2[index].value) {
            let decider = Math.random()
            if (decider > 0.5) {
                this.cardsP1.concat(this.handP1)
                this.cardsP1.concat(this.handP2)
            } else {
                this.cardsP1.concat(this.handP2)
                this.cardsP1.concat(this.handP1)
            }
            

            this.handP1 = []
            this.handP2 = []

            console.log(`Player 1 wins round!`)
            
            return true
        } else if (this.handP1[index].value < this.handP2[index].value) {
            this.cardsP2.concat(this.handP1)
            this.cardsP2.concat(this.handP2)

            this.handP1 = []
            this.handP2 = []

            console.log(`Player 2 wins round!`)

            return true
        } else {
            return false
        }
    }

    print(card1, card2) {
        let vars = [card1.rank, card2.rank, this.cardsP1.length()+this.handP1.length, this.cardsP2.length()+this.handP2.length]
        // vars = [rank1, rank2, cardsLeft1, cardsLeft2]
        
        for (let i = 0 ; i < vars.length; i++) {
            vars[i] = " " + vars[i];
            vars[i] = vars[i].padStart(3)
        }
        
        var template =`%c                                                                     
              # # # # # # # # # # # # # # # # # # # # #              
              #                                       #              
              #    Player 1  ____,_                   #              
  ${vars[2]} cards   # ~~~~~~~~~~~ |${vars[0]}${card1.suit} ^\\                  #              
     left     # ~~~~~~~~~  /|______/                  #              
              # ~~~~~~~~~~~~  \`   \`                   #              
              #                   _,____  Player 2    #  ${vars[3]} cards   
              #                  /^${vars[1]}${card2.suit} | ~~~~~~~~~~~ #     left     
              #                  \\______|\\  ~~~~~~~~~ #              
              #                   \`   \`  ~~~~~~~~~~~~ #              
              #                                       #              
              # # # # # # # # # # # # # # # # # # # # #              
                                                                     `;

        console.log(template, 'color: white; font-weight: bold; background: linear-gradient(90deg, red, orange, green, blue, violet, purple)');
    }

    printWar(numInWar) {
        let warTemplate = `%c                                                                     
              # # # # # # # # # # # # # # # # # # # # #              
              #                                       #              
              #  Player 1                   Player 2  #              `
        for (let i = 0; i < numInWar; i++) {
            let vars = [this.handP1[i].rank, this.handP2[i].rank]
            for (let i = 0 ; i < vars.length; i++) {
                vars[i] = " " + vars[i];
                vars[i] = vars[i].padStart(3)
            }

            warTemplate += `
              #           ____,_     _,____           #              
              # ~~~~~~~~ |${vars[0]}${this.handP1[i].suit} ^\\   /^${vars[1]}${this.handP2[i].suit} | ~~~~~~~~ #              
              # ~~~~~~  /|______/   \\______|\\  ~~~~~~ #              
              # ~~~~~~~~~  \`   \`     \`   \`  ~~~~~~~~~ #              
              #                                       #              `
        }
        warTemplate += `
              # # # # # # # # # # # # # # # # # # # # #              
                                                                     `

            console.log(warTemplate, 'color: white; font-weight: bold; background: linear-gradient(90deg, red, orange, green, blue, violet, purple)');
    }
    
}


const game = new Game(deckP1, deckP2)


let round = 0
while ((game.cardsP1.length() != 0) && (game.cardsP2.length() != 0) && round < 5000) {
    round++
    let roundFormatted = " " + round
    roundFormatted = roundFormatted.padStart(6)
    console.log(`%c   Round${roundFormatted}                        `,'color: white; font-weight: bold; font-size: 20px; background: linear-gradient(90deg, red, orange, green, blue, violet, purple)')
    game.flipCards(1)
    game.print(game.handP1[0],game.handP2[0])
    if (game.compareCards(0)) {
        // do nothing and loop will restart. Compare cards will assign all cards to winner's deck
    } 
    else {
        //WAR!
        game.inWar = true
        while (game.inWar) {
            numInWar = Math.min(3, game.cardsP1.length(), game.cardsP2.length())
            if ((numInWar === 0) && (game.cardsP1.length() > 0)) {
                game.cardsP1.concat(game.handP1)
                game.cardsP1.concat(game.handP2)
                game.inWar = false
            } else if ((numInWar === 0) && (game.cardsP2.length() > 0)) {                
                game.cardsP2.concat(game.handP1)
                game.cardsP2.concat(game.handP2)
                game.inWar = false
            } else {
                game.flipCards(numInWar)
                console.log(`%c   WAR!!!          `,'color: white; font-weight: bold; font-size: 40px; background: linear-gradient(90deg, red, orange, green, blue, violet, purple)')
                game.printWar(numInWar)
                for (let i = 0; i < numInWar; i++) {
                    //compare cards up to the number of cards we just added
                    if (game.compareCards(i)) {
                        game.inWar = false
                        break
                    }
                }
            }
            // game.inWar = false
            // game.cardsP1.cards = []

        }
    }
}
let winner;
if (game.cardsP1.length() > game.cardsP2.length()) {
    winner = 1
} else {
    winner = 2
}
let template = `%c                                                                     
              # # # # # # # # # # # # # # # # # # # # #              
              #                                       #              
              #  Player ${winner} WINS!                       #              
              #              ____________             #              
              # ~~~~~~~~~~~ |            |            #              
              # ~~~~~~~~~~~ |          ^_|_^          #              
              # ~~~~~~~~~  /|         / . . \\         #              
              # ~~~~~~~~~~/ |_________\\_>.<_/         #              
              # ~~~~~~~~~~~~ u u        u u           #              
              #                                       #              
              #                                       #              
              # # # # # # # # # # # # # # # # # # # # #              
                                                                     `;

console.log(template, 'color: white; font-weight: bold; background: linear-gradient(90deg, red, orange, green, blue, violet, purple)')

//playing with colors! from: https://coderwall.com/p/fskzdw/colorful-console-log
//console.log('%c the green hulk got mad!', 'color: green; font-weight: bold; background: linear-gradient(0deg, red, yellow)');