import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/song';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent {
  song$! : Observable<Song>;

  @Input()
  title! : string;

  constructor(private service : SongService) {}

  ngOnInit() {
    this.song$ = this.service.getSong(this.title);
  }
}
