import { Component, ElementRef, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LlamaService } from 'src/app/services/llama.service';

@Component({
  selector: 'app-searched',
  templateUrl: './searched.component.html',
  styleUrls: ['./searched.component.css'],
})
export class SearchedComponent implements OnInit, AfterViewChecked {
  showFiller = true;
  currentUrl:string = this.router.url;
  inputValue: string = '';
  actualURL:string = '';
  titleValue: string = '';
  dynamicContent: string = "";
  navItems : string[] = []
  textia = ``;
  eventHandlerRegistered: boolean = false;

  constructor(private route: ActivatedRoute, private llamaService: LlamaService,
    private router: Router, private elementRef: ElementRef) {      
      this.titleValue = sessionStorage.getItem('searchedParam')!;
      this.route.params.subscribe(params => {
        this.inputValue = params['inputValue'];
      });
  }
  



  ngOnInit(): void {
    console.log('arranca')
    this.llamaService.fetchTGetInitialText(this.titleValue).subscribe(llamaInitialResponse => {      
      this.textia = llamaInitialResponse;
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //TODO: ejecutar la llamada a la api con cada cambio
        this.getText();
      }
    });
  }
  registrarEventoClick(){
    const contenedor = this.elementRef.nativeElement.querySelector('#contenedorDinamico');
    const enlaceEmbuido = contenedor.querySelector('#enlaceEmbuido');
    const router = this.router;
    contenedor.addEventListener('click', (event:any) => {
      // Verifica si el elemento clicado es un enlace con la clase "enlaceEmbuido"
      if (event.target && event.target.classList.contains('enlaceEmbuido')) {
        // Obtén el texto del enlace clicado
        const enlaceTexto = event.target.textContent;
        
        this.inputValue = `${this.inputValue}-${enlaceTexto.toLowerCase()}`;

        // Utiliza el texto del enlace clicado en la navegación
        router.navigate([`/searched/${this.inputValue}`]);
      }
    });
  }
  ngAfterViewChecked() {
    if (!this.eventHandlerRegistered) {
      this.registrarEventoClick();
      this.eventHandlerRegistered = true;
    }
  }

  getText(){
    this.llamaService.fetchTGetText(this.inputValue).subscribe(textResponse => {
      let textResponseCopy = textResponse;
      textResponseCopy = textResponseCopy.replace(/'/g, '');
      textResponseCopy = textResponseCopy.replace(/`/g, '');
      textResponseCopy = textResponseCopy.replace(/"/g, '');
      const startList = textResponseCopy.indexOf("[");

      let listText = textResponseCopy.slice(startList, textResponseCopy.length + 2); 
      const keywordsOnArray = listText.replace(/\[|\]|\s/g, "").split(",");

      textResponse = textResponse.substring(0, textResponse.indexOf('Keywords'));
      const textResalted = this.resaltarPalabrasClave(textResponse, keywordsOnArray)
      this.textia = textResalted;
    });
  }

  resaltarPalabrasClave(texto:string, keywords:string[]): string {
    if (!texto || keywords.length === 0) {
      return texto; // No hay texto o palabras clave, no se hace resaltado
    }
    // Utiliza una expresión regular para buscar y reemplazar las palabras clave en negrita
    const regex = new RegExp(keywords.join('|'), 'gi');
    return texto.replace(regex, match => `<a  id="enlaceEmbuido" class="enlaceEmbuido">${match}</a>`);
  }

}