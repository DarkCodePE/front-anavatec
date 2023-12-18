import {SafeResourceUrl} from "@angular/platform-browser";

export interface Product {
    id?: any;
    sku: string;
    title: string;
    category: ProductCategory;
    summary: string;
    price: number;
    status: boolean;
}
interface ProductCategory{
    id?: any;
    name: string;
}

export interface Solution {
    id?: any;
    productId: number;
    title: string;
    summary: string;
    imageUrl: string;
    status: boolean;
    technicalName: string;
    priority: string;
    nameStatus: string;
    recommendations: Recommendation[];
}
export interface Category {
    id?: any;
    name: string;
}
export interface SolutionState {
    id?: any;
    productId: number;
    title: string;
    summary: string;
    imageUrl: SafeResourceUrl;
    status: boolean;
    technicalName: string;
    priority: string;
    nameStatus: string;
    recommendations: Recommendation[];
}
export interface Recommendation {
    id: number;
    description: string;
    solutionId: number;
    created_at: Date;
    tecnicoName: string;
    solutionTitle: string;
    comments: Comment[];
}
export interface Comment {
    id: number;
    description: string;
    recommendationId: number;
    createdAt: Date;
    tecnicoName: string;
}
export interface CommentRequestDTO {
    description: string;
    recommendationId: number;
    tecnicoEmail: string;
}
export interface SearchSolutionRequestDTO {
    title: string;
    productId: number;
}
export interface RecommendationRequest {
    description: string;
    solutionId: number;
    tecnicoId: number;
}
export interface RecommendationResponse {
    description: string;
    solution: Solution;
}