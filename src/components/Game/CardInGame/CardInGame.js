import React, { useState } from "react";
import { useDrag } from "react-dnd";
import CardReadMode from "../../Cards/CardReadMode";
// import CardUnit from "../../Decks/DeckItem/CardItem/CardUnit";
// import { ItemTypes } from "./../Drag/ItemTypes";
import styles from "./CardInGame.module.css";
// import { PHASES } from "../../../game/PAFF";

function CardInGame({ unit, previousSquareId }) {
  const [cardHover, setCardHover] = useState(false);
  // // let timerId;
  // // let plusClick = 0;

  const [{ isDragging }, drag] = useDrag({
    item: {
      card: unit,
      previousSquareId
    },
    type: 'card',
    // canDrag: () => {
    //   // Possible drag on if
    //   // - active player
    //   // - APPLY ORDERS PHASE or DEPLOYMENT PHASE

    //   return (
    //     (props.ctx.phase === PHASES.DEPLOYMENT ||
    //       props.ctx.phase === PHASES.FIGHT) &&
    //     props.playerID !== null
    //   );
    // },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
  // const _debounceFunction = function (func, delay) {
  //   // Cancels the setTimeout method execution
  //   clearTimeout(timerId)

  //   // Executes the func after delay time.
  //   timerId = setTimeout(func, delay)
  // }

  const onRightClickHandler = (event) => {
    event.preventDefault();
    setCardHover(true);
  };

  const onMouseLeaveHandler = () => {
    setCardHover(false);
  };

  // const onClickPlusHandler = () => {
  // console.log('plus');
  // plusClick ++;
  // if (props.moves) {
  //   console.log(plusClick);

  //   _debounceFunction(function() {
  //     props.moves.changeRegimentNumber(props.previousSquareId, '+', plusClick);
  //     plusClick = 0;
  //   }, 1000);
  // }

  //   if (props.moves && props.playerID) {
  //     props.moves.changeRegimentNumber(props.previousSquareId, "+");
  //   }
  // };

  // const onClickLessHandler = () => {
  //   if (props.moves && props.playerID)
  //     props.moves.changeRegimentNumber(props.previousSquareId, "-");
  // };

  // const imageUrl = !props.unit.image
  //   ? require(`../../../assets/logo.jpg`)
  //   : require(`../../../assets/cartes/${props.unit.faction.slug}/${props.unit.image}`);

  return (
    <>
      <div className={styles.CardUnit}
      ref={drag} 
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      onContextMenu={onRightClickHandler}
      onMouseLeave={onMouseLeaveHandler}
      >
        <img src={`${process.env.PUBLIC_URL}/images/${unit.faction.slug}/${unit.slug}.jpg`} alt="" />

        {
        cardHover ? (
          <div className={styles.CardHover}>
            <CardReadMode card={unit} faction={unit.faction} displayCount={false}/>
          </div>
        ) : null
      }
      </div>
    </>
    // <div
    //   className={[
    //     styles.CardUnit,
    //     styles.container,
    //     styles[props.unit.faction.slug],
    //   ].join(" ")}
    //   onContextMenu={onRightClickHandler}
    //   onMouseLeave={onMouseLeaveHandler}
    //   ref={drag}
    //   style={{
    //     opacity: isDragging ? 0.5 : 1,
    //     cursor: "move",
    //   }}
    // >
    //   <div className={styles.name}>
    //     <span>{props.unit.nom}</span>
    //   </div>
    //   <div
    //     className={styles.Image}
    //     style={{ backgroundImage: `url(${imageUrl})` }}
    //   >
    //     {/* <img src={imageUrl} alt="" /> */}
    //   </div>
    //   <div className={styles.Regiment}>{props.unit.regiment}</div>
    //   <div className={styles.RegimentButtons}>
    //     <p onClick={onClickPlusHandler}>+</p>
    //     <p onClick={onClickLessHandler}>-</p>
    //   </div>

    // </div>
  );
}

export default CardInGame;
