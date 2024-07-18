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

  getBooks(event: { text: string, option: string }): void {
    if (event) {
      this.bookService.getBooksByCategory(event.text, event.option).subscribe(
        {
          next: (books) => {
            this.booksData.set(books);
          },
          error: (error) => {
            this.booksData.set([]);
            console.error(error);
          }
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
