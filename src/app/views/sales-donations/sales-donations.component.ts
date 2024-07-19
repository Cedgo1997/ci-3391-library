import { Component, inject } from '@angular/core';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { Field } from '../../interfaces/field.interface';
import { TransactionsService } from '../../services/transactions.service';
import Swal from 'sweetalert2';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-sales-donations',
  standalone: true,
  imports: [DynamicFormComponent, TabsComponent],
  templateUrl: './sales-donations.component.html',
  styleUrl: './sales-donations.component.scss',
})
export class SalesDonationsComponent {
  transactionsService = inject(TransactionsService);
  bookService = inject(BookService);
  isSale: boolean = true;
  currentDate: string = new Date().toISOString().split('T')[0];
  futureDate: string = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  donationFields: Field[] = [
    {
      label: 'Serial Ejemplar',
      name: 'serial_ejemplar',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Id Donante',
      name: 'in_id_donante',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: 'Fecha de Donación',
      name: 'in_fecha_donacion',
      type: 'date',
      value: this.currentDate,
      required: true,
    },
    {
      label: 'Nombre Sucursal',
      name: 'in_nombre_sucursal',
      type: 'select',
      value: '',
      options: [],
      required: true,
    },
  ];

  saleFields: Field[] = [
    {
      label: 'Serial Ejemplar',
      name: 'in_serial_ejemplar',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Cédula Comprador',
      name: 'in_cedula_comprador',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: 'Fecha Venta',
      name: 'in_fecha_venta',
      type: 'date',
      value: this.currentDate,
      required: true,
    },
    {
      label: 'Método de Pago',
      name: 'in_payment_method',
      type: 'select',
      value: '',
      options: [
        {
          label: 'Efectivo',
          value: 'Efectivo',
        },
        {
          label: 'Crédito',
          value: 'Crédito',
        },
        {
          label: 'Débito',
          value: 'Débito',
        },
        {
          label: 'Transferencia',
          value: 'Transferencia',
        },
      ],
      required: true,
    },
  ];

  fields: Field[] = this.saleFields;

  handleTabChange(index: number) {
    this.isSale = index === 0;
    this.fields = this.isSale ? this.saleFields : this.donationFields;
    if (this.fields === this.donationFields) {
      this.bookService.getBranch().subscribe(branches => {
        const index = this.fields.findIndex((field: any) => field.name === 'in_nombre_sucursal');
        if (index) {
          this.fields[index].options = branches.map((branch: any) => ({ value: branch.nombre, label: branch.nombre }));
        }
      });
    }
  }

  handleFormSubmit(formData: any) {
    if (this.isSale) {
      const serials = formData.in_serial_ejemplar.split(';');
      this.transactionsService.generateBookSale({ ...formData, in_serial_ejemplar: serials }).subscribe(
        {
          next: (response) => {
            Swal.fire({
              title: '¡Venta exitosa!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            console.info(response);
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error inesperado, inténtalo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
            console.error(error);
          }
        }
      )
    } else {
      this.transactionsService.generateBookDonation(formData).subscribe(
        {
          next: (response) => {
            Swal.fire({
              title: '¡Donación exitosa!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            console.info(response);
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error inesperado, inténtalo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
            console.error(error);
          }
        }
      )
    }
  }
}
