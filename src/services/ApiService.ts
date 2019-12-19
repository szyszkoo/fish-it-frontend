import ISet from "src/model/ISet";
import IFiszka from "src/model/IFiszka";
import { Language } from "src/enums/Language";

const ApiService = () => {
    const getAllPublicSets = () => {
        // TODO: get sets
    }

    const getAllUserPrivateSets = () => {

    }

    const getFiszkiBySetId = async (setId: number) : Promise<IFiszka[]> => {
        console.log("getting your fiszkis....");
        const fiszki: IFiszka[]= [{
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
          }];

          return Promise.resolve(fiszki);
    }

    const addSet = (setData: ISet) => {

    }

    return { 
        getAllPublicSets, 
        getAllUserPrivateSets, 
        getFiszkiBySetId, 
        addSet };

}

export default ApiService;