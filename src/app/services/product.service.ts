import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chamado} from "../models/chamado";
import {API_CONFIG} from "../config/api.config";
import {
    Category,
    Comment,
    CommentRequestDTO,
    Product,
    Recommendation,
    RecommendationRequest, SearchSolutionRequestDTO,
    Solution
} from "../models/Product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    findAll(): Observable<Product[]> {
        return this.http.get<Product[]>(`${API_CONFIG.baseUrl}/product`);
    }

    findAllSolutions(): Observable<Solution[]> {
        return this.http.get<Solution[]>(`${API_CONFIG.baseUrl}/solution`);
    }
    findSolutionsByProductId(productID:number): Observable<Solution[]> {
        return this.http.get<Solution[]>(`${API_CONFIG.baseUrl}/solution/product?productID=${productID}`);
    }
    findTicketsByProductId(productID:number): Observable<Chamado[]> {
        return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/solution/ticket?productID=${productID}`);
    }
    findSolutionsByTickets(ticketID:number): Observable<Solution[]> {
        return this.http.get<Solution[]>(`${API_CONFIG.baseUrl}/solution/tickets?ticketID=${ticketID}`);
    }
    searchSolutionsByTitle(searchSolutionRequestDTO: SearchSolutionRequestDTO): Observable<Solution[]> {
       return this.http.post<Solution[]>(`${API_CONFIG.baseUrl}/solution/search`, searchSolutionRequestDTO);
    }
    searchChamaodosByTitle(searchSolutionRequestDTO: SearchSolutionRequestDTO): Observable<Chamado[]> {
        return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/solution/search?query=${searchSolutionRequestDTO.title}&id=${searchSolutionRequestDTO.productId}`);
    }
    create(productRequestDTO: any, file:File): Observable<Product[]> {
        let body = new FormData();
        const blob = new Blob([JSON.stringify(productRequestDTO)], { type: 'application/json' });
        body.append("productRequestDTO", blob);
        body.append("file",file);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post<Product[]>(`${API_CONFIG.baseUrl}/product/create`, body, { headers: headers });
    }

    recommendSolution(recommendationRequest: RecommendationRequest): Observable<Solution> {
        return this.http.post<Solution>(`${API_CONFIG.baseUrl}/recommendations`, recommendationRequest);
    }
    getRecommendationsBySolutionId(solutionId: number): Observable<Recommendation[]> {
        return this.http.get<Recommendation[]>(`${API_CONFIG.baseUrl}/recommendations?solutionId=${solutionId}`);
    }
    saveComment(commentRequestDTO: CommentRequestDTO): Observable<Solution> {
        return this.http.post<Solution>(`${API_CONFIG.baseUrl}/recommendations/comment`, commentRequestDTO);
    }
    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${API_CONFIG.baseUrl}/product/categories`);
    }
    saveCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(`${API_CONFIG.baseUrl}/product/category/create`, category);
    }
    deleteCategory(id: number): Observable<Category[]> {
        return this.http.get<Category[]>(`${API_CONFIG.baseUrl}/product/delete/category?id=${id}`);
    }
}