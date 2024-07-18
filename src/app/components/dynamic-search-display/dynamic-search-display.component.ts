import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-search-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-search-display.component.html',
  styleUrl: './dynamic-search-display.component.scss'
})
export class DynamicSearchDisplayComponent {
  @Input() title = '';
  @Input() data: any[] = [];
  @Input() enableSearch = true;
  onSubmit(): void {
  }
}
