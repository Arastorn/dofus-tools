import * as React from 'react';
import {GetById} from "../../services/api.equipments.service";
import {createContext} from "react";
import HdvGraph from "../HdvGraph";
import CrushingGraph from "../CrushingGraph";
import {Grid} from "@mui/material";

export interface IEquipmentDetail {
    ankama_id : number,
    name : string,
    image_url_local: string,
    level: number,
    type: string
}

type EquipmentDetailProps = {
    ankama_id: number
}

const defaultPosts:IEquipmentDetail = {} as IEquipmentDetail;

export const EquipmentsDetailsContext = createContext<EquipmentDetailProps>({} as EquipmentDetailProps);

const EquipmentsDetails: React.FC<EquipmentDetailProps> = ({ankama_id}) => {
    const [posts, setPosts]: [IEquipmentDetail, (posts: IEquipmentDetail) => void] = React.useState(
        defaultPosts
    );

    const callApi = (ankama_id: number) => {
        GetById(ankama_id).then(response =>{
            setPosts(response);
        })
    };

    if(posts.ankama_id != ankama_id)
    {
        callApi(ankama_id);
    }

    return (
        <div key={posts.name}>
            <img src={posts.image_url_local} width={90}/> {posts.name} {posts.type} {posts.level}
            <br />
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <HdvGraph ankama_id={ankama_id} server_id={1} />
                </Grid>
                <Grid item xs={6}>
                    <CrushingGraph ankama_id={ankama_id} server_id={1}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default EquipmentsDetails;