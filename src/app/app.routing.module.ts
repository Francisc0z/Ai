import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { SearchedComponent } from './pages/searched/searched.component';
import { AboutComponent } from './pages/about/about.component';
import { TechsComponent } from './pages/techs/techs.component';

const routes: Routes = [
  {
    path: 'index',
    component: StartComponent,
  },
  {
    path: 'searched/:inputValue',
    component: SearchedComponent,
  },  
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'techs',
    component: TechsComponent
  },
  {
    path: '**',
    redirectTo: 'index'  
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
