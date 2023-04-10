import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { SongsComponent } from './components/songs/songs.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';

const routes: Routes = [
  {
    path : "",
    component : AccueilComponent
  },
  {
    path : "songs",
    component : SongsComponent
  },
  {
    path : "songs/:id",
    component : SongsComponent
  },
  {
    path : "artists",
    component : ArtistsComponent,
  },
  {
    path: "artists/:id",
    component: ArtistComponent
  },
  {
    path: "albums",
    component : AlbumsComponent,
  },
  {
    path: "albums/:id",
    component : AlbumsComponent,
  },
  {
    path: "playlists",
    component : PlaylistsComponent,
  },
  {
    path: "playlists/:id",
    component : PlaylistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
