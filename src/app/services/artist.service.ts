import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Album } from '../models/album';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private httpClient : HttpClient) { }

  getArtists(page : number = 1, search : string = "") : Observable<Artist[]> {
	const getArtistsUrl = "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists?page="+page+"&name="+search;

	return this.httpClient.get<Artist[]>(getArtistsUrl).pipe(
		map((rawArtists : Object[]) => {
		  return rawArtists.map(rawArtist => <Artist> rawArtist);
		})
	);
  }

  getSearchedArtists(search : string = "") : Observable<Artist[]> {
	const getArtistsUrl = "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists?name="+search;

	return this.httpClient.get<Artist[]>(getArtistsUrl).pipe(
		map((rawArtists : Object[]) => {
		  return rawArtists.map(rawArtist => <Artist> rawArtist);
		})
	);
  }

  getArtist(url : string) : Observable<Artist> {
	return this.httpClient.get<Artist>(url).pipe(
		map(rawArtist => {return <Artist> rawArtist})
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

  getAlbums(url : string) : Observable<Album[]> {
	console.log(url);

	let album : Album[] = [];
	
	return this.httpClient.get<Album[]>(url).pipe(
		map((rawAlbums : Object[]) => {
			return rawAlbums.map(rawAlbum => <Album> rawAlbum);
		})
	);
  }
}
