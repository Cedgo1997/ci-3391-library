import { Component, inject, OnDestroy, signal } from '@angular/core';
import { DynamicSearchDisplayComponent } from "../../components/dynamic-search-display/dynamic-search-display.component";
import { BookService } from '../../services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [DynamicSearchDisplayComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnDestroy {
  subscriptions: Subscription = new Subscription();
  private bookService = inject(BookService);
  booksData = signal([]);
  booksCategories = signal<string[]>([]);

  constructor() {
    this.getBooksCategories();
  }

  getBooksCategories(): void {
    this.subscriptions.add(this.bookService.getBookCategories().subscribe(
      categories => {
        this.booksCategories.set(["", ...categories]);
      }
    ))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
