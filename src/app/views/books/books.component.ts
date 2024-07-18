import { Component, inject, OnDestroy, signal } from '@angular/core';
import { DynamicSearchDisplayComponent } from "../../components/dynamic-search-display/dynamic-search-display.component";
import { BookService } from '../../services/book.service';
import { Subscription } from 'rxjs';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [DynamicSearchDisplayComponent, DynamicFormComponent, TabsComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnDestroy {
  subscriptions: Subscription = new Subscription();
  private bookService = inject(BookService);
  booksData = signal([]);
  booksCategories = signal<string[]>([]);
  tabs = signal(0);

  fields = [
    {
      type: 'text',
      label: 'ISBN',
      name: 'in_isbn',
      value: '',
      required: true
    },
    {
      type: 'text',
      label: 'Título ',
      name: 'in_titulo',
      value: '',
      required: true
    },
    {
      type: 'number',
      label: 'Precio',
      name: 'in_precio',
      value: '',
      required: true
    },
    {
      type: 'number',
      label: 'Edición',
      name: 'in_edicion',
      value: '',
      required: true
    },
    {
      type: 'date',
      label: 'Fecha de publicación',
      name: 'in_fecha_publicacion',
      value: '',
      required: true
    },
    {
      type: 'number',
      label: 'Restricción de Edad',
      name: 'in_restriccion_edad',
      value: '',
      required: true,
    },
    {
      type: 'select',
      label: 'Nombre de Sucursal',
      name: 'in_nombre_sucursal',
      value: '',
      required: true,
      options: [
      ]
    },
    {
      type: 'select',
      label: 'Nombre de Editorial',
      name: 'in_nombre_editorial',
      value: '',
      required: true,
      options: []
    }
  ]

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

  addNewBook(bookData: any): void {
    console.log(bookData)
    this.bookService.addBook(bookData).subscribe({
      next: (response) => {
        console.info(response);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
