import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { useGameStore } from '../../../contexts/GameContext';

const Square = styled.div`
width: 100px;
  height: 125px;
  text-align: center;
  border: 1px solid grey;
`

export function SquareDrop({children, squareId, userUid}) {

  const { onDrop} = useGameStore()

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'card',
    drop: (item) => onDrop({...item, newSquareId: squareId, userUid}),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });

  let backgroundColor = 'white';
  if (canDrop && isOver) {
    backgroundColor = '#D99A4E'
  }

  return (
    <Square ref={drop} style={{ backgroundColor }}>
      {children}
    </Square >
  );
}
