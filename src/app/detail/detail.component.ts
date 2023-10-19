import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReadService } from '../read-service/read.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})

export class DetailComponent implements OnInit {
  itemId!: number;
  item: any;

  constructor(private route: ActivatedRoute, private readService: ReadService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = +params['id'];
      this.fetchItemDetails();
    });
  }

  private fetchItemDetails() {
    this.readService.getNewsData().subscribe(
      (data: any[]) => {
        this.item = data.find(item => item.id == this.itemId);
        console.log(this.item.link)
      },
      (error) => {
        console.error('Error fetching news data:', error);
        // Handle error display or other actions based on your needs
      }
    );
  }

  // Use this method to sanitize HTML content
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
