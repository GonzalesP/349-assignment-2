import { useState } from "react";
import style from './css/game.module.css';
import Board from "./Components/Board";

// The Game component represents the entire Tic-Tac-Toe game, which consists of
// a 3x3 board and a history (list) of player moves made throughout the game.
export default function Game() {
  // A game state refers to the state a Tic-Tac-Toe game is in. A game state is
  // either ongoing or finished (depending on when the game continues or not).
  // Here is an example of a possible (ongoing) game state:
    // X|O|X
    // —+—+—
    // O|X| 
    // —+—+—
    // O| | 
  
  // The 'history' state variable is a list of game states. It records all of
  // the game states leading up to (and including) the current game state.
  // In short, it keeps a history of player moves during each turn.
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // The 'currentMove' state variable keeps track of how many moves
  // have been made so far in the current game state. At the beginning of the
  // game, currentMove is 0, since 0 moves have been made.
  const [currentMove, setCurrentMove] = useState(0);

  // The 'xIsNext' state variable keeps track of whether player X gets to
  // make the next move or not. Player X is the first to move, and
  // then they alternate with Player O for subsequent moves (X, O, X, ...).
  // In other words, Player X will always move when 'currentMove', aka the
  // total number of moves made so far, is even.
  const xIsNext = currentMove % 2 === 0;

  // 'currentGameState' is a state variable that keeps track of the game's
  // current state (i.e. its current appearance).
  // By default, it is set to the latest game state recorded in the
  // 'history' state. However, if a user clicks on one of the previous
  // game states (listed as moves in the game-history <ordered list>),
  // the currentGameState will be reverted to the selected older game state.
  const currentGameState = history[currentMove];

  // This function is called when a player makes a move (i.e. updates the
  // current game state).
  // The 'nextGameState' parameter represents the new game state resulting
  // from a new move made by any player. This new game state is added to the
  // list of game states saved in the 'history' variable.
  // Additionally, this function is passed to the Game's Board component, which
  // allows the Board to reference this function when needed (i.e. update the
  // game-board when a player makes a new, valid move)
  function handlePlay(nextGameState) {
    // create a new history variable by adding the new (most recent) game state
    // to the end of the current history (i.e. current list of moves/game states)
    const nextHistory = [...history.slice(0, currentMove + 1), nextGameState];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }



  // jumpTo() is called whenever a user clicks on one of the game states listed
  // in the game-history <ordered list>. When this function executes,
  // the 'currentMove' variable will be updated to the corresponding move that
  // the user selected from the game-history <ol>
  // (e.g. if they clicked on Move #3, the current game state will be reverted
  // to match the previous game state resulting from Move #3).
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // 'moves' is a constant that is used to render <list items> for the
  // game-history <ordered list>. each <list item> will contain a button
  // that can be clicked to change the currentGameState to any of the
  // game states saved in history (i.e. go back to the game state made after
  // a sepcific move).
  const moves = history.map((gameState, move) => {
    // description is the text of the <li>'s button. it describes what will
    // happen when the button is clicked (e.g. going back to move #3)
    let description;

    // the topmost button of the game's history will revert the game to the
    // very beginning (i.e. an empty 3x3 board).
    if (move > 0) {
      description = "Go to move #" + move;
    }
    // other buttons will revert the game to the corresponding move (#)
    else {
      description = "Go to game start";
    }

    // create a <li> and <button> using a JSX component and return it.
    // this JSX will be nested in the game-history <ordered list>.
    return (
      <li key={move}>
        <button className={style["history-item"]}
          onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });



  // The following JSX represents the Game component as a whole. The Game
  // consists of a game board and a game history. The board is created using
  // a <Board /> component, and the history is created using an <ordered list>.
  // The contents of the game-history <ol> is retrieved from 'moves'.
  // Additionally, the title of the Game, Vite-Vac-Voe, is shown at the top.
  // Styles are provided by css/game.module.css
  return (
    <>
      <div className={style["title-container"]}>
        <p className={style["title-text"]}>Vite-Vac-Voe</p>
      </div>
      <div className={style["game"]}>
        <div className={style["game-board"]}>
          <Board xIsNext={xIsNext} currentState={currentGameState} onPlay={handlePlay} />
        </div>
        <div className={style["game-history"]}>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}