import { Component } from '@angular/core';
import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  fields = [
    {
      type: 'text',
      label: 'Cédula',
      name: 'cedula',
      value: '',
      required: true
    },
    {
      type: 'text',
      label: 'Nombre ',
      name: 'nombre',
      value: '',
      required: true
    },
    {
      type: 'text',
      label: 'Apellido',
      name: 'apellido',
      value: '',
      required: true
    },
    {
      type: 'email',
      label: 'Correo',
      name: 'correo',
      value: '',
      required: true,
    },
    {
      type: 'select',
      label: '¿Qué quieres hacer aquí 🐶?',
      name: 'rol',
      value: '',
      required: true,
      options: ['Lector', 'Empleado', 'Bibliotecario', 'Autor']
    }
  ]
}
