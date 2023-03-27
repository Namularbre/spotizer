import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { Observable, of, map, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist';

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

  getSongArtist(APIlink : string) : Observable<Artist> {
    return this.httpClient.get<Artist>(APIlink);
  }

}
