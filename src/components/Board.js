import React from 'react';
import './Board.css';
import Square from './Square'

const Board = (props) => {
    let arrayOfSquares = []
    for (let row = 0; row < 3; ++row){
        for (let col = 0; col < 3; ++col){
            let empty = true;
            if (props.grid[row][col] !== ""){
                empty = false;
            }
            arrayOfSquares.push(<Square key = {row * 3 + col} empty = {empty} value = {props.grid[row][col]} pressSquare = {() => props.pressSquare(row, col)}></Square>)
        }
    }
    return (
        <div className = "Board">
            {arrayOfSquares}
        </div>
    )
}

export default Board