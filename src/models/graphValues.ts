export interface PriceValue {
    dofusId: number;
    serverId: number;
    value: number;
    estimatedCrushValue: number;
    createdAt: Date;
    createdBy: string;
}

export interface CrushValue {
    dofusId: number;
    serverId: number;
    value: number;
    createdAt: Date;
    createdBy: string;
}