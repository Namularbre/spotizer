import { Component } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {
  artists$! : Observable<Artist[]>;

  constructor(private service : ArtistService) {}

  ngOnInit() {
    this.artists$ = this.service.getArtists();
  }
}
