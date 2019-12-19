import { CardType } from "src/enums/CardType";

export default interface ICardProps {
    description?: string;
    shortDescription: string;
    onClick?: any;
    cardType?: CardType;
  }