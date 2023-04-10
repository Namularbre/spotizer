import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Album } from '../models/album';
import { ArtistService } from './artist.service';
import { AlbumType } from '../models/albumtype';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private httpClient : HttpClient, private artistService : ArtistService) { }

  getAlbums(page : number = 1, search : string = ""): Observable<Album[]> {
    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums?page=${page}&title=${search}`;

    return this.httpClient.get<Album[]>(url).pipe(
      map((rawAlbums) => {
        let albums : Album[] = rawAlbums.map(rawAlbum => <Album> rawAlbum);

        albums.forEach((album : Album) => {
          album.albumtype = <AlbumType> album.albumtype;
        });
        
        return albums;
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
        console.log(rawAlbums);
        let albums : Album[] = rawAlbums.map(rawAlbum => <Album> rawAlbum);

        albums.forEach((album : Album) => {
          album.albumtype = <AlbumType> album.albumtype;
        });
      
        return albums;
      })
    );
  }

  getAlbumsFromArtist(id : number) : Observable<Album[]> {
    return this.artistService.getArtistById(id).pipe(
      switchMap(artist => {
        const getAlbumUrl = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums?artist.name=${artist.name}`;
        return this.httpClient.get<Album[]>(getAlbumUrl).pipe(
          map((rawAlbums: Object[]) => {
            return rawAlbums.map(rawAlbum => <Album>rawAlbum);
          })
        );
      })
    );
  }
}
