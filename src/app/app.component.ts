import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CharactersTableComponent } from './components/characters-table/characters-table.component';
import { SwapiService } from './services/swapi.service';
import { PlanetsTableComponent } from './components/planets-table/planets-table.component';
import { CommonModule } from '@angular/common';
import { constants } from '../environments/environments';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, CharactersTableComponent, PlanetsTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'swapi_app';
  public url: string = constants.swapi_uri_spring_web;
  public resource: string = '/people';
  public characters: Array<any> = [];
  public planets: Array<any> = [];
  private byNameSaved: string = '';
  private orderBySaved: string = '';
  searchByNameSaved: string = '';
  sortedBySaved: string = '';
  limit: number = 15;
  offset: number = 0;
  
  constructor(private SwapiService: SwapiService) { }

  ngOnInit(): void {
    this.loadData(this.url, this.resource, this.offset, this.limit, this.byNameSaved, this.orderBySaved);
  }

  public handleSpreadResource(resource: string): void {
    this.resource = resource;
    this.byNameSaved = '';
    this.orderBySaved = '';
    this.limit = 15;
    this.offset = 0;
    this.loadData(this.url, this.resource, this.offset, this.limit, this.byNameSaved, this.orderBySaved);
  }

  public handleSpreadByName(searchByName: string): void {
    if (searchByName) {
      this.byNameSaved = searchByName;
    } else {
      this.byNameSaved = '';
    }
    this.offset = 0;
    this.limit = 15;
    this.loadData(this.url, this.resource, this.offset, this.limit, this.byNameSaved, this.orderBySaved);
  }

  public handleSpreadOrder(order: string): void {
    this.offset = 0;
    this.limit = 15;
    this.orderBySaved = order;
    this.loadData(this.url, this.resource, this.offset, this.limit, this.byNameSaved, this.orderBySaved);
  }

  public handleSpreadFollowing(): void {
    switch (this.resource) {
      case '/people':
        if (this.characters.length === this.limit) {
          this.offset = this.offset + this.limit;
          this.loadData(this.url, this.resource, this.offset, this.limit, this.byNameSaved, this.orderBySaved);
        }
        break;
      case '/planets':
        if (this.planets.length === this.limit) {
          this.offset = this.offset + this.limit;
          this.loadData(this.url, this.resource, this.offset, this.limit, this.byNameSaved, this.orderBySaved);
        }
        break;
      default: break;
    }
  }

  public handleSpreadPrevious(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.limit;
      this.loadData(this.url, this.resource, this.offset, this.limit, this.byNameSaved, this.orderBySaved);
    }
  }

  public loadData(url: string, resource: string, offset: number, limit: number, byName: string, order: string): void {
    this.SwapiService.getSwapi2(url, resource, offset, limit, byName, order)
    .subscribe((response: any) => {
      if (resource === '/people') {
        this.characters = response.data ? response.data : [];
        this.characters.forEach((e) => e.created = new Date(Date.parse(e.created)).toUTCString());
      } else if (resource === '/planets') {
        this.planets = response.data ? response.data : [];
        this.planets.forEach((e) => e.created = new Date(Date.parse(e.created)).toUTCString());
      }
    });
  }
}
