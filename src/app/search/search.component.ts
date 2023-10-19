import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadService } from '../read-service/read.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
//SearchComponent
export class SearchComponent implements OnInit{
  searchTerm: string = '';
  searchData: any[] = [];

  constructor(private readService: ReadService, private router: Router) {} 
  
  ngOnInit() { 
    // Fetch data when the view is entered 
    this.fetchData();
  }

  onSearchInput() {
    this.fetchData();
  }
  //Serch by condition here
  private fetchData() {
    this.readService.getNewsData().subscribe(
      (data: any[]) => {
        this.searchData = data.filter(
          item =>
            item.mood.toLowerCase().match(this.searchTerm.toLowerCase())
        );
      }
    );
  }

  onCardClick(id: number) {
    // Navigate to the detail page with the corresponding ID
    this.router.navigate(['/detail', id]);
  }
}

