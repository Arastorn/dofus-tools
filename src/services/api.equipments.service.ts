import {getAxiosDofusApi} from "./api.base";

import {IEquipments} from "../features/SearchDofusItems/SearchDofusItems";
import {IEquipmentDetail} from "../features/equipmentsDetails/EquipmentsDetails";


export const searchEquipmentsByName = async (name: string) => {
    const response = await getAxiosDofusApi().get<IEquipments>( "dofus/fr/equipment?page%5Bnumber%5D=1&page%5Bsize%5D=96&search%5Bname%5D=" + name);
    return response.data;
};

export const GetById = async (ankama_id: number) => {
    const response = await getAxiosDofusApi().get<IEquipmentDetail>( "dofus/fr/equipment/" + ankama_id);
    return response.data;
};