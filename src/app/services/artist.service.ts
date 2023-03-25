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
		map((rawSong : Object[]) => {
		  return rawSong.map(rawSong => <Artist> rawSong);
		})
	);
  }

  
}
