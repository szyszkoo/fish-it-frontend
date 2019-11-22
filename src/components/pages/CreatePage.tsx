import * as React from "react";
import Card, { ICardProps } from "../card/Card";
import { Input, Divider, Button, Select, Icon } from "antd";
import "./CreatePage.scss";
import Title from "antd/lib/typography/Title";

const CreatePage = () => {
    const { Option } = Select;
    const [cards, setCards] = React.useState<Array<ICardProps>>([]);
    const [nativeWord, setNativeWord] = React.useState<string>("");
    const [foreignWord, setForeignWord] = React.useState<string>("");
    const [nativeLanguage, setNativeLanguage] = React.useState<string>("");
    const [foreignLanguage, setForeignLanguage] = React.useState<string>("");

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

    const handleOnNativeLanguageChange = (value: string) => {
        setNativeLanguage(value);
     }    
     const handleOnForeignLanguageChange = (value: string) => {
        setForeignLanguage(value);
     }

    // TODO: Make this form prettier, extract css, handle on "create set"
    return <>
            <Title> Create a new set </Title>
            <Divider />
        <div>
            <h2>Select languages</h2>
            <Select onChange={handleOnNativeLanguageChange} style={{ width: 200 }} placeholder="Native language">
                <Option value="en">English</Option>
                <Option value="de">German</Option>
                <Option value="pl">Polish</Option>
                <Option value="es">Spanish</Option>
            </Select>
            <Icon type="right"/>
            <Select onChange={handleOnForeignLanguageChange} style={{ width: 200 }} placeholder="Foreign language">
                <Option value="en">English</Option>
                <Option value="de">German</Option>
                <Option value="pl">Polish</Option>
                <Option value="es">Spanish</Option>
            </Select>
        </div>
        <Divider />
        <h2>Add new flashcards</h2>
        <div>
            <Input placeholder="Native word" value={nativeWord} onChange={handleOnNativeWordChange} />
            <Input placeholder="Foreign word" value={foreignWord} onChange={handleOnForeignWordChange} />
            <Button onClick={addCard} icon="plus">Add</Button>
        </div>
        <Divider />
        {cards && renderCards()}
    </>
}

export default CreatePage;