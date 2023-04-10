import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  playlist$! : Observable<Playlist>;
  id! : number;

  constructor(private service : PlaylistService, private formBuilder : FormBuilder, private route : ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });

    this.playlist$ = this.service.getPlaylist(this.id);
  }
}
