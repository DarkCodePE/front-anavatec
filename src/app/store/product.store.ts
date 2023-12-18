import {BehaviorSubject} from "rxjs";
import {Product} from "../models/Product";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductStore {

    private state = new BehaviorSubject<Product[]>([{
        id: 0,
        sku: '',
        title: '',
        category: {
            id: 0,
            name: ''
        },
        summary: '',
        price: 0,
        status: false,
    }]);
    state$ = this.state.asObservable();
    constructor() {}
    saveState(state: Product[]) {
        this.state.next(state);
    }
    get stateValue(): Product[] {
        return this.state.getValue();
    }
}