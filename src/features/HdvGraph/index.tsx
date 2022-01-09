import * as React from 'react';
import {createContext} from "react";
import {PriceValue} from "../../models/graphValues";
import {GetCrushes, GetPrices, PostCrush, PostPrice} from "../../services/api.dofus-tools.service";
import moment from "moment";
import {Button, TextField} from "@mui/material";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

type Props = {
    ankama_id: number
    server_id: number
}

const graphValuesDefault:PriceValue[] = []


const HdvGraph: React.FC<Props> = ({ankama_id, server_id}) => {
    const [graphValues, setGrapValues]: [PriceValue[], (graphValues: PriceValue[]) => void] = React.useState(
        graphValuesDefault
    );

    const [priceValue, setPriceValue] : [number, (crushValue: number) => void] = React.useState(0);
    const [estimatedCrushValue, setEstimatedCrushValue] : [number, (estimatedPriceValue: number) => void] = React.useState(0);

    const callApi = (ankama_id: number, server_id: number) => {
        GetPrices(ankama_id, server_id).then(response =>{
            setGrapValues(response);
        })
    };

    const CreatePrice = (value: number) => {
        const graphValue: PriceValue = {
            dofusId: ankama_id,
            serverId: server_id,
            value: value,
            estimatedCrushValue: estimatedCrushValue,
            createdAt: moment().toDate(),
            createdBy: "test"
        }
        PostPrice(graphValue).then(response =>{
            callApi(ankama_id, server_id);
        })
    }

    React.useEffect(() => {
        callApi(ankama_id, server_id)
    }, []);

    const formatDate = (dateString : string) => {
        return moment(dateString).format('DD-MM');
    }

    const formatDateToolTip = (dateString : string) => {
        return moment(dateString).format('HH:mm DD.MM.yyyy');
    }

    return (
        <div >
            <TextField id="priceText"
                       label="Prix"
                       variant="outlined"
                       onChange={(e) => setPriceValue(+e.target.value)}/>
            <TextField id="estimatedCrushPrice"
                       label="Valeur estimée au brisage"
                       variant="outlined"
                       onChange={(e) => setEstimatedCrushValue(+e.target.value)}/>
            <Button variant="outlined" style={{marginLeft: '30px'}} onClick={ (e) => {
                if(!isNaN(Number(priceValue)) && !isNaN(Number(estimatedCrushValue))){
                    CreatePrice(priceValue)
                }
            }}> Ajouter </Button>
            <LineChart width={730} height={250} data={graphValues}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" name="Date" tickFormatter={formatDate} interval={4}/>
                <YAxis />
                <Tooltip labelFormatter={formatDateToolTip}/>
                <Legend />
                <Line type="monotone" dataKey="value" name="Prix" stroke="#82ca9d" />
                <Line type="monotone" dataKey="estimatedCrushValue" name="Valeur estimée au brisage" stroke="#ffc658" />
            </LineChart>
        </div>
    );
}

export default HdvGraph;