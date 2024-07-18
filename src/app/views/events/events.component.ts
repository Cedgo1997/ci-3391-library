import { Component, inject, OnInit, signal } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DynamicFormComponent, TabsComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  eventsService = inject(EventsService);
  isAssist: boolean = true; // Variable para alternar entre préstamo y devolución
  listEvents = signal([]); // Variable para almacenar la lista de eventos
  // Obtener la fecha actual
  currentDate: string = new Date().toISOString().split('T')[0];

  // Obtener la fecha actual + 30 días
  futureDate: string = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  eventsFields: Field[] = [
    {
      label: 'Evento',
      name: 'in_pk_evento',
      type: 'select',
      value: '',
      required: true,
    },
    {
      label: 'Correo asistente',
      name: 'in_correo',
      value: '',
      type: 'email',
      required: true,
    },
  ];

  registerFields: Field[] = [
    {
      label: 'Fecha de inicio',
      name: 'fecha_inicio',
      type: 'date',
      value: this.currentDate,
      required: true,
    },
    {
      label: 'Fecha final',
      name: 'cedula_bibliotecario',
      value: this.futureDate,
      type: 'date',
      required: true,
    },
    {
      label: 'Sucursal',
      name: 'nombre_sucursal',
      value: '',
      type: 'select',
      required: true,
    },
  ];

  fields: Field[] = this.eventsFields;


  ngOnInit(): void {
    this.getAllEvents();
  }

  handleTabChange(index: number) {
    this.isAssist = index === 0;
    this.fields = this.isAssist ? this.eventsFields : this.registerFields;
  }

  handleFormSubmit(formData: any) {
    if (this.isAssist) {
      console.log('Registering Assistant:', formData);
      // Lógica para registrar asistencia al evento
    } else {
      console.log('Create event:', formData);
      // Lógica para crear un evento
    }
  }

  getAllEvents(filters: any = {}) {
    this.eventsService.getAllEvents(filters).subscribe((events: any) => {
      this.listEvents.set(events);
    });
  }
}
