import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.

  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }

  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O']),
  onRestart: PropTypes.func,
};

const getWinner = tiles => {
  
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [3,4,8], [6,4,7]
  ]
  for (let i = 0; i < winConditions.length; i +=1){

    if ((tiles[winConditions[i][0]] && tiles[winConditions[i][1]] && tiles[winConditions[i][2]]) === "X") {
        return tiles[winConditions[i][0]]
      } 
      else if ( (tiles[winConditions[i][0]] && tiles[winConditions[i][1] && tiles[winConditions[i][2]]]) === "O") {
        return tiles[winConditions[i][0]]
      } 
    }
    return null
};

const useTicTacToeGameState = initialPlayer => {
  const [tiles, setTiles] = React.useState(['', '', '', '', '', '', '', '', '']);
  const [currentPlayer, setCurrentPlayer] = React.useState(initialPlayer);
  const winner = getWinner(tiles);
  const [gameEnded, setGameEnded] = React.useState(false);
  const setTileTo = (tileIndex, player) => {
    if(tiles[tileIndex] === ""){
    setTiles({...tiles, [tileIndex] : player})
    } else return;
  };

  const restart = () => {
    setTiles(['', '', '', '', '', '', '', '', ''])
    setGameEnded(false);
    setCurrentPlayer('O');
  };

  useEffect(() =>{
    getWinner(tiles)
    winner !== null ? setGameEnded(true) :  setGameEnded(false);
    setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
  }, [tiles])

  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('O');
  return (
    <div className="tictactoe">
      <WinnerCard 
      show={gameEnded}
      winner={winner}
      onRestart={() => restart()}/>
        <div className="tictactoe-row">
          <Square 
            value={tiles[0]}
            onClick={() => {setTileTo(0, currentPlayer)}}/>
          <Square 
             value={tiles[1]}
             onClick={() => {setTileTo(1, currentPlayer)}}/>
          <Square 
             value={tiles[2]}
             onClick={() => {setTileTo(2, currentPlayer)}}/>
        </div> 
        <div className="tictactoe-row">
          <Square 
            value={tiles[3]}
            onClick={() => {setTileTo(3,currentPlayer)}}/>
          <Square     
            value={tiles[4]}
            onClick={() => {setTileTo(4, currentPlayer)}}/>
          <Square     
            value={tiles[5]}
            onClick={() => {setTileTo(5,currentPlayer)}}/>
        </div> 
      
        <div className="tictactoe-row">
          <Square 
            value={tiles[6]}
            onClick={() => {setTileTo(6, currentPlayer)}}/>
          <Square 
            value={tiles[7]}
            onClick={() => {setTileTo(7, currentPlayer)}}/>
          <Square 
            value={tiles[8]}
            onClick={() => {setTileTo(8, currentPlayer)}}/>
        </div> 
      
      
      {
     
      /* Este componente debe contener la WinnerCard y 9 componentes Square, 
      separados en tres filas usando <div className="tictactoe-row">{...}</div> 
      para separar los cuadrados en diferentes filas 
      
       {rowOfSquares.map( (row) => (
        <div className="tictactoe-row"
        key={`row-${row}`}>
        <Square 
        key={`square-0-${row}`} />
        <Square 
        key={`square-1-${row}`} />
       <Square 
        key={`square-2-${row}`} />
        </div> 
        
      ))}*/}
    </div>
  );
};
export default TicTacToe;
