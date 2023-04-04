import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private httpClient : HttpClient) { }

  getAlbums(): Observable<Album[]> {
    const url = "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums";

    return this.httpClient.get<Album[]>(url).pipe(
      map((rawAlbums) => { 
        return rawAlbums.map((rawAlbum) => <Album> rawAlbum) 
      })
    );
  }

  getAlbum(id : number) : Observable<Album> {
    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums/${id}`;

    return this.httpClient.get<Album>(url).pipe(
      map((rawAlbum) => {
        return <Album> rawAlbum;
      })
    );
  }

  getSearchedAlbum(search : string = "") : Observable<Album[]> {
    const getAlbumUrl = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums?title=${search}`;

    return this.httpClient.get<Album[]>(getAlbumUrl).pipe(
      map((rawAlbums : Object[]) => {
        return rawAlbums.map(rawAlbum => <Album> rawAlbum);
      })
    );
  }
}
