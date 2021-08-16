import { render } from '@testing-library/react';
import React from 'react';
import generateBoard from './utils/generateBoard';

const Board = () => {

    let gameBoard = generateBoard();

    return (
        <> 
        <div className='board'>
        {gameBoard.map((item) => <div className="gem" style={{backgroundColor: item.color}}><p>{item.id}</p> <p>{item.color}</p></div>)}
        </div>
        </>
    );

}







export default Board;