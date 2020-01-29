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



*/