import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/models/playlist';
import { Song } from 'src/app/models/song';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  playlist$! : Observable<Playlist>;
  id! : number;

  constructor(private service : PlaylistService, private route : ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });

    this.playlist$ = this.service.getPlaylist(this.id);
  }

  onRemove(songId : number) {
    let song! : Song;

    this.playlist$.subscribe(data => {
      song = data.songs.filter(song => {
        return song.id === songId;
      })[0];

      this.service.removeSong(data, song);
    });
  }
}
