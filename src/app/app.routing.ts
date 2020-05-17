import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterviewComponent } from './interview/interview.component';
import { DocxComponent } from './docx/docx.component';
import { CultureComponent } from './culture/culture.component';
import { FeaturesComponent } from './features/features.component';

const routes: Routes = [
  { path: '', component: FeaturesComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'interview/:wikiPath', component: InterviewComponent },
  { path: 'docs/:wikiPath', component: DocxComponent },
  { path: 'culture/:wikiPath', component: CultureComponent },
  // { path: '**', component: FeaturesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
