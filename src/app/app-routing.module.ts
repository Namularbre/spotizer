import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { SongsComponent } from './components/songs/songs.component';
import { AlbumsComponent } from './components/albums/albums.component';

const routes: Routes = [
  {
    path : "",
    component : AccueilComponent
  },
  {
    path : "songs",
    component : SongsComponent
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
  },
  {
    path: "albums",
    component : AlbumsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
