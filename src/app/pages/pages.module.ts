import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { SearchedComponent } from './searched/searched.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HtmlSanitizerPipe } from './pipes/html-sanitizer.pipe';
import { AboutComponent } from './about/about.component';
import { TechsComponent } from './techs/techs.component';
import {MatIconModule} from '@angular/material/icon'


@NgModule({
  declarations: [SearchedComponent, 
    SidebarComponent, HtmlSanitizerPipe, AboutComponent, TechsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PagesModule { }
