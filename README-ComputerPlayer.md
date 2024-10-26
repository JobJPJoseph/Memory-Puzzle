# Computer Player

## Tasks
    1. We need to create a `constructor` that accept no arguments
        * should have a `points` property
        * should have a `memo` property that represents an object that will house past coordinates that the computer has chose.
            * Keys as letters and values as an array
    2. Create a method `getInput` accepts obj that represents coordinates of the letters
    3. Create a method `cacheCoordinate` that accepts key:value pair.
        * We will insert the key:value pair into the `memo`.
    4. Create a method called `pickRandCoordinate` that accepts an obj and return a random key:value pair form that object
    5. Create a method called `hasValue` that accepts a key:value pair
        * We will return a different coordinate with the same value if the `memo` has the value or return false otherwise

    Note: Do not remove any key : value pair from the obj
    Note: The Screen is a HashTable but the methods will recieve the elements as a HashTable
