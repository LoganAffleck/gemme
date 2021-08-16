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

        const gemColors = [
            'white', 'orange', 'blue', 
            'pink', 'yellow', 'red', 'green'
        ]
        
        const newColor = (colorAvoid = null) => {
            let validColors = gemColors;
            //if there's a color to avoid, remove it from the array of options... 
            if(colorAvoid){
                validColors = validColors.filter((color) => color != colorAvoid)
            }
            return validColors[Math.floor(Math.random() * 7)]
        }

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
        if(up || left){

            let gemAbove;
            let gem2Above;
            let gemLeft;
            let gem2Left;

            if(up){
                gemAbove = board.find((gem) => gem.id === up);
                
                //If all three are the same color, generate a new color. for the new gem.
                if(gemAbove.up && gemAbove.color === color){
                    gem2Above = board.find((gem) => gem.id === gemAbove.up);
                    if(gem2Above.color === color){
                        gemColor = newColor(color)
                    }
                }

                //remove the gem above from the array.
                board = board.filter((gem) => gem.id !== up);
                
                let {id, color} = gemAbove;
                up = {id: id, color: color};
            }

            if(left){
                //select the gem that's to the left.
                gemLeft = board.find((gem) => gem.id === left);

                //If all three are the same color, generate a new color. for the new gem.
                if(gemLeft.up && gemLeft.color === color){
                    gem2Left = board.find((gem) => gem.id === gemLeft.up);
                    if(gem2Left.color === color){
                        gemColor = newColor(color)
                    }
                }

                //remove it from the array.
                board = board.filter((gem) => gem.id !== left);

                let {id, color} = gemLeft;
                left = {id: id, color: color};
            }

            if(gemAbove){
                //Add the properties of the current gem to above.
                gemAbove.relatives.down = {id: `${x}${y}`, color: gemColor }
                board.push(gemAbove);
            }

            if(gemLeft){
                //Add the properties of the current gem to this one.
                gemLeft.relatives.right = {id: `${x}${y}`, color: gemColor }
                board.push(gemLeft);
            }

        }

        //create GEM:
        board.push(new Gem(gemColor, x, y, up, right, down, left))

        //If Y is less than the MAX, continue increasing Y.
        if(y < max){
            y++
        //Increase X and reset Y. 
        } else {
            x++;
            y = 0;
        }
    }

    return board;
}

fillBoard(7)

//export default fillBoard;
