import {SafeResourceUrl} from "@angular/platform-browser";

export interface Tecnico {
    id?: any;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    perfis: string[];
    dataCriacao: any;
    profile: Profile;
}
export interface ProfileRequestDTO {
    id: number;
    phone: string;
    address: string;
    resume: string;
    birthDate: string;
    tecnicoId: number;
}
export interface Profile {
    id: number;
    email: string;
    phone: string;
    address: string;
    resume: string;
    birthDate: string;
    tecnicoId: number;
    avatar: string;
}
export interface TecnicoState {
    id?: any;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    perfis: string[];
    dataCriacao: any;
    profile: ProfileState;
}
export interface ProfileState {
    id: number;
    email: string;
    phone: string;
    address: string;
    resume: string;
    birthDate: string;
    tecnicoId: number;
    avatar: SafeResourceUrl;
}