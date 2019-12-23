import * as React from "react";
import ISet from "src/model/ISet";
import { Language } from "src/enums/Language";
import Card from "src/components/card/Card";
import ApiService from "src/services/ApiService";
import TrainingModule from "./TrainingModule";
import Title from "antd/lib/typography/Title";

export interface ITrainingProps {
  description: string;
  shortDescription: string;
  onClick: any;
}

export interface ITrainingState {
  description: string;
  isHovering: boolean;
}

const fiszkiMock: ISet[] = [
  {
    name: "Testowy set 1",
    id: 1,
    fiszki: [
      {
        src_text: "Source text 1",
        src_lang: Language.es,
        target_text: "Target text 1",
        target_lang: Language.en
      },
      {
        src_text: "Source text 2",
        src_lang: Language.es,
        target_text: "Target text 2",
        target_lang: Language.en
      },
      {
        src_text: "Source text 3",
        src_lang: Language.es,
        target_text: "Target text 3",
        target_lang: Language.en
      },
      {
        src_text: "Source text 4",
        src_lang: Language.es,
        target_text: "Target text 4",
        target_lang: Language.en
      }
    ]
  },
  {
    name: "Testowy set 2",
    id: 2,
    fiszki: [
      {
        src_text: "Source text 1",
        src_lang: Language.es,
        target_text: "Target text 1",
        target_lang: Language.en
      },
      {
        src_text: "Source text 2",
        src_lang: Language.es,
        target_text: "Target text 2",
        target_lang: Language.en
      },
      {
        src_text: "Source text 3",
        src_lang: Language.es,
        target_text: "Target text 3",
        target_lang: Language.en
      },
      {
        src_text: "Source text 4",
        src_lang: Language.es,
        target_text: "Target text 4",
        target_lang: Language.en
      }
    ]
  }
]

const Training = () => {
  const [sets, setSets] = React.useState<Array<ISet>>(fiszkiMock);
  const [activeSet, setActiveSet] = React.useState<ISet>();
  const apiService = ApiService();

  const onSetSelected = async (setId: number, setName: string) => {
    const fiszkis = await apiService.getFiszkiBySetId(setId);
    const selectedSet: ISet = {
      id: setId,
      name: setName,
      fiszki: fiszkis
    }
    setActiveSet(selectedSet);
  }

  return (
    <>
      {activeSet
        ? <>
          <Title> Translate the word below </Title>
        <TrainingModule set={activeSet} />
        </>
        : <>
          <Title> Choose set you want to skill up </Title>
          {sets.map(set => <Card shortDescription={set.name} key={set.id} onClick={() => onSetSelected(set.id, set.name)} />)}
        </>
      }
    </>
  )

}

export default Training;