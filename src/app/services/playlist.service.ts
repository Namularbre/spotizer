import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  playlists$! : Playlist;

  constructor(private httpClient : HttpClient) { }

  getPlaylist(id : number) : Observable<Playlist> {
    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/${id}`;

    return this.httpClient.get<Playlist>(url).pipe(
      map((rawPlaylist : Object) => {
        console.log(rawPlaylist);
        
        return <Playlist> rawPlaylist;
      })
    );
  }

  addPlaylist(playlist : Playlist): void {
    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists`;

    this.httpClient.post<any>(url, {name : playlist.name}).subscribe(data => { console.log(data)});
    sessionStorage.setItem(`${playlist.id}`, `${playlist.id}`);
  }

  addSongs(id : number, songs : Song[]): void {
    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/${id}`;

    this.httpClient.patch(url, {songs : JSON.stringify(songs)});
  }

  removeSongs(id : number, songs : Song[]): void {
    
  }
}
