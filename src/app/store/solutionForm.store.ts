import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Recommendation, Solution, SolutionState} from "../models/Product";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class SolutionFormStore {
    private state = new BehaviorSubject<SolutionState>({
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
    });
    state$ = this.state.asObservable();
    constructor(
        private _sanitizer: DomSanitizer) {}
    saveState(state: SolutionState, imageUrl: string) {
        state.imageUrl = this.decodeImage(imageUrl);
        this.state.next(state);
    }
    saveImageURL(imageURL: string) {
        this.state.next({
            ...this.stateValue,
            imageUrl: imageURL
        });
    }
    saveStateRecommendation(state: Recommendation[]) {
        this.state.next({
            ...this.stateValue,
            recommendations: state
        });
    }
    get stateValue(): SolutionState{
        return this.state.getValue();
    }
    decodeImage(base64Image: string){
        return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + base64Image);
    }
}
