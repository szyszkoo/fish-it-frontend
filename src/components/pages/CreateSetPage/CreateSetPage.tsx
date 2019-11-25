import * as React from "react";
import Card, { ICardProps } from "../../card/Card";
import { Input, Divider, Button, Select, Icon, Alert } from "antd";
import "./CreateSetPage.scss";
import Title from "antd/lib/typography/Title";

interface InfoMessages {
    flashCardInfo: string;
    languageInfo: string;
    titleInfo: string;
    wordInfo: string;
}

//TODO: extract some logic to the CreateSetPageService.ts file c:
const CreateSetPage = () => {
    const { Option } = Select;
    const [cards, setCards] = React.useState<Array<ICardProps>>([]);
    const [nativeWord, setNativeWord] = React.useState<string>("");
    const [foreignWord, setForeignWord] = React.useState<string>("");
    const [nativeLanguage, setNativeLanguage] = React.useState<string>("");
    const [foreignLanguage, setForeignLanguage] = React.useState<string>("");
    const [title, setTitle] = React.useState<string>("");
    const [infoMessage, setInfoMessage] = React.useState<InfoMessages>({
        flashCardInfo: "",
        languageInfo: "",
        titleInfo: "",
        wordInfo: ""
    });

    const renderCards = () => <>
        {cards.map((card, i) => <Card {...card} key={i} />)}
        <Divider />
    </>;

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
            setInfoMessage({ ...infoMessage, wordInfo: "The native and foreign word fields cannot be empty." });
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

    const handleOnTitleChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setTitle(event.target.value as string);
    }

    const clearInfoMessages = () => {
        (nativeWord && foreignWord && infoMessage.wordInfo) && setInfoMessage({ ...infoMessage, wordInfo: "" });
        (nativeLanguage && foreignLanguage && infoMessage.languageInfo) && setInfoMessage({ ...infoMessage, languageInfo: "" });
        (title && infoMessage.titleInfo) && setInfoMessage({ ...infoMessage, titleInfo: "" });
        (cards && cards.length > 0 && infoMessage.flashCardInfo) && setInfoMessage({ ...infoMessage, flashCardInfo: "" });
    }

    const addSet = () => {
        if (!validateForm()) {
            return;
        }

        const fiszki = cards.map(card => {
            return {
                src_text: card.shortDescription,
                src_lang: nativeLanguage,
                target_text: card.description,
                target_lang: foreignLanguage
            }
        });
        const set = {
            name: title,
            fiszki: fiszki
        };
        // TODO: post the set 
        console.log(set);
    }

    const validateForm = (): boolean => {
        const infoMessages: InfoMessages = {
            flashCardInfo: "",
            languageInfo: "",
            titleInfo: "",
            wordInfo: ""
        };

        if (!nativeLanguage || !foreignLanguage) {
            infoMessages.languageInfo = "Please fill in the languages first.";
        }

        if (!title) {
            infoMessages.titleInfo = "Title field cannot be empty.";
        }

        if (cards.length < 1) {
            infoMessages.flashCardInfo = "You need to add at least one flashcard to create a set.";
        }

        setInfoMessage(infoMessages);

        return (!!nativeWord && !!foreignWord && !!nativeLanguage && !!foreignLanguage && !!title && cards.length > 0);
    }

    React.useEffect(() => {
        clearInfoMessages();
    })

    return <>
        <Title> Create a new set </Title>
        <Divider />
        <div>
            <h2>Your set's title</h2>
            {infoMessage.titleInfo && <Alert message={infoMessage.titleInfo} type="info" showIcon />}
            <Input placeholder="Set's title" value={title} onChange={handleOnTitleChange} />
        </div>
        <Divider />
        <div>
            <h2>Select languages</h2>
            {infoMessage.languageInfo && <Alert message={infoMessage.languageInfo} type="info" showIcon />}
            <Select onChange={handleOnNativeLanguageChange} style={{ width: 200 }} placeholder="Native language">
                <Option value="en">English</Option>
                <Option value="de">German</Option>
                <Option value="pl">Polish</Option>
                <Option value="es">Spanish</Option>
            </Select>
            <Icon type="right" />
            <Select onChange={handleOnForeignLanguageChange} style={{ width: 200 }} placeholder="Foreign language">
                <Option value="en">English</Option>
                <Option value="de">German</Option>
                <Option value="pl">Polish</Option>
                <Option value="es">Spanish</Option>
            </Select>
        </div>
        <Divider />
        <h2>Add new flashcards</h2>
        {infoMessage.wordInfo && <Alert message={infoMessage.wordInfo} type="info" showIcon />}
        <div>
            <Input placeholder="Native word" value={nativeWord} onChange={handleOnNativeWordChange} />
            <Input placeholder="Foreign word" value={foreignWord} onChange={handleOnForeignWordChange} />
            <Button onClick={addCard} icon="plus">Add</Button>
        </div>
        <Divider />
        <div>
            {infoMessage.flashCardInfo && <Alert message={infoMessage.flashCardInfo} type="info" showIcon />}
            {(cards && cards.length > 0) && renderCards()}
        </div>
        <div>
            <Button onClick={addSet} icon="check" size="large">Create set</Button>
        </div>
    </>
}

export default CreateSetPage;