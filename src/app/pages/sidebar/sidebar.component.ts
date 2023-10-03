import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LlamaService } from 'src/app/services/llama.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  navItems : string[] = []
  inputValue: string = '';
  showFiller = true;

  constructor(private route: ActivatedRoute, private llamaService: LlamaService,
    private router: Router, private elementRef: ElementRef){
      this.inputValue = sessionStorage.getItem('searchedParam')!;
    }

  ngOnInit(): void {    
    this.llamaService.fetchTGetList(this.inputValue).subscribe(navItemsResponse => {
      navItemsResponse = navItemsResponse.replace(/'/g, '');
      navItemsResponse = navItemsResponse.replace(/"/g, '');
      let startList = navItemsResponse.indexOf("[");
      let endList = navItemsResponse.lastIndexOf("]");
      let listText = navItemsResponse.slice(startList, endList + 2); 
      let propiedadesEnArray = listText.replace(/\[|\]|\s/g, "").split(",");

      this.navItems = propiedadesEnArray;
    })
  }

  passItem(item:string){
    this.router.navigate([`/searched/${this.inputValue}-${item}`]);
  }
}