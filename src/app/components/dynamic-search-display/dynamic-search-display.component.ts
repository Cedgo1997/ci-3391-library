import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-search-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-search-display.component.html',
  styleUrl: './dynamic-search-display.component.scss'
})
export class DynamicSearchDisplayComponent {
  @Output() onSearchEvent: EventEmitter<{ text: string, option: string }> = new EventEmitter();
  @Input() title = '';
  @Input() data: any[] = [];
  @Input() categories: any[] = [];
  @Input() enableSearch = true;
  @Input() enableCategorySearch = true;

  selectedOption: string = ''
  debounceTimer!: ReturnType<typeof setTimeout>;

  triggerSearch(event: Event): void {
    const element = event.target as HTMLTextAreaElement;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.onSearchEvent.emit({
        text: element.value.trim(),
        option: this.selectedOption
      })
    }, 1500);
  }

}
