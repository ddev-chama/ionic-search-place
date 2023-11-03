// search.component.ts
import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ReadService } from '../read-service/read.service';
import { Selection } from './selection.interface';
import { InfiniteScrollCustomEvent,IonButton  } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent implements OnInit {
  
  searchTerm: string = '';
  selectedOption: keyof Selection = 'mood';
  ChoiceOption: any;
  searchData: any[] = [];
  selectionKeys: (keyof Selection)[] = [];
  max:any[] = [];
  rowCount: any;
  fetchRow: any;
  @ViewChild('element1') element1: any;
  @ViewChild('element2') element2: any;
  @ViewChild('element3') element3: any;

  constructor(private readService: ReadService, private router: Router) {}

  customActionSheetOptions = {
    header: 'คำสั่งลัด',
    subHeader: 'โปรดเลือกคำที่ใช้ค้นหา',
  };
  
  ngOnInit() {
    // this.max = [];
    this.LazyGenerateData();
    this.fetchData();
    // console.log(this.selectedOption);
    // Populate the selectionKeys array with the keys of Selection
    this.selectionKeys = Object.keys({} as Selection) as (keyof Selection)[];

    this.ChoiceOption = "ความรู้สึก";
  }

  async onSearchInput() {
    // this.max = [];
    await this.LazyGenerateData();
    this.fetchData();

  }
  
  async shortSearch() {
    // this.max = [];
    await this.LazyGenerateData();
    await this.fetchData();
  }

  async onSegmentChange() {
    this.max = [];
    await this.LazyGenerateData();
    await this.fetchData();

    if (this.selectedOption == 'mood') {
      this.element1.open();
      this.ChoiceOption = "ความรู้สึก";
    }
    else if (this.selectedOption =='address') {
      this.element2.open();
      this.ChoiceOption = "สถานที่";
    }
    else if (this.selectedOption == 'tyoe') {
      this.element3.open();
      this.ChoiceOption = "กิจกรรม";
    }
  }

  onCardClick(id: number) {
    this.max = [];
    this.router.navigate(['/detail', id]);
  }

  private LazyGenerateData() {
    let con=this.max.length+1
    for (let i = 0; i < 6; i++) {
      this.max.push(con+i);
    }
  }
  
  onIonInfinite(ev:any) {
    setTimeout(() => {
      this.LazyGenerateData();
      this.fetchData();
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 400);
  }

  private async fetchData() {
    this.rowCount = this.readService.getNewsData();
    this.readService.getNewsData().subscribe(
    (data: any[]) => {
        
        this.fetchRow = data.filter(
          item => item[this.selectedOption].includes(this.searchTerm.toLowerCase())
        );

         this.rowCount =   this.fetchRow;
         this.searchData =   this.fetchRow.slice(0,this.max.length+1);    
         console.log(this.rowCount);
    });
  }
}
