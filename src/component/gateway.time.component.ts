import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-time-component',
    templateUrl: 'gateway.time.component.html',
    styleUrls: ['gateway.time.component.css']
})
export class GatewayTimeComponent implements AfterViewInit {

    @Input()
    public skin = 'Female';

    @ViewChild('myCanvas') canvas: ElementRef;

    public context: CanvasRenderingContext2D = null;

    public secHandLength = 60;
    public date: Date = null;
    private timer = null;
    public colorSecHand = '#586A73';
    public colorOuterDial = '#929BAC';
    public colorDay = '#A0A0A4';
    public styleDay = '30px Trade Winds, cursive';

    constructor() {
      this.date = new Date;
    }

    ngAfterViewInit() {

    //  if (this.skin === 'Male') {

          this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
          //this.draw();

          //this.myTimer(1000);


    //  }

      if (this.skin === 'Male') {
        this.colorSecHand = '#FFFF00';
        this.colorOuterDial = '#C0C0C0';

        this.colorDay = '#A0A0A4';
        this.styleDay = '30px Bai Jamjuree, sans-serif';
      }

      if (this.skin === 'Female') {
        this.colorSecHand = '#FF0000';
        this.colorOuterDial = '#929BAC';

        this.colorDay = '#3498DB';
        this.styleDay = '30px Trade Winds, cursive';
      }

      // Start timer
      this.myTimer(1000);
   }

