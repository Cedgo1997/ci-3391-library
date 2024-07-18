import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { Field } from '../../interfaces/field.interface';

@Component({
  selector: 'app-sales-donations',
  standalone: true,
  imports: [DynamicFormComponent, TabsComponent],
  templateUrl: './sales-donations.component.html',
  styleUrl: './sales-donations.component.scss',
})
export class SalesDonationsComponent {
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
      label: 'Número Factura',
      name: 'in_nro_facturacion',
      type: 'number',
      value: '',
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
  }

  handleFormSubmit(formData: any) {
    if (this.isSale) {
      console.log('Registering loan:', formData);
    } else {
      console.log('Registering return:', formData);
    }
  }
}
