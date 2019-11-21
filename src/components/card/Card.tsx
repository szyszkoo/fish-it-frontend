import * as React from "react";
import "./Card.scss";

export interface ICardProps {
  description: string;
  shortDescription: string;
  onClick: any;
}

export interface ICardState {
  description: string;
  isHovering: boolean;
}

//TODO: re-write it as function component (use hooks)
export default class Card extends React.Component<ICardProps, ICardState> {
  constructor(props: Readonly<ICardProps>) {
    super(props);
    this.state = {
      description: this.props.shortDescription,
      isHovering: false
    };
  }

  public render() {
    return (
      <div className="card" onClick={this.props.onClick} onMouseEnter={this.toggleHoverState} onMouseLeave={this.toggleHoverState}>
        <p className="cardDescription">
          {this.state.isHovering ? this.props.description : this.props.shortDescription }
        </p>
      </div>
    );
  }

  private toggleHoverState = () => {
    this.setState(prevState => ({
      isHovering: !prevState.isHovering
    }));
  }
}
