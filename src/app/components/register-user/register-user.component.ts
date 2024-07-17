import { Component } from '@angular/core';
import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  constructor(private userService: UserService) { }
  fields = [
    {
      type: 'text',
      label: 'Cédula',
      name: 'in_cedula',
      value: '',
      required: true
    },
    {
      type: 'text',
      label: 'Nombre ',
      name: 'in_nombre',
      value: '',
      required: true
    },
    {
      type: 'text',
      label: 'Apellido',
      name: 'in_apellido',
      value: '',
      required: true
    },
    {
      type: 'date',
      label: 'Fecha de nacimiento',
      name: 'in_fecha_nacimiento',
      value: '',
      required: true
    },
    {
      type: 'email',
      label: 'Correo',
      name: 'in_correo',
      value: '',
      required: true,
    },
    {
      type: 'select',
      label: '¿Qué quieres hacer aquí 🐶?',
      name: 'in_tipo_usuario',
      value: '',
      required: true,
      options: ['Lector', 'Empleado', 'Bibliotecario', 'Autor']
    }
  ]

  createUser(data: NgForm): void {
    if (data) {
      this.userService.createUser(data).subscribe((response) => {
        console.info(response);
      },
        (error) => {
          console.error(error);
        })
    }
  }
}
