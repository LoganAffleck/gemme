const gemColors = [
    'white', 'orange', 'blue', 
    'pink', 'yellow', 'red', 'green'
]

class Gem {
    constructor(color, x, y, up, right, down, left){
        this.id = [x, y];
        this.color = color;
        this.relatives = {up: up, right: right, down: down, left: left}
    }
}

//Generate a starting board: 
/*
    until gem.id = [7, 7],
    add a new gem to the board: 
        start at [0,0] and move to the right, 

            CONSIDER RELATIVES:

            if coordinates[0] === 0, then gem.left is NULL;
            if coordinates[0] === 7, then gem.bottom is NULL; 
            if coordinates[1] === 7, then gem.right is NULL;
            if coordinates[1] === 0, then gem.up is NULL;

            otherwise, gem.relatives has to be found: 

                for RIGHT (if not already NULL): 
                    needs to be added by previous node

                for LEFT (if not already NULL): 
                    find the gem with coordinates `coordinates[0] -1` 
                    add the previous GEM to NEW gem.
                    Only include the FIRST TWO levels of relationship.
                    add the NEW gem to PREVIOUS GEM.

                for TOP (if not already NULL):
                    find the gem with coordinates `coordinates[]`
                    
        when the Y coordinate is at 8, add one to X and set Y to 0;



*/