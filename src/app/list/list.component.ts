import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { SearchService } from '../search.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public data: any;
  public query: any;
  
  constructor(private searchService: SearchService, private router: Router) {
    this.search()
  }

  ngOnInit() {
    if(!window.localStorage.getItem('token')){
      this.router.navigate(['/login']);
    }
    this.query = {
      'q': '',
      'page': '',
      'pagesize': '',
      'closed': '',
      'sort':'activity',
      'order': 'desc',
    };
  }

  search(){
    this.searchService.search(this.query).subscribe(
      data=>{
        this.data = data['items'];
      },
      err=>{
        alert(err.error.detail)
      }
    )
  }

}
