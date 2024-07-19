import { Component, inject, signal } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { DynamicSearchDisplayComponent } from '../../components/dynamic-search-display/dynamic-search-display.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    DynamicFormComponent,
    TabsComponent,
    DynamicSearchDisplayComponent,
    SweetAlert2Module,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  userService = inject(UserService);
  tabs = signal(0);
  usersData = signal([]);
  fields = [
    {
      type: 'text',
      label: 'Cédula',
      name: 'in_cedula',
      value: '',
      required: true,
    },
    {
      type: 'text',
      label: 'Nombre ',
      name: 'in_nombre',
      value: '',
      required: true,
    },
    {
      type: 'text',
      label: 'Apellido',
      name: 'in_apellido',
      value: '',
      required: true,
    },
    {
      type: 'date',
      label: 'Fecha de nacimiento',
      name: 'in_fecha_nacimiento',
      value: '',
      required: true,
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
      options: [
        { value: 'Lector', label: 'Lector' },
        { value: 'Empleado', label: 'Empleado' },
        { value: 'Bibliotecario', label: 'Bibliotecario' },
        { value: 'Autor', label: 'Autor' },
      ],
    },
  ];

  createUser(data: any): void {
    if (data) {
      this.userService.createUser(data).subscribe({
        next: (response: { message: string }) => {
          console.info(response);
          Swal.fire({
            title: '¡Creación exitosa!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error inesperado, inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    }
  }

  handleTabChange(index: number): void {
    this.tabs.set(index);
    if (this.tabs() === 1) {
      this.getAllUsers();
    }
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.usersData.set(users);
    });
  }
  handleSearchUser(data: { text: string; option?: string }): void { }
}
