import { Component } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { Observable, map } from 'rxjs';
import { Album } from 'src/app/models/album';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {
  artist$! : Observable<Artist>;
  albums$! : Observable<Album>;
  id! : number;

  constructor(private service : ArtistService, private route : ActivatedRoute) {}

  ngOnInit() {
    console.log("test");
    
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });

    const url = `https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists/${this.id}`;
    this.artist$ = this.service.getArtist(url);
  }
}
