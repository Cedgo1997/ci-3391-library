import { Component, inject, OnInit, signal } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  reportsService = inject(ReportsService);
  bestBooks = signal([]);
  bestDonors = signal([]);
  bestBuyers = signal([]);
  bestLibrarians = signal([]);
  borrowedBooks = signal([]);
  constructor() {}

  ngOnInit() {
    this.reportsService.reporBestBooks().subscribe((data) => {
      console.log(data);
      this.bestBooks.set(data);
    });
    this.reportsService.reporBestDonors().subscribe((data) => {
      console.log(data);
      this.bestDonors.set(data);
    });
    this.reportsService.reportBesBuyers().subscribe((data) => {
      console.log(data);
      this.bestBuyers.set(data);
    });
    this.reportsService.reportBestLibrarians().subscribe((data) => {
      console.log(data);
      this.bestLibrarians.set(data);
    });
    this.reportsService.reportMostBorrowedBooks().subscribe((data) => {
      console.log(data);
      this.borrowedBooks.set(data);
    });
  }
}
