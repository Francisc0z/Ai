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
  isLoading: boolean = true;
  errorInSide: boolean = false;
  constructor(private route: ActivatedRoute, private llamaService: LlamaService,
    private router: Router, private elementRef: ElementRef){
      this.inputValue = sessionStorage.getItem('searchedParam')!;
    }

  ngOnInit(): void {    
    this.llamaService.fetchTGetList(this.inputValue).subscribe(navItemsResponse => {
      navItemsResponse = navItemsResponse.replace(/'/g, '');
      navItemsResponse = navItemsResponse.replace(/`/g, '');
      navItemsResponse = navItemsResponse.replace(/"/g, '');
      let startList = navItemsResponse.indexOf("[");
      let listText = navItemsResponse.slice(startList, navItemsResponse.length + 2); 
      let propiedadesEnArray = listText.replace(/\[|\]|\s/g, "").split(",");

      this.navItems = propiedadesEnArray;
      this.isLoading = false;
      if(this.navItems.length == 1){
        this.errorInSide = true;
      }
    })
  }

  passItem(item:string){
    this.router.navigate([`/searched/${this.inputValue}-${item}`]);
  }
}