   private myTimer(step: number) {

    this.draw();

    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.myTimer(step), step);
  }

    private draw() {
      /*
      if (this.skin === 'Female') {
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(20, 20);
        this.context.stroke();
      }
      */
      this.date = new Date;

      if (this.context === null) { return; }

      // CLEAR EVERYTHING ON THE CANVAS. RE-DRAW NEW ELEMENTS EVERY SECOND.
      this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      this.OUTER_DIAL1();
      this.OUTER_DIAL2();
      this.CENTER_DIAL();
      this.MARK_THE_HOURS();
      this.MARK_THE_SECONDS();

      this.SHOW_SECONDS();
      this.SHOW_MINUTES();
      this.SHOW_HOURS();

      const options = { day: 'numeric', month: 'short' };
      const date = this.date.toLocaleDateString('en-ZA', options);

      this.context.fillStyle = this.colorDay;
      this.context.font = this.styleDay;
      this.context.fillText(date, 5, this.canvas.nativeElement.height - 10);

      const options2 = { year: 'numeric'};
      const date2 = this.date.toLocaleDateString('en-ZA', options2);

      this.context.fillStyle = this.colorDay;
      this.context.font = this.styleDay;
      this.context.fillText(date2, this.canvas.nativeElement.width - 75, this.canvas.nativeElement.height - 10);
    }

    public OUTER_DIAL1() {
      this.context.beginPath();
      this.context.arc(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, this.secHandLength + 10, 0, Math.PI * 2);
      this.context.strokeStyle = this.colorOuterDial;
      this.context.stroke();
  }

  public OUTER_DIAL2() {
    this.context.beginPath();
    this.context.arc(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, this.secHandLength + 7, 0, Math.PI * 2);
    this.context.strokeStyle = this.colorOuterDial;
    this.context.stroke();
  }
  public CENTER_DIAL() {
    this.context.beginPath();
    this.context.arc(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, 2, 0, Math.PI * 2);
    this.context.lineWidth = 3;
    this.context.fillStyle = '#353535';
    this.context.strokeStyle = '#0C3D4A';
    this.context.stroke();
  }

  public MARK_THE_HOURS() {
    for (let i = 0; i < 12; i++) {
        const angle = (i - 3) * (Math.PI * 2) / 12;       // THE ANGLE TO MARK.
        this.context.lineWidth = 1;            // HAND WIDTH.
        this.context.beginPath();

        const x1 = (this.canvas.nativeElement.width / 2) + Math.cos(angle) * (this.secHandLength);
        const y1 = (this.canvas.nativeElement.height / 2) + Math.sin(angle) * (this.secHandLength);
        const x2 = (this.canvas.nativeElement.width / 2) + Math.cos(angle) * (this.secHandLength - (this.secHandLength / 7));
        const y2 = (this.canvas.nativeElement.height / 2) + Math.sin(angle) * (this.secHandLength - (this.secHandLength / 7));

        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);

        this.context.strokeStyle = '#466B76';
        this.context.stroke();
    }
  }

  public MARK_THE_SECONDS() {
    for (let i = 0; i < 60; i++) {
        const angle = (i - 3) * (Math.PI * 2) / 60;       // THE ANGLE TO MARK.
        this.context.lineWidth = 1;            // HAND WIDTH.
        this.context.beginPath();

        const x1 = (this.canvas.nativeElement.width / 2) + Math.cos(angle) * (this.secHandLength);
        const y1 = (this.canvas.nativeElement.height / 2) + Math.sin(angle) * (this.secHandLength);
        const x2 = (this.canvas.nativeElement.width / 2) + Math.cos(angle) * (this.secHandLength - (this.secHandLength / 30));
        const y2 = (this.canvas.nativeElement.height / 2) + Math.sin(angle) * (this.secHandLength - (this.secHandLength / 30));

        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);

        this.context.strokeStyle = '#C4D1D5';
        this.context.stroke();
    }
  }

  public SHOW_SECONDS() {
      const sec = this.date.getSeconds();
      const angle = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4);
      this.context.lineWidth = 0.5;              // HAND WIDTH.

      this.context.beginPath();
      // START FROM CENTER OF THE CLOCK.
      this.context.moveTo(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2);
      // DRAW THE LENGTH.
      this.context.lineTo((this.canvas.nativeElement.width / 2 + Math.cos(angle) * this.secHandLength),
      this.canvas.nativeElement.height / 2 + Math.sin(angle) * this.secHandLength);

      // DRAW THE TAIL OF THE SECONDS HAND.
      this.context.moveTo(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2);    // START FROM CENTER.
      // DRAW THE LENGTH.
      this.context.lineTo((this.canvas.nativeElement.width / 2 - Math.cos(angle) * 20),
      this.canvas.nativeElement.height / 2 - Math.sin(angle) * 20);

          this.context.strokeStyle = this.colorSecHand;        // COLOR OF THE HAND.
          this.context.stroke();
  }

  public SHOW_MINUTES() {
      const min = this.date.getMinutes();
      const angle = ((Math.PI * 2) * (min / 60)) - ((Math.PI * 2) / 4);
      this.context.lineWidth = 1.5;              // HAND WIDTH.

      this.context.beginPath();
      this.context.moveTo(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2);  // START FROM CENTER.
      // DRAW THE LENGTH.
      this.context.lineTo((this.canvas.nativeElement.width / 2 + Math.cos(angle) * this.secHandLength / 1.1),
      this.canvas.nativeElement.height / 2 + Math.sin(angle) * this.secHandLength / 1.1);

          this.context.strokeStyle = '#999';  // COLOR OF THE HAND.
          this.context.stroke();
  }

  public SHOW_HOURS() {
      const hour = this.date.getHours();
      const min = this.date.getMinutes();
      const angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
      this.context.lineWidth = 1.5;              // HAND WIDTH.

      this.context.beginPath();
      this.context.moveTo(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2);     // START FROM CENTER.
      // DRAW THE LENGTH.
      this.context.lineTo((this.canvas.nativeElement.width / 2 + Math.cos(angle) * this.secHandLength / 1.5),
      this.canvas.nativeElement.height / 2 + Math.sin(angle) * this.secHandLength / 1.5);

          this.context.strokeStyle = '#000';   // COLOR OF THE HAND.
          this.context.stroke();
  }
}
