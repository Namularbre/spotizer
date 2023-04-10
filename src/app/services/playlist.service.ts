import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist';
import { Observable, filter, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private httpClient : HttpClient) { }

  getPlaylists() : Observable<Playlist[]> {
    let playlists : Playlist[] = [];
    
    for (let index = 0; index < sessionStorage.length; index++) {
      let id : string = sessionStorage.getItem(`${index}`)!;

      console.log(id, sessionStorage);

      if (!isNaN( parseInt(id))) {
        this.getPlaylist(parseInt(id)).subscribe(playlist => playlists.push(playlist));
      }
    }

    return of(playlists);
  }

  getPlaylist(id : number) : Observable<Playlist> {
    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/${id}`;

    return this.httpClient.get<Playlist>(url).pipe(
      map((rawPlaylist : Object) => {
        return <Playlist> rawPlaylist;
      })
    );
  }

  getSearchedPlaylists(name : string) : Observable<Playlist[]> {
    let playlists! : Playlist[];

    for (let index = 0; index < sessionStorage.length; index++) {
      let id : string = sessionStorage.getItem(`${index}`)!;
      this.getPlaylist(parseInt(id)).subscribe(playlist => playlists.push(playlist));
    }

    playlists.filter(playlist => playlist.name.includes(name));

    return of(playlists);
  }

  addPlaylist(name : string): void {
    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists`;

    let nextId : number = parseInt(sessionStorage.getItem(`${sessionStorage.length}`)!);

    if (isNaN(nextId)) {
      nextId = 0;
    }

    this.httpClient.post<any>(url, {name : name}).subscribe(data => {
      sessionStorage.setItem(`${nextId}`, `${data.id}`);
    });
  }

  addSongs(id : number, songs : Song[]): void {
    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/${id}`;

    this.httpClient.patch(url, {songs : JSON.stringify(songs)});
  }

  removeSong(playlist : Playlist, songToRemove : Song): void {
    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/${playlist.id}`;

    let songs : Song[] = playlist.songs.filter(song => { song !== songToRemove });

    playlist.songs = songs;
    
    this.httpClient.patch(url, playlist);
  }
}
