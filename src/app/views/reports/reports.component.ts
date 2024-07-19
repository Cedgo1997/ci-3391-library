import { Component, inject, OnInit, signal } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { DynamicSearchDisplayComponent } from '../../components/dynamic-search-display/dynamic-search-display.component';
import { TabsComponent } from '../../components/tabs/tabs.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DynamicSearchDisplayComponent, TabsComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  reportsService = inject(ReportsService);
  title = 'Mejores compradores';
  tableData = signal([]);
  constructor() {}

  ngOnInit() {
    this.reportsService.reportBesBuyers().subscribe((data) => {
      
      this.tableData.set(data);
    });
    
  }

  handleTabChange(event: any) {
    switch (event) {
      case 0:
        this.title = 'Mejores compradores';
        this.reportsService.reportBesBuyers().subscribe((data) => {
          
          this.tableData.set(data);
        });
        break;
      case 1:
        this.title = 'Bibliotecarios que han organizado más eventos';
        this.reportsService.reportBestLibrarians().subscribe((data) => {
          
          this.tableData.set(data);
        });
        break;
      case 2:
        this.title = 'Mejores donantes';
        this.reportsService.reporBestDonors().subscribe((data) => {
          this.tableData.set(data);
        });
        break;
      case 3:
        this.title = 'Libros más vendidos';
        this.reportsService.reporBestBooks().subscribe((data) => {
          this.tableData.set(data);
        });
        break;
      case 4:
        this.title = 'Libros más prestados';
        this.reportsService.reportMostBorrowedBooks().subscribe((data) => {
          this.tableData.set(data);
        });
        break;
    }
  }
}
