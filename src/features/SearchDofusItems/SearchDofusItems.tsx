import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import {searchEquipmentsByName} from "../../services/api.equipments.service";
import EquipmentsDetails from "../equipmentsDetails/EquipmentsDetails";
import {Container, Grid} from "@mui/material";

export interface IEquipments {
    items: IEquipment[]
}

export interface IEquipment{
    ankama_id: number;
    item_url: string;
    name: string;
}

const defaultPosts:IEquipment[] = [];

function SearchDofusItems() {
    const[equipments, setEquipments]: [IEquipment[], (posts: IEquipment[]) => void] = React.useState(
        defaultPosts
    );

    const [equipmentId, setEquipmentId]: [number, (equipmentId: number) => void] = React.useState<number>(
        0
    );

    const [loading, setLoading]: [
        boolean,
        (loading: boolean) => void
    ] = React.useState<boolean>(true);

    const [error, setError]: [string, (error: string) => void] = React.useState(
        ''
    );

    const callApi = (search: string) => {
        searchEquipmentsByName(search).then(response =>{
            setEquipments(response.items);
            setLoading(false);
        }).catch(ex => {
            const error =
                ex.code === "ECONNABORTED"
                    ? "A timeout has occurred"
                    : ex.response.status === 404
                        ? "Resource Not found"
                        : "An unexpected error has occurred";
            setError(error);
            setLoading(false);
        });
    };

    React.useEffect(() => {
        callApi("")
    }, []);



    return (
        <div>
                <Autocomplete
                    id="country-select-demo"
                    sx={{ width: 300 }}
                    options={equipments}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                        if(value !=  null)
                        {
                            setEquipmentId(value.ankama_id)
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onChange={(e) => callApi(e.target.value)}
                            label="Selectionner un équipement"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            <br/>
            {equipmentId != 0 && <EquipmentsDetails ankama_id={equipmentId} />}
        </div>
    );
}

export default SearchDofusItems;