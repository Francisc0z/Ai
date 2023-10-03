import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  boolPlaceholder:boolean = false
  searchedText:string = ''

  constructor(private router: Router) {}
  

  ngOnInit() {
  } 

  redireccionar(){
    if (this.searchedText) {
      sessionStorage.setItem('searchedParam', this.searchedText);
      this.router.navigate(['/searched', this.searchedText]);
    }
  }

  onInputChange(e:any){
    if(e !== ''){
      this.boolPlaceholder = true;
    }else{
      this.boolPlaceholder = false;
    }
  }
}
class TxtType {
  private toRotate: string[];
  private el: HTMLElement;
  private loopNum: number = 0;
  private period: number;

  private txt: string = '';
  private isDeleting: boolean = false;

  constructor(el: HTMLElement, toRotate: string[], period: string) {
    this.toRotate = toRotate;
    this.el = el;
    this.period = parseInt(period, 10) || 2000;
    this.tick();
  }

  private tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    const that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

window.onload = function () {
  const elements = document.getElementsByClassName('typewrite');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-type');
    const period: any = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i] as HTMLElement, JSON.parse(toRotate) as string[], period);
    }
  }

  // INJECT CSS
  const css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
  document.body.appendChild(css);
};
