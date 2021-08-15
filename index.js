const gemColors = [
    'white', 'orange', 'blue', 
    'pink', 'yellow', 'red', 'green'
]

const newColor = () => {
    return gemColors[Math.floor(Math.random() * 7)]
}

class Gem {
    constructor(color, x, y, up, right, down, left){
        this.id = `${x}${y}`;
        this.color = color;
        this.selected = false;
        this.relatives = {up: up, right: right, down: down, left: left}
    }
}


//set the max for X and Y (board is always square)
let max = 7;

//Generate a starting board: 
let board = [];

const fillBoard = (max) => {
    
    //set the starting X and Y Coordinates
    let x = 0;
    let y = 0;

    while (x <= max && y <= max){

        //generate a random gem color.
        let gemColor = newColor()

        //configure RELATIVES:
        let up = `${x-1}${y}`;
        let right = `${x}${y+1}`;
        let down = `${x+1}${y}`;
        let left = `${x}${y-1}`;

        if(y === 0){
            left = null;
        };
        if(x === max){
            down = null;
        };
        if(x === 0){
            up = null;
        }
        if(y === max){
            right = null;
        }

        //Create dynamic info about UP/RIGHT/DOWN/LEFT
        if(up){
            //select the gem that's above.
            let gemAbove = board.find((gem) => gem.id === up);

            //remove it from the array.
            board = board.filter((gem) => gem.id !== up);

            //Add the properties of the current gem to this one.
            gemAbove.relatives.down = {id: `${x}${y}`, color: gemColor }
            board.push(gemAbove);
            
            let {id, color} = gemAbove;
            up = {id: id, color: color};
        }
        if(left){
            //select the gem that's to the left.
            let gemLeft = board.find((gem) => gem.id === left);

            //remove it from the array.
            board = board.filter((gem) => gem.id !== left);
            
            //Add the properties of the current gem to this one.
            gemLeft.relatives.right = {id: `${x}${y}`, color: gemColor }
            board.push(gemLeft);
            
            let {id, color} = gemLeft;
            left = {id: id, color: color};
        }

        // ****TODO --Prevent triplicate in any direction. 
        //     if(gemAbove.color === color && gemAbove.up){
        //         let gem2Above = board.find((gem) => gem.id === gemAbove.up)
        //         if (gem2Above.color === color){
        //             console.log(`COLOR: ${color} \n The gem above has a color of ${gemAbove.color} and up ${gem2Above.color}, \n so a new color must be created.` )
        //             color = newColor()
        //         }
        //     }
        // }

        //create GEM:
        board.push(new Gem(gemColor, x, y, up, right, down, left))



        if(y < max){
            y++
        } else {
            x++;
            y = 0;
        }
    }

    return board;
}
    //     start at [0,0] and move to the right, 

    //         CONSIDER RELATIVES:

    //         if coordinates[0] === 0, then gem.left is NULL;
    //         if coordinates[0] === 7, then gem.bottom is NULL; 
    //         if coordinates[1] === 7, then gem.right is NULL;
    //         if coordinates[1] === 0, then gem.up is NULL;

    //         otherwise, gem.relatives has to be found: 

    //             for RIGHT (if not already NULL): 
    //                 needs to be added by previous node

    //             for LEFT (if not already NULL): 
    //                 find the gem with coordinates `coordinates[0] -1` 
    //                 add the previous GEM to NEW gem.
    //                 Only include the FIRST TWO levels of relationship.
    //                 add the NEW gem to PREVIOUS GEM.

    //             for TOP (if not already NULL):
    //                 find the gem with coordinates `coordinates[1] -1`
                    
    //     when the Y coordinate is at 8, add one to X and set Y to 0;


  fillBoard(7)


console.log(board[12])