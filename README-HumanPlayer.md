# Human Player

## Tasks
    1. Create a constructor that accepts no arguments, has several properties.
        * points

    2. Create a method called `isValid` that accept a string representing the a player's input.
        * The purpose of this is to put the input in a series of tests for the input to later be hashed.

    3. Create a method called formatInput that will accept a string representing a player input.
        * The purpose of the method is to turn the input into an array type.

    4. Create a method called `getInputs` that will accept object .
        * The purpose of this is to create a Promise and return it.
        * We need to create a closure called `askGuess` that will continueously ask for a person input.
        * The object will represent a Hash Table that contains available coordinates for the player to choose.
        * Note: Make sure the context is correct
