import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './components/artist/artist.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { SongsByTitlesComponent } from './components/songs-by-titles/songs-by-titles.component';
import { SongsComponent } from './components/songs/songs.component';

const routes: Routes = [
  {
    path : "songs",
    component : SongsComponent,
    children: [
      {
        path: ":title",
        component: SongsByTitlesComponent
      }
    ]
    //children //cf TD3 ! Pas fini, mais ce genre de route est testée et approuvée !
  },
  {
    path : "artists",
    component : ArtistsComponent,
    children : [
      {
        path: ":id",
        component: ArtistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
