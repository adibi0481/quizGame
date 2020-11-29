import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameBoardComponent } from './pages/game-board/game-board.component';
import { LandingComponent } from './pages/landing/landing.component';


const routes: Routes = [ {
  path:'',
  component: LandingComponent,
},
{
  path:'play',
  component: GameBoardComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
