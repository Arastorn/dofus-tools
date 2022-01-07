import {getAxiosDofusToolsApi} from "./api.base";
import {GraphValue} from "../models/graphValues";


export const GetPrices = async (ankama_id: number, server_id: number) => {
    const response = await getAxiosDofusToolsApi().get<GraphValue[]>("Price?dofusId=" + ankama_id + "&serverId=" + server_id);
    return response.data;
};

export const GetCrushes = async (ankama_id: number, server_id: number) => {
    const response = await getAxiosDofusToolsApi().get<GraphValue[]>("Crush?dofusId=" + ankama_id + "&serverId=" + server_id);
    return response.data;
};

export const PostCrush = async (value: GraphValue) => {
    const response = await getAxiosDofusToolsApi().post("Crush", value);
    return response.data;
};

export const PostPrice = async (value: GraphValue) => {
    const response = await getAxiosDofusToolsApi().post("Price", value);
    return response.data;
};
