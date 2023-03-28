import { Component, Input } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { Observable, map, count } from 'rxjs';
import { Song } from 'src/app/models/song';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent {
  songs$! : Observable<Song[]>;
  researchForm : FormGroup;
  searchedField : string = "";

  constructor(private service : SongService, private formBuilder : FormBuilder) {
    this.researchForm = this.formBuilder.group({
      title : ['', Validators.required]
    });
  }

  ngOnInit() {
    document.getElementById("nav-songs")!.classList.add("active");

    this.songs$ = this.service.getSongs();
  }

  onSubmit() {
    this.songs$ = this.service.getSearchedSongs(this.researchForm.value.title);
    this.searchedField = this.researchForm.value.title;
    document.getElementById("page-number")!.textContent = "1";
  } 

  onPreviousClick() {
    let page: number = Number(document.getElementById("page-number")!.textContent);
    if (page - 1 >= 1) {
      page -= 1;
      this.songs$ = this.service.getSongs(page, this.searchedField);
      document.getElementById("page-number")!.textContent = page.toString();
    }
  }

  onNextClick() {
    let page: number = Number(document.getElementById("page-number")!.textContent);
    this.service.getSongs(page + 1, this.searchedField).subscribe(
      (res) => {
        if (res.length) {
          page += 1;
          this.songs$ = this.service.getSongs(page, this.searchedField);
          document.getElementById("page-number")!.textContent = page.toString();
        }
      }
    );
  }
}
