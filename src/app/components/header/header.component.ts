import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchByName: string = '';
  order: string = '';
  resource: string = '/people';
  public orders: Array<string> = ['nameMayorMinor', 'nameMinorMayor', 'createdMayorMinor', 'createdMinorMayor'];

  @Output()
  spreadByName = new EventEmitter<string>();

  @Output()
  spreadOrder = new EventEmitter<string>();

  @Output()
  spreadResource = new EventEmitter<string>();

  handleSubmit($event: any): void {
    $event.preventDefault();
    this.spreadByName.emit(this.searchByName);
  }

  onChange($event: any): void {
    $event.preventDefault();
    this.order = $event.target.value;
    if (this.orders.includes(this.order)) {
      this.spreadOrder.emit(this.order);
    }
  }

  onChangeResource($event: any): void {
    $event.preventDefault();
    this.searchByName = '';
    this.order = '';
    this.resource = $event.target.value;
    this.spreadResource.emit(this.resource);
  }

}
