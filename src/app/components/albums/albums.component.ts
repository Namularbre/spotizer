import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
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

  constructor(private service : AlbumService, private formBuilder : FormBuilder, private route: ActivatedRoute) {
    this.researchForm = this.formBuilder.group({
      title : ['', Validators.required]
    });
  }

  ngOnInit() {
    document.querySelector("#nav-albums")!.classList.add("active");

    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.albums$ = this.service.getAlbumsFromArtist(parseInt(params["id"]));
      } else {
        this.albums$ = this.service.getAlbums();
      }
    });
  }

  onSubmit() {
    this.albums$ = this.service.getSearchedAlbum(this.researchForm.value.title);
    this.searchedField = this.researchForm.value.title;
    //document.querySelector("#page-number")!.textContent = "1";
  }

  onPreviousClick() {
    let page: number = Number(document.getElementById("page-number")!.textContent);
    if (page - 1 >= 1) {
      page -= 1;
      this.albums$ = this.service.getAlbums(page, this.searchedField);
      document.getElementById("page-number")!.textContent = page.toString();
    }
  }

  onNextClick() {
    let page: number = Number(document.getElementById("page-number")!.textContent);
    this.service.getAlbums(page + 1, this.searchedField).subscribe(
      (res) => {
        if (res.length) {
          page += 1;
          this.albums$ = this.service.getAlbums(page, this.searchedField);
          document.getElementById("page-number")!.textContent = page.toString();
        }
      }
    );
  }


}
