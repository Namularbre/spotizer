import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private readonly songs : Song[] = [
    new Song(0, "Luna", "Bombay Bycicle Club", 330, "https://www.youtube.com/watch?v=JHfc8f4sfs5dfFhdfakeUrl"),
    new Song(1, "Redecorate", "Twenty One Pilots", 581, "https://www.youtube.com/watch?v=ghruif4ds4g7fd4vv686d7Efvsdv")
  ]

  constructor() { }

  getSongs() : Observable<Song[]> {
    return of(this.songs);
  }

  getSong(title : string) : Observable<Song> {
    const fistSong : number = 0;
    return of(this.songs.filter(song => song.title === title)[fistSong]);
  }

}
