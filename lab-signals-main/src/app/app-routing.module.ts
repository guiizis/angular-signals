import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalsIntroComponent } from './signals-intro/signals-intro.component';
import { EffectComponent } from './effect/effect.component';

const routes: Routes = [
  { path: '', redirectTo: 'elements', pathMatch: 'full' },
  { path: 'intro', component: SignalsIntroComponent },
  { path: 'effect', component: EffectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
