import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {Recommendation, RecommendationRequest, Solution, SolutionState} from "../../../models/Product";
import {SolutionStore} from "../../../store/solution.store";
import {Observable} from "rxjs";
import {Chamado} from "../../../models/chamado";
import {SolutionFormStore} from "../../../store/solutionForm.store";
import {FormBuilder, Validators} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-solution-detail',
  templateUrl: './solution-detail.component.html',
  styleUrls: ['./solution-detail.component.css']
})
export class SolutionDetailComponent implements OnInit {
  ELEMENT_DATA_SOLUTIONS: Solution[] = [];
  @Input() solution: Solution | null = null;
  $solution: Observable<SolutionState> = this.solutionFormStore.state$;
  RECOMMENDATION_DATA: Recommendation[] = [];
  recommendationFormGroup!: any;
  jwt = new JwtHelperService();
  showComments: boolean = false;
  commentFormGroup!: any;
  constructor(private service: ProductService,
              private _sanitizer: DomSanitizer,
              public dialog: MatDialog,
              private solutionFormStore: SolutionFormStore,
              private solutionStore: SolutionStore,
              private route: ActivatedRoute,
              public formBuilder: FormBuilder,
              private router: Router ) {

  }

  ngOnInit(): void {
    //validate exist solution
   //const ticketID = this.route.snapshot.paramMap.get('id');
    console.log("solution ->", this.solution);
    this.solutionFormStore.saveState(this.solution, this.solution?.imageUrl);
    this.createForm();
  }
  createForm(){
    this.recommendationFormGroup = this.formBuilder.group({
      description: ['', [Validators.required]],
      tecnicoEmail: [''],
      solutionId: [''],
    });
    this.commentFormGroup = this.formBuilder.group({
        description: ['', [Validators.required]],
        tecnicoEmail: [''],
        recommendationId: [''],
    });
  }
  decodeImage(base64Image: string){
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + base64Image);
  }
  getRecommendationsBySolutionId(solutionId: number){
    this.service.getRecommendationsBySolutionId(solutionId).subscribe(resposta => {
      this.RECOMMENDATION_DATA = resposta;
    });
  }
  recommendSolution(){
    const token = localStorage.getItem('token');
    const decode = this.jwt.decodeToken(token);
    this.recommendationFormGroup.get('tecnicoEmail').setValue(decode?.sub);
    console.log("solution", this.solution?.id)
    this.recommendationFormGroup.get('solutionId').setValue(this.solution?.id);
    console.log("recommendSolution", this.recommendationFormGroup.value);
    this.service.recommendSolution(this.recommendationFormGroup.value).subscribe(resposta => {
      this.solutionFormStore.saveState(resposta, resposta.imageUrl);
    });
  }

  openComments(status: boolean, $event: MouseEvent) {
    this.showComments = !status;
    return this.showComments;
  }

  submitComment(id: number){
    const token = localStorage.getItem('token');
    const decode = this.jwt.decodeToken(token);
    this.commentFormGroup.get('tecnicoEmail').setValue(decode?.sub);
    this.commentFormGroup.get('recommendationId').setValue(id);
    this.service.saveComment(this.commentFormGroup.value).subscribe(resposta => {
      this.solutionFormStore.saveState(resposta, resposta.imageUrl);
    });
  }
}
