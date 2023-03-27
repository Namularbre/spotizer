import { Component, Input } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { Observable, map } from 'rxjs';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent {
  searchedMusicTitle$  = '';
  songs$! : Observable<Song[]>;

  constructor(private service : SongService) {}

  ngOnInit() {
    this.songs$ = this.service.getSongs();
  }

  filterMusicTitle() {
    return this.service.getSongsByName(this.searchedMusicTitle$);
  }
}
