import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  albums$! : Observable<Album[]>;
  researchForm : FormGroup;
  searchedField : string = "";

  constructor(private service : AlbumService, private formBuilder : FormBuilder) {
    this.researchForm = this.formBuilder.group({
      title : ['', Validators.required]
    });
  }

  ngOnInit() {
    document.querySelector("#nav-albums")!.classList.add("active");

    this.albums$ = this.service.getAlbums();
  }

  onSubmit() {
    this.albums$ = this.service.getSearchedAlbum(this.researchForm.value.title);
    this.searchedField = this.researchForm.value.title;
    //document.querySelector("#page-number")!.textContent = "1";
  }



}
