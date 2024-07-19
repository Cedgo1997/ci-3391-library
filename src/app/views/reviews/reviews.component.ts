import { Component, inject, signal } from '@angular/core';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { Field } from '../../interfaces/field.interface';
import { BookService } from '../../services/book.service';
import Swal from 'sweetalert2';
import { DynamicSearchDisplayComponent } from '../../components/dynamic-search-display/dynamic-search-display.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [TabsComponent, DynamicFormComponent, DynamicSearchDisplayComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  currentTab = 0;
  approveFields: Field[] = [
    {
      name: 'in_cedula_bibliotecario',
      label: 'Cédula del Bibliotecario',
      type: 'text',
      value: '',
      required: true,
    },
    {
      name: 'in_cedula_lector',
      label: 'Cédula del Lector',
      type: 'text',
      value: '',
      required: true,
    },
    {
      name: 'in_isbn',
      label: 'ISBN',
      type: 'text',
      value: '',
      required: true,
    }
  ];

  createFields: Field[] = [
    {
      name: 'in_cedula_lector',
      label: 'Cédula del Lector',
      type: 'text',
      value: '',
      required: true,
    },
    {
      name: 'in_estrellas',
      label: 'Puntuación',
      type: 'number',
      max: 5,
      min: 1,
      value: '',
      required: true,
    },
    {
      name: 'in_comentario',
      label: 'Comentario',
      type: 'text',
      value: '',
      required: false,
    },
    {
      name: 'in_isbn',
      label: 'ISBN',
      type: 'text',
      value: '',
      required: true,
    },
  ];
  bookService = inject(BookService);

  reviews = signal([]);

  handleChangeTabs(tabIndex: number): void {
    this.currentTab = tabIndex;
    if (tabIndex === 2) {
      this.getUnapprovedReviews();
    } else if (tabIndex === 3) {
      this.getApproverReviews();
    }
  }

  submitReview(data: any): void {
    this.bookService.sendReview(data).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Reseña exitosa!',
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

  approveReview(data: any): void {
    this.bookService.approveReview(data).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Reseña aprobada!',
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

  getUnapprovedReviews(): void {
    this.bookService.getUnapprovedReviews().subscribe((response) => {
      this.reviews.set(response);
    })
  }

  getApproverReviews(): void {
    this.bookService.getApprovedReviews().subscribe((response) => {
      this.reviews.set(response);
    })
  }

}
