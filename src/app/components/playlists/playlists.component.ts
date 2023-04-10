import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {
  playlists$! : Observable<Playlist[]>;
  researchForm : FormGroup;
  creationForm : FormGroup;
  searchedField : string = "";

  constructor(private service : PlaylistService, private formBuilder : FormBuilder) {
      this.researchForm = this.formBuilder.group({
        name : ['', Validators.required]
      });

      this.creationForm = this.formBuilder.group({
        name : ['', Validators.required]
      });
  }

  ngOnInit() {
    document.querySelector("#nav-playlists")!.classList.add("active");
    
    this.playlists$ = this.service.getPlaylists();
  }

  onSubmit() {
    this.playlists$ = this.service.getSearchedPlaylists(this.researchForm.value.name);
    this.searchedField = this.researchForm.value.name;
    document.getElementById("page-number")!.textContent = "1";
  }

  onCreate() {
    this.service.addPlaylist(this.creationForm.value.name);
  }

}
