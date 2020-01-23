import * as React from "react";
import ICardProps from "./ICardProps";

const CardSingleSide = (props: ICardProps) => {
    return <>
    <div className="card" onClick={props.onClick}>
        <p className="cardDescription">
          {props.shortDescription}
        </p>
      </div>
    </>
}

export default CardSingleSide;