import React from 'react';
import CardInGame from '../CardInGame/CardInGame';
import { SquareDrop } from '../SquareDrop/SquareDrop';
import styles from './Battleground.module.css';


export function Battleground({game}) {

  const renderSquare = (idLine, squareId, className) => {
    return (
      <SquareDrop
        key={idLine + '_' + squareId}
        className={className}
        squareId={squareId}
        // moveCard={(item) => props.onDrop(item, squareId)}
        >
        {
          game.squares[squareId] ?
            <CardInGame
              // playerID={props.playerID}
              unit={game.squares[squareId]}
              previousSquareId={squareId}
              // moves={props.moves}
              >
            </CardInGame>
            : null
        }
      </SquareDrop>
    );
  }

  let rows = [];
  let squareId = 1;

  // Construct 6 layers with each:
  // - zone with 2 squares
  // - space
  // - zone with 3 squares
  // - space
  // - zone with 2 squares
  for (let i = 1; i < 7; i++) {
    let tbody = [];

    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'NotLeft'));
    squareId += 1;

    tbody.push(<div key={i} className={styles.Space}></div>);

    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'None'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;

    tbody.push(<div key={(i + 1)} className={styles.Space}></div>);

    tbody.push(renderSquare(i, squareId, 'Full'));
    squareId += 1;
    tbody.push(renderSquare(i, squareId, 'NotLeft'));
    squareId += 1;

    rows.push(tbody);
  }

  const battleground = rows.map((row, index) => {
    const className = (index === 2) ? styles.Line + ' ' + styles.F1 : styles.Line;
    return (<div key={'key_' + index} className={className}>
      {row}
    </div>);
  });

  return (
    <div className={styles.Battleground}>
      {battleground}
    </div>
  );
}
