import * as React from "react";
import IFiszka from "src/model/IFiszka";
import ISet from "src/model/ISet";
import Card from "src/components/card/Card";
import { Input, Button } from "antd";
import Title from "antd/lib/typography/Title";
import "./TrainingModule.scss";
import { notificationService } from "src/services/notification.service";

export interface ITrainingModuleProps {
    set: ISet;
}
const TrainingModule = (props: ITrainingModuleProps) => {
    const [allFiszki, setAllFiszki] = React.useState<IFiszka[]>(props.set.fiszki.slice(1));
    const [currentFiszka, setCurrentFiszka] = React.useState<IFiszka | undefined>(props.set.fiszki[0]);
    const [fiszkitoRepeat, setFiszkiToRepeat] = React.useState<IFiszka[]>([]);
    const [userAnswer, setUserAnswer] = React.useState<string>("");
    const [isTrainingOver, setIsTrainingOver] = React.useState<boolean>(false);

    const checkUserAnswer = () => {
        if (!currentFiszka) {
            notificationService.error("Some error occured - apparently there is no active fiszka :/");
            
            return;
        }
        if (userAnswer === currentFiszka.target_text) {
            notificationService.success("Correct answer!");
        }
        else {
            setFiszkiToRepeat(prevFiszki => [...prevFiszki, currentFiszka]);
            notificationService.warning("Wrong answer! Correct answer: " + currentFiszka.target_text);
        }

        if (allFiszki.length > 0) {
            const currentFiszka = allFiszki[0];
            setAllFiszki(prev => prev.slice(1));
            setCurrentFiszka(currentFiszka);

            return;
        }

        if (fiszkitoRepeat.length > 0) {
            const currentFiszka = fiszkitoRepeat[0];
            setFiszkiToRepeat(prev => prev.slice(1));
            setCurrentFiszka(currentFiszka);

            return;
        }

        setIsTrainingOver(true);
    }

    return <>
        {(currentFiszka && !isTrainingOver) && <div className="centeredContent">
            <div className="currentFiszka"><p>{currentFiszka.src_text}</p> </div>
            <div><Input placeholder="Your answer" value={userAnswer} onChange={(event) => setUserAnswer(event.target.value as string)} /></div>
            <div><Button onClick={checkUserAnswer} icon="plus">Check</Button></div>
        </div>}
        {isTrainingOver && <Title> Training finished, contgrats!!!</Title>}
    </>
}

export default TrainingModule;