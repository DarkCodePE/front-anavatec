import {BehaviorSubject} from "rxjs";
import {Product, Recommendation, Solution} from "../models/Product";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SolutionStore {

    private state = new BehaviorSubject<Solution[]>([{
        id: 0,
        productId: 0,
        title: '',
        summary: '',
        imageUrl: '',
        status: false,
        technicalName: '',
        priority: '',
        nameStatus: '',
        recommendations: []
        }]);
    state$ = this.state.asObservable();
    constructor() {}
    saveState(state: Solution[]) {
        this.state.next(state);
    }
    get stateValue(): Solution[] {
        return this.state.getValue();
    }
}