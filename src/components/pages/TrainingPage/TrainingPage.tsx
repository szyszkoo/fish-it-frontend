import * as React from "react";
import ISet from "src/model/ISet";
import Card from "src/components/card/Card";
import ApiService from "src/services/ApiService";
import TrainingModule from "./TrainingModule";
import Title from "antd/lib/typography/Title";
import { notificationService } from "src/services/notification.service";

const Training = () => {
  const [sets, setSets] = React.useState<Array<ISet>>([]);
  const [activeSet, setActiveSet] = React.useState<ISet>();
  const apiService = ApiService();



  const onSetSelected = async (setId: number | undefined, setName: string) => {
    if (!setId) {
      notificationService.error("Some error occured, cannot start the training. Please try again later.");

      return;
    }

    const fiszkis = await apiService.getFiszkiBySetId(setId);

    console.log(fiszkis);

    const selectedSet: ISet = {
      id: setId,
      name: setName,
      fiszki: fiszkis
    }
    setActiveSet(selectedSet);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      setSets(await apiService.getAllPublicSets());
    };
    fetchData();
  }, []);

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