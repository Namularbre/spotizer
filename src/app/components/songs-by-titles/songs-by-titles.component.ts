import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/song';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-songs-by-titles',
  templateUrl: './songs-by-titles.component.html',
  styleUrls: ['./songs-by-titles.component.css']
})
export class SongsByTitlesComponent {
  songs$! : Observable<Song[]>;

  constructor(private service : SongService, private route : ActivatedRoute) {}

  ngOnInit() {
    let serchedTitle : string = "";

    this.route.params.subscribe(params => {
      serchedTitle = params['title'];
    });

    this.songs$ = this.service.getSongsByName(serchedTitle);
  }
}
