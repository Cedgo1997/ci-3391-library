import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() sendFormData: EventEmitter<NgForm> = new EventEmitter<NgForm>();
  @Input() title: string = '';
  @Input() fields: Field[] = [
  ];

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario enviado:', form.value);
      this.sendFormData.emit(form);
      form.reset();
    }
  }

  onCancel() {
    console.log('Cancelaste');
  }

  trackByIndex(item: any) {
    return item
  }
}
