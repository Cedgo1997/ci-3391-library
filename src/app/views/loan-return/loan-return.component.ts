import { Component, inject } from '@angular/core';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { TabsComponent } from "../../components/tabs/tabs.component";
import { Field } from '../../interfaces/field.interface';
import { TransactionsService } from '../../services/transactions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loan-return',
  standalone: true,
  imports: [DynamicFormComponent, TabsComponent],
  templateUrl: './loan-return.component.html',
  styleUrl: './loan-return.component.scss',
})
export class LoanReturnComponent {
  transactionService = inject(TransactionsService);
  isLoan: boolean = true; // Variable para alternar entre préstamo y devolución

  // Obtener la fecha actual
  currentDate: string = new Date().toISOString().split('T')[0];

  // Obtener la fecha actual + 30 días
  futureDate: string = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  loanFields: Field[] = [
    {
      label: 'Serial Ejemplar',
      name: 'in_serial_ejemplar',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Cédula Bibliotecario',
      name: 'in_cedula_bibliotecario',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: 'Cédula Lector',
      name: 'in_cedula_lector',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Fecha Inicio',
      name: 'in_fecha_inicio',
      type: 'date',
      value: this.currentDate,
      required: true,
    },
    {
      label: 'Fecha Final',
      name: 'in_fecha_final',
      type: 'date',
      value: this.futureDate,
      required: true,
    },
  ];

  returnFields: Field[] = [
    {
      label: 'Serial Ejemplar',
      name: 'in_serial_ejemplar',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Cédula Bibliotecario',
      name: 'in_cedula_bibliotecario',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: 'Cédula Lector',
      name: 'in_cedula_lector',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Fecha Entrega',
      name: 'in_fecha_entrega',
      type: 'date',
      value: this.currentDate,
      required: true,
    },
  ];

  fields: Field[] = this.loanFields;

  handleTabChange(index: number) {
    this.isLoan = index === 0;
    this.fields = this.isLoan ? this.loanFields : this.returnFields;
  }

  handleFormSubmit(formData: any) {
    if (this.isLoan) {
      this.transactionService.generateBookLoan(formData).subscribe(
        {
          next: (response) => {
            Swal.fire({
              title: '¡Préstamo exitoso!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error inesperado, inténtelo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        }
      )
    } else {
      this.transactionService.generateBookReturn(formData).subscribe(
        {
          next: (response) => {
            Swal.fire({
              title: '¡Devolución exitosa!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error inesperado, inténtelo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        }
      )
    }
  }
}
