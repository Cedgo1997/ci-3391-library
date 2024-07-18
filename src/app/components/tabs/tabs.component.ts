import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @Input() tabTitles: string[] = [];
  @Output() tabChanged = new EventEmitter<number>();
  selectedTab: number = 0;

  selectTab(index: number) {
    this.selectedTab = index;
    this.tabChanged.emit(this.selectedTab);
  }
}
