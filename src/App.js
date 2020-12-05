import React, {useState} from 'react';
import './App.css';
import Board from './components/Board'
import logo from './logo.png'

const App = () => {
    const [grid, setGrid] = useState(
        [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
        ]
     )
    const [score, setScore] = useState({
      playerX: 0,
      playerO: 0
    })
    const [moves, setMoves] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState("X")
    const [numberOfGames, setNumberOfGames] = useState(0)

    const goodTriplet = (a, b, c) => {
        return a === b && b === c && a != ""
    }
    const getWinner = () => {
        if (goodTriplet(grid[0][0], grid[0][1], grid[0][2])) return grid[0][0] + " wins"
        if (goodTriplet(grid[1][0], grid[1][1], grid[1][2])) return grid[1][0] + " wins"
        if (goodTriplet(grid[2][0], grid[2][1], grid[2][2])) return grid[2][0] + " wins"
        if (goodTriplet(grid[0][0], grid[1][0], grid[2][0])) return grid[0][0] + " wins"
        if (goodTriplet(grid[0][1], grid[1][1], grid[2][1])) return grid[0][1] + " wins"
        if (goodTriplet(grid[0][2], grid[1][2], grid[2][2])) return grid[0][2] + " wins"
        if (goodTriplet(grid[0][0], grid[1][1], grid[2][2])) return grid[0][0] + " wins"
        if (goodTriplet(grid[0][2], grid[1][1], grid[2][0])) return grid[0][2] + " wins"
        if (moves == 9) return "Draw"
        return ""
    }

    const pressSquare = (row, col) => {
        if (grid[row][col] != "" || getWinner() != "") return
        let newGrid = [...grid]
        newGrid[row][col] = currentPlayer
        setMoves(moves + 1)
        if (currentPlayer === "X") setCurrentPlayer("O")
        else setCurrentPlayer("X")
        setGrid(newGrid)
        const winner = getWinner()
        if (winner === "X wins") setScore({
          playerX: score.playerX + 1,
          playerO: score.playerO
        })
        else if (winner === "O wins") setScore({
          playerX: score.playerX,
          playerO: score.playerO + 1
        })
    }

    const restartGame = () => {
      setGrid(
        [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
       ]
      )
      setMoves(0)
      if (numberOfGames % 2 === 1) setCurrentPlayer("X")
      else setCurrentPlayer("O")
      setNumberOfGames(numberOfGames + 1)
    }

    let finishedGame = (
      <div className = "info">
        <h1>Current Player: {currentPlayer} </h1>
      </div>
    )
    if (getWinner() != ""){
      finishedGame = (
        <div className = "info2">
          <h1 style = {{marginTop: 100}}>{getWinner()}</h1>
          <button onClick = {restartGame}><p>Restart</p></button>
          <img src = {logo} style = {{display: "block"}}></img>
        </div>
      )
    }
    let scoreTable = (
      <div className = "ScoreTable">
        <h4>PlayerX: {score.playerX}</h4>
        <h4>PlayerO: {score.playerO}</h4>
      </div>
    )
    return (
        <div className = "App">
          {finishedGame}
          {scoreTable}
          <Board grid = {grid} pressSquare = {pressSquare}></Board>
        </div>
    )
}

export default App