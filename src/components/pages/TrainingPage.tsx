import * as React from "react";

export interface ITrainingProps {
  description: string;
  shortDescription: string;
  onClick: any;
}

export interface ITrainingState {
  description: string;
  isHovering: boolean;
}

export default class Training extends React.Component<ITrainingProps, ITrainingState> {
  render() {
    return (
      <h1> This will be a training page :> </h1>
    )
  }

}