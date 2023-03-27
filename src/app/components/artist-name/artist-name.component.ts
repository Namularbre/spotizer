import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { Observable } from 'rxjs';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-artist-name',
  templateUrl: './artist-name.component.html',
  styleUrls: ['./artist-name.component.css']
})
export class ArtistNameComponent {
  @Input() 
  artistUrl! : string;

  artist$! : Observable<Artist>;
  albums$! : Observable<Album>;

  constructor(private service : ArtistService) {}

  ngOnInit() {
    const url = `https://mmi.unilim.fr/${this.artistUrl}`;
    
    this.artist$ = this.service.getArtist(url);
    let albumUrl = this.artist$.pipe();
  }
}
