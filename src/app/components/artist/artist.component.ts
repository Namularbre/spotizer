import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { Observable } from 'rxjs';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {
  @Input() 
  artistUrl! : string;

  artist$! : Observable<Artist>;
  albums$! : Observable<Album>;

  constructor(private service : ArtistService) {}

  ngOnInit() {
    this.artist$ = this.service.getArtist(this.artistUrl);
    let albumUrl = this.artist$.pipe();
  }

}
