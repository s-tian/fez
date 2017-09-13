import { Component } from '@angular/core';

export class Movie {
	id: number;
	name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'My first angular app';
  movie: Movie = {
  	id: 1,
  	name: 'Iron Man'
  };
}
