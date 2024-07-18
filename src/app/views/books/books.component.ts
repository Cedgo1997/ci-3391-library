import { Component, inject, OnDestroy, signal } from '@angular/core';
import { DynamicSearchDisplayComponent } from "../../components/dynamic-search-display/dynamic-search-display.component";
import { BookService } from '../../services/book.service';
import { Subscription } from 'rxjs';
import { TabsComponent } from '../../components/tabs/tabs.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [DynamicSearchDisplayComponent, TabsComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnDestroy {
  subscriptions: Subscription = new Subscription();
  private bookService = inject(BookService);
  booksData = signal([]);
  booksCategories = signal<string[]>([]);
  tabs = signal(0);

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

  handleTabChange(index: number): void {
    this.tabs.set(index);
    if (this.tabs() === 0) {
      this.booksData.set([]);
    } else {
      this.bookService.getBestSellerBooks().subscribe((books) => {
        this.booksData.set(books);
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
