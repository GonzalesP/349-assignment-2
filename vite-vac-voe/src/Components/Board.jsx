import style from '../css/game.module.css';

// The Square component represents a clickable cell in the 3x3 Tic-Tac-Toe board
// the 'value' parameter indicates what will be placed inside the square. Each
// square will either have an X, O, or be empty.
function Square({ value, onSquareClick }) {
  return (
    <button className={style["square"]} onClick={onSquareClick}>
      {value}
    </button>
  );
}

// The Board component represents a Game components's 3x3 Tic-Tac-Toe game board
// It is composed of 9 clickable Square components.
// The board references 3 parameters passed down from its parent Game component.
// xIsNext indicates whether it is player X's turn or player O's turn.
// currentState is the current game state passed down from the Game component.
// onPlay references a function of the Game component. this function is used to
// record the new game state resulting from a new move made by any player.
export default function Board({ xIsNext, currentState, onPlay }) {
  // This function is called when a Square component is clicked (i.e. a new move
  // is made by any player). The cellNumber parameter refers to which square was
  // pressed (0 thru 8).
  // Depending on whether the new move is valid or not, a new game state will
  // be created. This new game state will have an X or O in the selected Square,
  // and the new game state will be added to the history of game states.
  // In order to save this new game state, the onPlay function will be used
  // (which is passed down from the parent Game component).
  function handleClick(cellNumber) {
    // First, check whether the chosen move is valid or not. If the Square
    // is already occupied, or if the game is already over, then the move
    // is not valid.
    if (currentState[cellNumber] || calculateWinner(currentState)) {
      return;
    }

    // If the move is valid, create a copy of the current state. Then, update
    // the copy to contain the new move (made by either X or O).
    const nextState = currentState.slice();
    if (xIsNext) {
      nextState[cellNumber] = "X";
    } else {
      nextState[cellNumber] = "O"
    }

    // Lastly, save this new game state by calling the onPlay function, which
    // will save this new state in a history variable.
    onPlay(nextState);
  }

  // This function is used to determine whether either player has won yet. If a
  // player has won, it will return their symbol (X or O). Otherwise, if neither
  // player has won, the function will return null.
  function calculateWinner(currentState) {
    // First, create a list of the possible win conditions (3 in a row,
    // 3 in a column, or 3 in a diagonal).
    const winConditions = [
      [0, 1, 2],  // top row
      [3, 4, 5],  // middle row
      [6, 7, 8],  // bottom row
      [0, 3, 6],  // left column
      [1, 4, 7],  // middle column
      [2, 5, 8],  // right column
      [0, 4, 8],  // top left to bottom right
      [2, 4, 6]  // top right to bottom left
    ];
  
    // Next, iterate through the list of possible win conditions. If any of them
    // have the same symbol in each position (e.g. all X's in the top row),
    // return the corresponding winner
    for (const condition of winConditions) {
      // first, get the 3 Square numbers of the win condition
      // (e.g. 0, 1, 2 for the top row)
      const [a, b, c] = condition
      // if the 3 Squares of any win condition match, then that player has won
      if (currentState[a] && currentState[a] === currentState[b] &&
          currentState[a] === currentState[c]) {
        
        return currentState[a];
      }
    }

    // Otherwise, if none of the win conditions are satisfied, neither player
    // has won. So, return null
    return null;
  }

  // winner indicates whether either Player has won the game or not
  const winner = calculateWinner(currentState);

  // Status is a message that indicates which player will make the next move
  // (or alternatively, which player has won). Depending on whether winner is
  // null or not, its text will be changed accordingly.
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // The JSX of the Board component consists of the status message and
  // 9 Square components. The 9 Square components are arranged in a 3x3 grid.
  // Styles are provided by css/game.module.css
  return (
    <>
      <div className={style["status-container"]}>
        <p className={style["status-message"]}>{status}</p>
      </div>
      <div className={style["board-row"]}>
        <Square value={currentState[0]} onSquareClick={() => handleClick(0)} />
        <Square value={currentState[1]} onSquareClick={() => handleClick(1)} />
        <Square value={currentState[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className={style["board-row"]}>
        <Square value={currentState[3]} onSquareClick={() => handleClick(3)} />
        <Square value={currentState[4]} onSquareClick={() => handleClick(4)} />
        <Square value={currentState[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className={style["board-row"]}>
        <Square value={currentState[6]} onSquareClick={() => handleClick(6)} />
        <Square value={currentState[7]} onSquareClick={() => handleClick(7)} />
        <Square value={currentState[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}