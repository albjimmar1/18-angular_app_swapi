import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-characters-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './characters-table.component.html',
  styleUrl: './characters-table.component.css'
})
export class CharactersTableComponent {
  @Input() characters: Array<any> = [];
  @Output()
  spreadFollowing = new EventEmitter<string>();
  @Output()
  spreadPrevious = new EventEmitter<string>();

  handleFollowing($event: any): void {
    $event.preventDefault();
    this.spreadFollowing.emit();
  }

  handlePrevious($event: any): void {
    $event.preventDefault();
    this.spreadPrevious.emit();
  }
}
