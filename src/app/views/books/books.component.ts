import { Component, inject, OnDestroy, signal, OnInit } from '@angular/core';
import { DynamicSearchDisplayComponent } from "../../components/dynamic-search-display/dynamic-search-display.component";
import { BookService } from '../../services/book.service';
import { Subscription } from 'rxjs';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { UserService } from '../../services/user.service';
import { Field } from '../../interfaces/field.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [DynamicSearchDisplayComponent, DynamicFormComponent, TabsComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit, OnDestroy {
  private bookService = inject(BookService);
  private userService = inject(UserService);
  subscriptions: Subscription = new Subscription();
  booksData = signal([]);
  booksCategories = signal<string[]>([]);
  tabs = signal(0);

  fields: Field[] = [
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
      type: 'select',
      label: 'Autor ',
      name: 'in_autor',
      value: '',
      required: true,
      options: []
    },
    {
      type: 'select',
      label: 'Categoría ',
      name: 'in_categoria',
      value: '',
      required: true,
      options: []
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
      options: []
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

  ngOnInit(): void {
    this.getBooks({ text: '', option: '' });
  }

  getBooksCategories(): void {
    const index = this.fields.findIndex((field) => field.name === 'in_categoria');
    this.subscriptions.add(this.bookService.getBookCategories().subscribe(
      categories => {
        this.booksCategories.set(["", ...categories]);
        this.fields[index].options = categories.map(category => ({ label: category, value: category }))
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
      this.getBooks({ text: '', option: '' });
    } else if (this.tabs() === 1) {
      this.bookService.getBestSellerBooks().subscribe((books) => {
        this.booksData.set(books);
      })
    } else if (this.tabs() === 2) {
      this.bookService.getBranch().subscribe(branches => {
        const index = this.fields.findIndex((field: Field) => field.name === 'in_nombre_sucursal');
        if (index >= 0) {
          this.fields[index].options = branches.map((branch: any) => ({ value: branch.nombre, label: branch.nombre }));
        }
      });

      this.bookService.getPublisher().subscribe(publishers => {
        const index = this.fields.findIndex((field: Field) => field.name === 'in_nombre_editorial');
        if (index >= 0) {
          this.fields[index].options = publishers.map((publisher: any) => ({ value: publisher.nombre, label: publisher.nombre }));
        }
      })

      this.userService.getUsersByType('Autor').subscribe(
        (authors) => {
          const index = this.fields.findIndex((field: Field) => field.name === 'in_autor');
          if (index >= 0) {
            this.fields[index].options = authors.map((author: any) => ({
              value: author.cedula,
              label: `${author.nombre} ${author.apellido}`
            }))
          }
        }
      )
    } else {
      this.bookService.getBookCopies().subscribe((copies) => {
        this.booksData.set(copies);
      })
    }
  }

  addNewBook(bookData: any): void {
    this.bookService.addBook(bookData).subscribe(
      {
        next: (response) => {
          Swal.fire({
            title: '¡Libro creado exitosamente!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          console.info(response);
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un problema inesperado, inténtelo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.error(error);
        }
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
