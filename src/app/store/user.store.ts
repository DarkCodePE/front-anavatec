import {Injectable} from "@angular/core";
import {Profile, ProfileState, TecnicoState} from "../models/tecnico";
import {BehaviorSubject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class UserStore {
    private state = new BehaviorSubject<TecnicoState>({
        id: 0,
        nome: '',
        cpf: '',
        email: '',
        senha: '',
        perfis: [],
        dataCriacao: '',
        profile: {
            id: 0,
            email: '',
            phone: '',
            address: '',
            resume: '',
            birthDate: '',
            tecnicoId: 0,
            avatar: ''
        }
    });
    state$ = this.state.asObservable();
    constructor(private _sanitizer: DomSanitizer) {}
    saveState(state: TecnicoState, imageUrl: string) {
        if (imageUrl == null || imageUrl == undefined || imageUrl == ''){
            state.profile.avatar = '';
        }else {8
            state.profile.avatar = this.decodeImage(imageUrl);
        }
        this.state.next(state);
    }
    saveEmail(email: string) {
        this.state.next({
            ...this.stateValue,
            profile: {
                ...this.stateValue.profile,
                email: email
            }
        });
    }
    saveAvatar(avatar: string) {
        this.state.next({
            ...this.stateValue,
            profile: {
                ...this.stateValue.profile,
                avatar: avatar
            }
        });
    }
    saveProfile(profile: Profile) {
        this.state.next({
            ...this.stateValue,
            profile: profile
        });
    }
    get stateValue(): TecnicoState{
        return this.state.getValue();
    }

    decodeImage(base64Image: string){
        if (!base64Image.toLowerCase().includes('data:image')){
            return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64Image);
        }
        return base64Image;
    }
}