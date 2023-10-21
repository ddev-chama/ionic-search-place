// search.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadService } from '../read-service/read.service';
import { Selection } from './selection.interface';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent implements OnInit {
  searchTerm: string = '';
  selectedOption: keyof Selection = 'mood';
  searchData: any[] = [];
  selectionKeys: (keyof Selection)[] = [];
  max:any[] = [];

  constructor(private readService: ReadService, private router: Router) {}

  ngOnInit() {
    // this.max = [];
    this.LazyGenerateData();
    this.fetchData();
    console.log(this.selectedOption);
    // Populate the selectionKeys array with the keys of Selection
    this.selectionKeys = Object.keys({} as Selection) as (keyof Selection)[];
  }

  onSearchInput() {
    // this.max = [];
    this.fetchData();
  }

  async onSegmentChange() {
    this.max = [];
    await this.LazyGenerateData();
    await this.fetchData();
  }
  
  onCardClick(id: number) {
    this.max = [];
    this.router.navigate(['/detail', id]);
  }

  private LazyGenerateData() {
    console.log(this.max);
          let con=this.max.length+1
          for (let i = 0; i < 6; i++) {
            this.max.push(con+i);
          }
          console.log(this.max);  
  }
  
  onIonInfinite(ev:any) {
    setTimeout(() => {
      this.LazyGenerateData();
      this.fetchData();
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 400);
  }

  private fetchData() {
    this.readService.getNewsData().subscribe(
    (data: any[]) => {
        this.searchData = data.filter(
          item => item[this.selectedOption].toLowerCase().includes(this.searchTerm.toLowerCase()
          )
    ).slice(0,this.max.length+1);      
    });
  }
}
