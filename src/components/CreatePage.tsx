import * as React from 'react';
import Card, { ICardProps } from './Card';

const CreatePage = () => {
    const [cards, setCards] = React.useState<Array<ICardProps>>([]);
    const [nativeWord, setNativeWord] = React.useState<string>("");
    const [foreignWord, setForeignWord] = React.useState<string>("");

    const renderCards = () => {
        return cards.map((card, i) => <Card {...card} key={i} />);
    }

    const addCard = () => {
        if (!!nativeWord.trim() && !!foreignWord.trim()) {
            const newCard: ICardProps = {
                shortDescription: nativeWord,
                description: foreignWord,
                onClick: () => alert("You clicked my card") // TODO: Remove a card onClick?  
            }

            setCards(prevCards => [...prevCards, newCard]);
        }
        else {
            // TODO: display some message
        }
    }

    const handleOnNativeWordChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setNativeWord(event.target.value as string);
    }

    const handleOnForeignWordChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setForeignWord(event.target.value as string);
    }
    
    // TODO: Make this form prettier
    return <>
        <label>
            Polish:
      <input type="text" value={nativeWord} onChange={handleOnNativeWordChange} />
        </label>
        <label>
            English:
      <input type="text" value={foreignWord} onChange={handleOnForeignWordChange} />
        </label>
        <button type="button" onClick={addCard}>Add</button>
        {cards && renderCards()}
    </>
}

export default CreatePage;