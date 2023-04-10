import { Component, Input } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { Observable, map, count, of } from 'rxjs';
import { Song } from 'src/app/models/song';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent {
  songs$! : Observable<Song[]>;
  songs : any = [];
  researchForm : FormGroup;
  searchedField : string = "";

  constructor(private service : SongService, private albumService : AlbumService, private artistService : ArtistService, private formBuilder : FormBuilder, private route: ActivatedRoute) {
    this.researchForm = this.formBuilder.group({
      title : ['', Validators.required]
    });
  }

  ngOnInit() {
    document.getElementById("nav-songs")!.classList.add("active");

    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.albumService.getAlbum(parseInt(params["id"])).subscribe(album => {
          album.songs.forEach(song => {
            const newSong = {...song, artist: "/~morap01/L250/public/index.php/api/artists/" + album.artist.id};
            this.songs.push(newSong);
            this.songs$ = of(this.songs);
          });
          document.getElementById("title")!.textContent = "Musiques de l'album \"" + album.title + "\"";
        });
      } else {
        this.songs$ = this.service.getSongs();
        this.service.getSongs().subscribe(song => {
          console.log(song);
        })
      }
    });
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
