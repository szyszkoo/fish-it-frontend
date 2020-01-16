import ISet from "src/model/ISet";
import IFiszka from "src/model/IFiszka";
import { Language } from "src/enums/Language";
import { axiosInstance } from "src/interceptors/interceptor";

const ApiService = () => {
  const mapToFiszka = (data: { source_text: any; source_language: string; target_text: any; target_language: string; }): IFiszka => {
    console.log(data);

    return {
      src_text: data.source_text,
      src_lang: data.source_language,
      target_text: data.target_text,
      target_lang: data.target_language
    } as IFiszka
  }
  const getAllPublicSets = async (): Promise<ISet[]> => {
    const rawData = await axiosInstance.get(`/category/public`);
    return rawData.data.map((element: { id: any; name: any; }) => {
      return {
        id: element.id,
        name: element.name,
        fiszki: []
      } as ISet;
    })
  }

  const getAllUserPrivateSets = () => {

  }

  const getFiszkiBySetId = async (setId: number): Promise<IFiszka[]> => {
    const rawData = await axiosInstance.get(`/category/public/${setId}/fiszki`);
    console.log(rawData);
    
    return rawData.data.map(mapToFiszka);
  }

  const addSet = async (setData: ISet) => {
    try {
      const axiosInst = axiosInstance;
      axiosInst.defaults.headers.common["Authorization"] =  "Basic " + btoa("eweltol:ewelina"); // TODO: do not hardcode it that way :/
      axiosInst.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
      axiosInst.post(`/category/`, setData);
      
    }
    catch (error) {
      console.log("Could not add set");
    }
  }

  return {
    getAllPublicSets,
    getAllUserPrivateSets,
    getFiszkiBySetId,
    addSet
  };

}

export default ApiService;