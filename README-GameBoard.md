# Game Board

## Tasks
    1. We need to import the Screen class.
        * We need to fill the Screen grid
    2. We need to create a grid the mimic the Screen grid but the defualt value should be a dash.
    3. Create a method called `generateHashTable`
        * The purpose of this is to iterate a collect all the coordinates that are not assigned
    4. Create a method called `printGameBoard`
        * The purpose of this is to print nodes in the hash table in a certain format
    5. Create a method called `assignCoordinate`
        * The purpose is to recieve an input from the user as an argument. We are going to use the arg as an input for the Screen's hash Table and use it to set the value for Game's hash Table
            * We need to be able to call it again with the same arg and reverse the changes.
    6. Create a method called 'addPoints'
        * Upon a successful pair, we will add 5 points to the player. Both instances have a points property. In order to get the context correct we will send the instance as an argument
    7. Create a property called 'players' that nests all the players
    8. Create a method called 'playRound'
        * The purpose of this is to get the player's inputs and display them.
    9. Create a property called recentInputs
        * This will be set that will keep record of the player's recent inputs
    10. Create a property called 'gridLength'
        * It will keep track of the assigned pairs
    11. Create a method called 'adjustGridLength'
        * When called will subtrack 2 from the 'gridLength'
    12. Create a method called 'run'
        * The goal is to iterate through the players in a certain way.
