import { Component, Input } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  @Input() title: string = '';
  fields: Field[] = [
    {
      type: 'text',
      label: 'Nombre',
      name: 'nombre',
      value: '',
      required: true
    },
    {
      type: 'email',
      label: 'Correo electrónico',
      name: 'email',
      value: '',
      required: true
    },
    {
      type: 'select',
      label: 'Género',
      name: 'genero',
      value: '',
      required: true,
      options: ['Masculino', 'Femenino', 'Helicóptero Apache']
    },
    {
      type: 'checkbox',
      label: 'Acepto términos y condiciones',
      name: 'terminos',
      value: false,
      required: true
    }
  ];

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario enviado:', form.value);
    }
  }

  onCancel() {
    console.log('Cancelaste');
  }

  trackByIndex(index: number, item: any) {
    return index;
  }
}
