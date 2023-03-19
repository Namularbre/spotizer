import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './components/songs/songs.component';

const routes: Routes = [
  {
    path : "songs",
    component : SongsComponent
    //children //cf TD3 ! Pas fini, mais ce genre de route est testée et approuvée !
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
