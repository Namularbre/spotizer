import { Component } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { Observable, map, filter } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {
  artists$! : Observable<Artist[]>;
  researchForm : FormGroup;

  constructor(private service : ArtistService, private formBuilder : FormBuilder) {
      this.researchForm = this.formBuilder.group({
        name : ['', Validators.required]
      });
  }

  ngOnInit() {
    this.artists$ = this.service.getArtists();
  }

  onSubmit() {
    this.artists$ = this.service.getArtists().pipe(
      map(artists => artists.filter(artist => artist.name.includes(this.researchForm.value.name)))
    );
  }
}
