import * as React from "react";
import "./Card.scss";
import ICardProps from "./ICardProps";
import { CardType } from "src/enums/CardType";
import CardSingleSide from "./CardSingleSide";
import CardTwoSides from "./CardTwoSides";

const Card = (props: ICardProps) => {
  switch (props.cardType) {
    case CardType.TwoSides:
      return <CardTwoSides {...props} />
    default:
      return <CardSingleSide {...props} />
  }
}

export default Card;
