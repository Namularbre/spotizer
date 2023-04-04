import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
      name : ['', Validators.required]
    });
  }

  ngOnInit() {
    this.albums$ = this.service.getAlbums();
  }

}
