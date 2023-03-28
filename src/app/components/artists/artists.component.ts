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
  searchedField : string = "";

  constructor(private service : ArtistService, private formBuilder : FormBuilder) {
      this.researchForm = this.formBuilder.group({
        name : ['', Validators.required]
      });
  }

  ngOnInit() {
    document.getElementById("nav-artists")!.classList.add("active");
    
    this.artists$ = this.service.getArtists();
  }

  onSubmit() {
    this.artists$ = this.service.getSearchedArtists(this.researchForm.value.name);
    this.searchedField = this.researchForm.value.name;
    document.getElementById("page-number")!.textContent = "1";
  }

  onPreviousClick() {
    let page: number = Number(document.getElementById("page-number")!.textContent);
    if (page - 1 >= 1) {
      page -= 1;
      this.artists$ = this.service.getArtists(page, this.searchedField);
      document.getElementById("page-number")!.textContent = page.toString();
    }
  }

  onNextClick() {
    let page: number = Number(document.getElementById("page-number")!.textContent);
    this.service.getArtists(page + 1, this.searchedField).subscribe(
      (res) => {
        if (res.length) {
          page += 1;
          this.artists$ = this.service.getArtists(page, this.searchedField);
          document.getElementById("page-number")!.textContent = page.toString();
        }
      }
    );
  }
}
