import axios from "axios";

export const getAxiosDofusApi = () =>
    axios.create({ baseURL: 'https://enc.dofusdu.de' });

export const getAxiosDofusToolsApi = () =>
    axios.create({ baseURL: 'https://dofus.tools.api.arastorn.ovh' });
