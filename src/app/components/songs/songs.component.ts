import { Component } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent {
  songs$! : Observable<Song[]>;

  constructor(private service : SongService) {}

  ngOnInit() {
    this.songs$ = this.service.getSongs();
  }
}
