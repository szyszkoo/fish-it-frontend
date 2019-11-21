import * as React from "react";
import Card, { ICardProps } from "../card/Card";
import { Input, Divider, Button } from "antd";
import "./CreatePage.scss";
import Title from "antd/lib/typography/Title";

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

            setNativeWord("");
            setForeignWord("");
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
        <div>
            <Title> Create a new set </Title>
            <Input placeholder="Native word" value={nativeWord} onChange={handleOnNativeWordChange} />
            <Input placeholder="Foreign word" value={foreignWord} onChange={handleOnForeignWordChange} />
            <Button onClick={addCard} icon="plus">Add</Button>
        </div>
        <Divider />
        {cards && renderCards()}
    </>
}

export default CreatePage;