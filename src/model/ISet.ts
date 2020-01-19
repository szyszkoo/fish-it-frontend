import IFiszka from "./IFiszka";

export default interface ISet {
    id?: number;
    name: string;
    fiszki: IFiszka[];
    isPublic: boolean;
}
