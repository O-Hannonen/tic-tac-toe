import React from "react";
import SingleBox from "./components/SingleBox";
import PointRow from "./components/PointRow";
import "./GameController.css";

export default class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.initGame();
  }

  initGame() {
    console.log("Initializing game");
    var grid = {};
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        grid[x.toString() + "-" + y.toString()] = null;
      }
    }
    if (this.state === undefined) {
      this.state = {
        grid: grid,
        turn: "X",
        winnerText: null,
        xWins: 0,
        oWins: 0,
      };
    } else {
      this.setState({ grid: grid, winnerText: null });
    }
  }

  handleClick(coordinate) {
    console.log("Clicked");
    var grid = this.state.grid;
    var value = grid[coordinate];
    if (value !== null || this.state.winnerText != null) {
      return;
    }

    grid[coordinate] = this.state.turn;

    this.setState({
      grid: grid,
      turn: this.state.turn === "X" ? "O" : "X",
    });

    this.checkForGameOver();
  }

  checkForGameOver() {
    var grid = this.state.grid;

    /// Checks the rows and columns
    var xWon = false;
    var oWon = false;
    for (var i = 0; i < 3; i++) {
      var rowString = "";
      var colString = "";
      for (var j = 0; j < 3; j++) {
        var rowVal = grid[j.toString() + "-" + i.toString()];
        var colVal = grid[i.toString() + "-" + j.toString()];
        rowString += rowVal;
        colString += colVal;
      }
      if (rowString === "XXX" || colString === "XXX") {
        xWon = true;
      } else if (rowString === "OOO" || colString === "OOO") {
        oWon = true;
      }
    }

    // Checks the diagonals
    var descending = grid["0-0"] + grid["1-1"] + grid["2-2"];
    var ascending = grid["0-2"] + grid["1-1"] + grid["2-0"];
    if (xWon || descending === "XXX" || ascending === "XXX") {
      this.setState({
        winnerText: "X WON!",
        xWins: this.state.xWins + 1,
      });
    } else if (oWon || descending === "OOO" || ascending === "OOO") {
      this.setState({
        winnerText: "O WON!",
        oWins: this.state.oWins + 1,
      });
    } else {
      // Chekcs the draw
      var allFilled = true;
      for (let coordinate in this.state.grid) {
        if (this.state.grid[coordinate] === null) {
          allFilled = false;
          return;
        }
      }

      if (allFilled) {
        this.setState({
          winnerText: "DRAW!",
        });
      }
    }
  }

  render() {
    let boxes = [];
    for (let coordinate in this.state.grid) {
      boxes.push(
        <SingleBox
          key={coordinate}
          coordinate={coordinate}
          value={this.state.grid[coordinate]}
          onClick={() => this.handleClick(coordinate)}
        />
      );
    }
    return (
      <body className="Game-controller">
        {/* <h1 className="Title">Tic tac toe</h1> */}
        <PointRow state={this.state} />
        <div className="Grid">{boxes}</div>
        <h2 className="Winner-text">{this.state.winnerText}</h2>
        {this.state.winnerText != null && (
          <button onClick={() => this.initGame()} className="Button">
            RESET
          </button>
        )}
      </body>
    );
  }
}
