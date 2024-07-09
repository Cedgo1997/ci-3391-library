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
  @Input() fields: Field[] = [
  ];

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario enviado:', form.value);
      form.reset();
    }
  }

  onCancel() {
    console.log('Cancelaste');
  }

  trackByIndex(index: number, item: any) {
    return index;
  }
}
