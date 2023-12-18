export interface Chamado {
    id?: any;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: string;
    status: string;
    titulo: string;
    observacoes: string;
    tecnico: any;
    cliente: any;
    nomeCliente: string;
    nomeTecnico: string;
    productId: number;
    isSolution:boolean;
    solution:boolean;
}
export interface ChamadoTop {
    total: number;
    totalSolved: number;
    totalTechnician: number;
    topTechnician: TopTecnicoDTO[];
}
export interface TopTecnicoDTO {
    nome: string;
    email: string;
    quantidade: number;
}
export interface ChamadoExpiredDTO {
    id?: any;
    dataFechamento?: string;
    prioridade: string;
    status: string;
    titulo: string;
    statusName: string;
    nomeTecnico: string;
    countDays: number;
}
