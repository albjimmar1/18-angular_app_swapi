import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CharactersTableComponent } from './components/characters-table/characters-table.component';
import { SwapiService } from './services/swapi.service';
import { PlanetsTableComponent } from './components/planets-table/planets-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, CharactersTableComponent, PlanetsTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'swapi_app';
  public url: string = 'https://swapi.dev/api';
  public resource: string = '/people';
  public characters: Array<any> = [];
  public planets: Array<any> = [];
  searchByNameSaved: string = '';
  sortedBySaved: string = '';
  limit: number = 10;
  offset: number = 0;
  
  constructor(private SwapiService: SwapiService) { }

  ngOnInit(): void {
    this.loadCharacters(`${this.url}/people/?limit=${this.limit}&offset=${this.offset}`);
    this.loadPlanets(`${this.url}/planets/?limit=${this.limit}&offset=${this.offset}`);
  }

  public handleSpreadResource(resource: string): void {
    this.resource = resource;
    this.searchByNameSaved = '';
    this.sortedBySaved = '';
    this.limit = 10;
    this.offset = 0;
  }

  public handleSpreadByName(searchByName: string): void {
    let urlByName = `${this.url}${this.resource}`;
    if (searchByName) {
      this.searchByNameSaved = `&byName=${searchByName}`;
      urlByName += `/?byName=${searchByName}`;
    } else {
      this.searchByNameSaved = '';
    }
    this.limit = 10;
    this.offset = 0;
    this.loadCharacters(urlByName);
  }

  public handleSpreadOrder(order: string): void {
    let urlSorted = `${this.url}${this.resource}`;
    if (order === 'nameMayorMinor') {
      this.sortedBySaved = '&sortByName=DESC';
      urlSorted += '/?sortByName=DESC';
    }
    else if (order === 'nameMinorMayor') {
      this.sortedBySaved = '&sortByName=ASC';
      urlSorted += '/?sortByName=ASC';
    }
    else if (order === 'createdMayorMinor') {
      this.sortedBySaved = '&sortByCreated=DESC';
      urlSorted += '/?sortByCreated=DESC';
    }
    else if (order === 'createdMinorMayor') {
      this.sortedBySaved = '&sortByCreated=ASC';
      urlSorted += '/?sortByCreated=ASC';
    }
    if (this.searchByNameSaved) {
      urlSorted += this.searchByNameSaved;
    }
    this.limit = 10;
    this.offset = 0;
    this.loadCharacters(urlSorted);
  }

  public handleSpreadFollowing(): void {
    if (this.characters.length === this.limit) {
      this.offset = this.offset + this.limit;
    }
    let followingUrl = `${this.url}${this.resource}/?limit=${this.limit}&offset=${this.offset}` ;
    if (this.searchByNameSaved) {
      followingUrl+= this.searchByNameSaved
    }
    if (this.sortedBySaved) {
      followingUrl+= this.sortedBySaved;
    }
    this.loadCharacters(followingUrl);
  }

  public handleSpreadPrevious(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.limit;
    }
    let previousUrl = `${this.url}${this.resource}/?limit=${this.limit}&offset=${this.offset}` ;
    if (this.searchByNameSaved) {
      previousUrl+= this.searchByNameSaved
    }
    if (this.sortedBySaved) {
      previousUrl+= this.sortedBySaved;
    }
    this.loadCharacters(previousUrl);
  }

  public loadCharacters(url: string): void {
    this.SwapiService.getSwapi(url)
    .subscribe((response: any) => {
      this.characters = response.results ? response.results : [];
    });
  }

  public loadPlanets(url: string): void {
    this.SwapiService.getSwapi(url)
    .subscribe((response: any) => {
      this.planets = response.results ? response.results : [];
    });
  }
}
