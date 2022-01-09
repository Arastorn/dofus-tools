import {getAxiosDofusToolsApi} from "./api.base";
import {CrushValue, PriceValue} from "../models/graphValues";


export const GetPrices = async (ankama_id: number, server_id: number) => {
    const response = await getAxiosDofusToolsApi().get<PriceValue[]>("Price?dofusId=" + ankama_id + "&serverId=" + server_id);
    return response.data;
};

export const GetCrushes = async (ankama_id: number, server_id: number) => {
    const response = await getAxiosDofusToolsApi().get<CrushValue[]>("Crush?dofusId=" + ankama_id + "&serverId=" + server_id);
    return response.data;
};

export const PostCrush = async (value: CrushValue) => {
    const response = await getAxiosDofusToolsApi().post("Crush", value);
    return response.data;
};

export const PostPrice = async (value: PriceValue) => {
    const response = await getAxiosDofusToolsApi().post("Price", value);
    return response.data;
};
