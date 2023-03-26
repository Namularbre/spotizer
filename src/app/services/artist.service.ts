import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private artists : Artist[] = [];

  constructor(private httpClient : HttpClient) { }

  getArtists() : Observable<Artist[]> {
	const getArtistsUrl = "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists";

	return this.httpClient.get<Artist[]>(getArtistsUrl).pipe(
		map((rawArtists : Object[]) => {
		  return rawArtists.map(rawArtist => <Artist> rawArtist);
		})
	);
  }

  getArtistById(id : number) : Observable<Artist> {
	const getArtistUrl = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists/${id}`;

	return this.httpClient.get<Artist>(getArtistUrl).pipe(
		map((rawArtist : Object) => {
			return <Artist> rawArtist
		})
	);
  }
}
