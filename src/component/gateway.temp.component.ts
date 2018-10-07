import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-temp-component',
    templateUrl: 'gateway.temp.component.html',
    styleUrls: ['gateway.temp.component.css']
})
export class GatewayTempComponent implements AfterViewInit {

    @Input()
    public skin = 'Female';

    @Input()
    public name = 'no-name';

    @Input()
    public temp = 0;

    @Input()
    public unit = '°C';

    @ViewChild('myCanvas') myCanvas: ElementRef;

    public context: CanvasRenderingContext2D;

    constructor() {

    }

    ngAfterViewInit() {

        if (this.skin === 'Male') {

            this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
            // this.draw();
        }
    }

    private draw() {
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(20, 20);
        this.context.stroke();
    }
}
