import { Component, inject } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { getCircularReplacer } from '../../helpers/circular-replacer';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [DynamicFormComponent, SweetAlert2Module],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  userService = inject(UserService);
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

  createUser(data: any): void {
    if (data) {
      this.userService.createUser(JSON.stringify({ ...data }, getCircularReplacer())).subscribe(
        {
          next: (response: { message: string }) => {
            console.info(response);
            Swal.fire({
              title: '¡Creación exitosa!',
              text: 'Ocurrió un error inesperado, inténtalo de nuevo más tarde.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            })
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error inesperado, inténtalo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
            console.error(error);
          }
        }
      )
    }
  }
}
