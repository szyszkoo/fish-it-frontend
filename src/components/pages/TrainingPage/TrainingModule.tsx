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

    const handleSubmit = (event: React.KeyboardEvent<any>) => {
        if (event.key === "Enter") {
            checkUserAnswer();
        }
    }

    // const getNextFiszka = () => {

    // }

    // const handleCorrectAnswer = () => {
    //     if (!currentFiszka) {
    //         notificationService.error("Some error occured - apparently there is no active fiszka");
            
    //         return;
    //     }

        
    //     getNextFiszka();
    // }  



    // const handleWrongAnswer = () => {
    //     if (!currentFiszka) {
    //         notificationService.error("Some error occured - apparently there is no active fiszka");
            
    //         return;
    //     }
        
    //     getNextFiszka();
    // }




    const checkUserAnswer = () => {
        if (!currentFiszka) {
            notificationService.error("Some error occured - apparently there is no active fiszka");
            
            return;
        }

        const isCorrectAnswer = userAnswer === currentFiszka.target_text;
        let nextFiszka: IFiszka = currentFiszka;
        
        if (isCorrectAnswer) {
            notificationService.success("Correct answer!");
        }
        else {
            if (allFiszki.length > 0 || fiszkitoRepeat.length > 0) {
                setFiszkiToRepeat(prevFiszki => [...prevFiszki, currentFiszka]);
            }
            notificationService.warning("Wrong answer! Correct answer: " + currentFiszka.target_text);
        }

        setUserAnswer("");

        if (allFiszki.length > 0) {
            nextFiszka = allFiszki[0];
            setAllFiszki(prev => prev.slice(1));
            setCurrentFiszka(nextFiszka);

            return;
        }

        if (fiszkitoRepeat.length > 0) {
            nextFiszka = fiszkitoRepeat[0];
            setFiszkiToRepeat(prev => prev.slice(1));
            setCurrentFiszka(nextFiszka);

            return;
        }

        if (!isCorrectAnswer) {
            setCurrentFiszka(nextFiszka);

            return;
        }

        setIsTrainingOver(true);
    }

    return <>
        {(currentFiszka && !isTrainingOver) && <div className="centeredContent">
            <div className="currentFiszka"><p>{currentFiszka.src_text}</p> </div>
            <div><Input placeholder="Your answer" value={userAnswer} onChange={(event) => setUserAnswer(event.target.value as string)} onKeyUp={handleSubmit}/></div>
            <div><Button onClick={checkUserAnswer} icon="plus" >Check</Button></div>
        </div>}
        {isTrainingOver && <Title> Training finished, congrats!</Title>}
    </>
}

export default TrainingModule;