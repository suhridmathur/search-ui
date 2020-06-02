import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public questionId: string;
  public questionDetails: any;
  public answers: any;
  public token: string;

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) {
    this.questionId = this.route.snapshot.params.id;
    this.getDetails(this.questionId);
    this.getAnswers(this.questionId)
  }

  ngOnInit() {
    if(!window.localStorage.getItem('token')){
      this.router.navigate(['/login']);
    }
  }

  getDetails(questionId){
    this.searchService.getQuestionDetails(questionId).subscribe(
      data =>{
        this.questionDetails = data['items'][0];
      },
      err =>{
      }
    )
  }

  getAnswers(questionId){
    this.searchService.getAnswers(questionId).subscribe(
      data =>{
        this.answers = data['items'];
      },
      err =>{
      }
    )
  }

}
