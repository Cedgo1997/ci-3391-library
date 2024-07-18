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
  text = '';
  debounceTimer!: ReturnType<typeof setTimeout>;

  triggerSearch(event: Event): void {
    this.text = (event.target as HTMLTextAreaElement).value;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.onSearchEvent.emit({
        text: this.text.trim(),
        option: this.selectedOption
      })
    }, 500);
  }

  triggerSelection(event: Event): void {
    console.log(event)
    this.selectedOption = (event.target as HTMLSelectElement).value;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.onSearchEvent.emit({
        text: this.text.trim(),
        option: this.selectedOption
      })
    }, 500);

  }

}
