import { Component, signal } from '@angular/core';
import { DynamicSearchDisplayComponent } from "../../components/dynamic-search-display/dynamic-search-display.component";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [DynamicSearchDisplayComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  booksData = signal([{name: "pollo"}]);
}
