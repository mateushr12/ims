export interface Portfolio {
    estrategia: string;
    tipo: string;
    conta: string;
    dt_inicio: Date;
    vl_inicio: number;
    qtd_inicio: number;
    dt_fim?: Date;
    vl_fim?: number;
    qtd_fim?: number;
}
