import * as React from 'react';
import Card from './Card';

export interface IHomeProps {
  description: string;
  shortDescription: string;
  onClick: any;
}

export interface IHomeState {
  description: string;
  isHovering: boolean;
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
  render() {
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Card shortDescription="Create a new set" description="Create a new set of your vocabulary flashcards" onClick={() => alert("Would redirect to the new set creation site")} />
        <Card shortDescription="Start practising!" description="Create a new set of your vocabulary flashcards" onClick={() => alert("Would redirect to the practising view")} />
        <Card shortDescription="Some third option" description="Create a new set of your vocabulary flashcards" onClick={() => alert("Would redirect somewhere else")} />
      </div>
    )
  }

}