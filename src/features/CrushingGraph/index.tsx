import * as React from 'react';
import {createContext} from "react";
import {CrushValue, PriceValue} from "../../models/graphValues";
import {GetCrushes, PostCrush} from "../../services/api.dofus-tools.service";
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, Legend} from 'recharts';
import {Button, TextField} from "@mui/material";
import moment from "moment";

type Props = {
    ankama_id: number
    server_id: number
}

const graphValuesDefault:CrushValue[] = []

export const EquipmentsDetailsContext = createContext<Props>({} as Props);

const CrushGraph: React.FC<Props> = ({ankama_id, server_id}) => {
    const [graphValues, setGrapValues]: [CrushValue[], (graphValues: CrushValue[]) => void] = React.useState(
        graphValuesDefault
    );

    const [crushValue, setCrushValue] : [number, (crushValue: number) => void] = React.useState(0);


    const callApi = (ankama_id: number, server_id: number) => {
        GetCrushes(ankama_id, server_id).then(response =>{
            setGrapValues(response);
        })
    };

    const CreateCrush = () => {
        const crush: CrushValue = {
            dofusId: ankama_id,
            serverId: server_id,
            value: crushValue,
            createdAt: moment().toDate(),
            createdBy: "test"
        }
        PostCrush(crush).then(response =>{
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

    // @ts-ignore
    return (
        <div >
            <TextField id="crushingText"
                       label="Coefficient de brisage"
                       variant="outlined"
                       onChange={(e) => setCrushValue(+e.target.value)}/>

            <Button variant="outlined" style={{marginLeft: '30px'}} onClick={ (e) => {
                if(!isNaN(Number(crushValue))) {
                    CreateCrush()
                }
            }}> Ajouter </Button>
            <LineChart width={730} height={250} data={graphValues}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" name="Date" tickFormatter={formatDate} interval={4}/>
                <YAxis />
                <Tooltip labelFormatter={formatDateToolTip}/>
                <Legend />
                <Line type="monotone" dataKey="value" name="Coefficient brisage" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default CrushGraph;