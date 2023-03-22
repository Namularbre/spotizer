import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { Observable, of, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songs : Song[] = [];

  constructor(private httpClient : HttpClient) { }

  getSongs() : Observable<Song[]> {
    const getSongsUrl = "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs";

    return this.httpClient.get<Song[]>(getSongsUrl).pipe(
      map((rawSong : Object[]) => {
        return rawSong.map(rawSong => <Song> rawSong);
      })
    );
  }

  getSong(title : string) : Observable<Song> {
    const fistSong : number = 0;
    return of(this.songs.filter(song => song.title === title)[fistSong]);
  }

  getSongsByName(title : string) : Observable<Song[]> {
    return of(this.songs.filter(song => song.title === title));
  }

}
