import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  itemenu: MENUITEM[] = [
    {
      nameUrl:'Inicio',
      url: '#'
    },
    {
      nameUrl:'Sobre el proyecto',
      url: 'about'
    },
    {
      nameUrl:'Tecnologias',
      url: 'techs'
    }
  ]
  ngOnInit(): void {
    
  }
}
interface MENUITEM {
  nameUrl: string,
  url: string
}