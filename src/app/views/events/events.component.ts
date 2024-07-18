import { Component, inject, OnInit, signal } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { EventsService } from '../../services/events.service';
import { DynamicSearchDisplayComponent } from "../../components/dynamic-search-display/dynamic-search-display.component";
import { FilterEvents } from '../../interfaces/events.interface';
import { SelectFilter } from '../../interfaces/filters.interface';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DynamicFormComponent, TabsComponent, DynamicSearchDisplayComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})

export class EventsComponent implements OnInit {
  eventsService = inject(EventsService);
  // isAssist: boolean = true; // Variable para alternar entre préstamo y devolución
  tabIndex: number = 0; // Variable para almacenar el índice de la pestaña activa
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
      options: [],
      required: true,
    },
  ];

  fields: Field[] = this.eventsFields;


  ngOnInit(): void {
    this.getAllEvents();
    this.getAllSucursales();
  }

  handleTabChange(index: number) {
    this.tabIndex = index;
    this.fields = this.tabIndex === 0 ? this.eventsFields : this.registerFields;
  }

  handleFormSubmit(formData: any) {
    if (this.tabIndex === 0) {
      console.log('Registering Assistant:', formData);
      // Lógica para registrar asistencia al evento
    } else {
      console.log('Create event:', formData);
      // Lógica para crear un evento
    }
  }

  handleSearchEvent(filters: SelectFilter) {
    if (filters.text) {
      this.getAllEvents({ nombre_sucursal: filters.text });
    } else {
      this.getAllEvents();
    }
  }

  getAllEvents(filters?: FilterEvents) {
    this.eventsService.getAllEvents(filters).subscribe((events: any) => {
      this.listEvents.set(events);
    });
  }

  getAllSucursales() {
    this.eventsService.getAllSucursales().subscribe((sucursales: any) => {
      const sucursalesOptions = sucursales.map((sucursal: any) => ({
        label: sucursal.nombre,
        value: sucursal.nombre,
      }));
      this.registerFields[2].options = sucursalesOptions;
    });
  }
}
