import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Category, Product} from "../models/Product";
import {ProductService} from "../services/product.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryStore {
    private state = new BehaviorSubject<Category[]>([
        {
            id: 0,
            name: ''
        }
    ]);
    state$ = this.state.asObservable();
    constructor(private service: ProductService) {}
    saveState(state: Category[]) {
        this.state.next(state);
    }
    filterStateByNames(name: string) {
        if (name === '') return this.getAllCategories();
        const categories = this.state.getValue()
            .filter(category => category.name.toLowerCase()
                .includes(name.toLowerCase()));
        return this.state.next(categories);
    }
    getAllCategories() {
        this.service.getAllCategories().subscribe(resp => {
            this.saveState(resp);
        })
    }
    get stateValue(): Category[] {
        return this.state.getValue();
    }
}