import { Language } from "src/enums/Language";

export default interface IFiszka {
    src_text: string;
    src_lang: string;
    target_text: string;
    target_lang: string;
}