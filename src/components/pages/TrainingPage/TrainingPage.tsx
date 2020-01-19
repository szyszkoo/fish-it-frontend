import * as React from "react";
import ISet from "src/model/ISet";
import Card from "src/components/card/Card";
import ApiService from "src/services/ApiService";
import TrainingModule from "./TrainingModule";
import Title from "antd/lib/typography/Title";
import { notificationService } from "src/services/notification.service";

export interface ITrainingPageProps {
  isLoggedUser: boolean;
}

const Training = (props: ITrainingPageProps) => {
  const [sets, setSets] = React.useState<Array<ISet>>([]);
  const [activeSet, setActiveSet] = React.useState<ISet>();
  const apiService = ApiService();

  const onSetSelected = async (setId: number | undefined, setName: string, isPublicSet: boolean | undefined) => {
    if (!setId || isPublicSet == undefined) {
      notificationService.error("Some error occured, cannot start the training. Please try again later.");

      return;
    }

    const fiszkis = await apiService.getFiszkiBySetId(setId, isPublicSet);

    console.log(fiszkis);

    const selectedSet: ISet = {
      id: setId,
      name: setName,
      fiszki: fiszkis,
      isPublic: isPublicSet
    }
    setActiveSet(selectedSet);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      console.log(props.isLoggedUser);
      props.isLoggedUser 
      ? Promise.all([
        apiService.getAllPublicSets(),
        apiService.getAllUserPrivateSets()
      ]).then(([publicSets, privateSets]) => {
        setSets(publicSets.concat(privateSets));
      })
      : setSets(await apiService.getAllPublicSets())
      // : console.log("Test");
      // const sets = await apiService.getAllPublicSets();
      // props.isLoggedUser && sets.concat(await apiService.getAllUserPrivateSets());
      // setSets(sets);
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
          {sets.map(set => <Card shortDescription={set.name} key={set.id} onClick={() => onSetSelected(set.id, set.name, set.isPublic)} />)}
        </>
      }
    </>
  )

}

export default Training;