import { Component } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { TabsComponent } from "../../components/tabs/tabs.component";

@Component({
  selector: 'app-loan-return',
  standalone: true,
  imports: [DynamicFormComponent, TabsComponent],
  templateUrl: './loan-return.component.html',
  styleUrl: './loan-return.component.scss',
})
export class LoanReturnComponent {
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
      name: 'serial_ejemplar',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Cédula Bibliotecario',
      name: 'cedula_bibliotecario',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: 'Cédula Lector',
      name: 'cedula_lector',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Fecha Inicio',
      name: 'fecha_inicio',
      type: 'date',
      value: this.currentDate,
      required: true,
    },
    {
      label: 'Fecha Final',
      name: 'fecha_final',
      type: 'date',
      value: this.futureDate,
      required: true,
    },
  ];

  returnFields: Field[] = [
    {
      label: 'Serial Ejemplar',
      name: 'serial_ejemplar',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Cédula Bibliotecario',
      name: 'cedula_bibliotecario',
      value: '',
      type: 'text',
      required: true,
    },
    {
      label: 'Cédula Lector',
      name: 'cedula_lector',
      type: 'text',
      value: '',
      required: true,
    },
    {
      label: 'Fecha Entrega',
      name: 'fecha_entrega',
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
      console.log('Registering loan:', formData);
      // Lógica para registrar un préstamo
    } else {
      console.log('Registering return:', formData);
      // Lógica para registrar una devolución
    }
  }
}
