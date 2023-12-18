import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Chamado} from "../models/chamado";

@Injectable({
    providedIn: 'root'
})
export class ChamadoStore{
    private state = new BehaviorSubject<Chamado[]>([{
        id: 0,
        dataAbertura: '',
        dataFechamento: '',
        prioridade: '',
        status: '',
        titulo: '',
        observacoes: '',
        tecnico: null,
        cliente: null,
        nomeCliente: '',
        nomeTecnico: '',
        productId: 0,
        isSolution:false,
        solution:false
    }]);
    state$ = this.state.asObservable();
    constructor() {}
    saveState(state: Chamado[]) {
        this.state.next(state);
    }
    deleteState(id: number) {
        const chamados = this.stateValue.filter((chamado) => chamado.id !== id);
        this.state.next(chamados);
    }
    get stateValue(): Chamado[] {
        return this.state.getValue();
    }
}