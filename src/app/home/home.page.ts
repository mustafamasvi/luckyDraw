import { Component } from '@angular/core';
import { ExcelService } from '../excel.service';


//const confetti = require('canvas-confetti');
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data:any;
  luckyDraw:any;
  isSetup:boolean = false;
  workbook:any;
  sheets:any;
  selectedSheet:any;
  allField:any;
  selectedField:any;
  constructor(private excelService:ExcelService) {}

  loadFromDevice(event) {
    const file = event.target.files[0];
    this.excelService.getWorkBookFromExcelFile(file).then(data =>{
      this.workbook = data;
      this.sheets = this.workbook.SheetNames;
    })
  }

  onSelectSheet(){
    this.excelService.getSheetData(this.workbook, this.selectedSheet).then(data=>{
      this.data = data;
      this.allField = Object.keys(data[0]);
    })
  }



  randomITS(){
    const boo = this.data.map(d=>{
      let da = {};
      this.selectedField.forEach(element => {
        da[element] = d[element];
      });
      return da;
    })
    let index =  Math.round(this.random(0,boo.length));
    this.luckyDraw = boo[index];
    this.shoot.bind(this);
    const handler = setInterval(this.shoot.bind(this),500);
    setTimeout(()=>clearInterval(handler),3000);
  }

  refresh(){
    this.luckyDraw = null;
  }

  onSetupClick(){
    this.isSetup = true;

  }

  shoot() {
    try {
      this.confetti({
        angle: this.random(60, 120),
        spread: this.random(10, 50),
        particleCount: this.random(40, 50),
        origin: {
          y: 0.6,
        },
      });
    } catch (e) {
      // noop, confettijs may not be loaded yet
    }
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  confetti(args: any) {
    return window['confetti'].apply(this, arguments);
  }
}
