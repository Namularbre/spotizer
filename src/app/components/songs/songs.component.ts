import { Component, Input } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { Observable, map } from 'rxjs';
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

  constructor(private service : SongService, private formBuilder : FormBuilder) {
    this.researchForm = this.formBuilder.group({
      title : ['', Validators.required]
    });
  }

  ngOnInit() {
    this.songs$ = this.service.getSongs();
  }

  onSubmit() {
    this.songs$ = this.service.getSongs().pipe(
      map(songs => songs.filter(song => song.title.includes(this.researchForm.value.title)))
    );
  }  
}
