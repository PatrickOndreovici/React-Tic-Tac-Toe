import React from 'react';
import './Square.css';

const Square = (props) => {
  let classes = "Square"
  if (props.empty){
    classes += " EmptySquare"
  }
  return (
    <div className = {classes} onClick = {props.pressSquare}>
        <div>{props.value}</div>
    </div>
  )
}

export default Square