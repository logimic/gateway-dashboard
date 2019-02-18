import { Component, Input } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';
/*
export interface Skin {
    color: string;
    cols: number;
    rows: number;
    text: string;
}
*/
@Component({
    selector: 'app-gateway-thing-component',
    templateUrl: 'gateway.thing.component.html',
    styleUrls: ['gateway.thing.component.css']
})
export class GatewayThingComponent {

    @Input()
    public skin = 'Female';

    @Input()
    public name = 'no-name';

    @Input()
    public value = 1;

    @Input()
    public atype = '...';

    @Input()
    public unit = '...';

    constructor() {
    }

    public getUnit (): string {

      if (this.unit === 'Celsius') {
        return '°C';

      } else if (this.unit === 'Meter') {
        return 'm';

      } else if (this.unit === 'Pixel') {
        return 'px';

      } else if (this.unit === 'Degree') {
        return '°';

      } else if (this.unit === 'Year') {
        return 'yr';

      } else if (this.unit === 'Second') {
        return 'sec';

      } else if (this.unit === 'Ppm') {
        return 'p/m';

      } else if (this.unit === 'Volt') {
        return 'V';

      } else if (this.unit === 'Tesla') {
        return 'T';

      } else if (this.unit === 'Amper') {
        return 'A';

      } else if (this.unit === 'Watt') {
        return 'W';

      } else if (this.unit === 'Hertz') {
        return 'hz';

      } else if (this.unit === 'Lux') {
        return 'lx';

      } else if (this.unit === 'HectoPascal') {
        return 'hPa';

      } else if (this.unit === 'Kelvin') {
        return 'K';

      } else if (this.unit === 'MicroGramPerMeter3') {
        return 'µg/m3';

      } else if (this.unit === 'DeciBell') {
        return 'db';

      } else if (this.unit === 'MeterPerSecond2') {
        return 'm/sec';

      } else if (this.unit === 'Percent') {
        return '%';

      } else if (this.unit === 'Watthour') {
        return 'Whr';

      }

      return '...';

    }
}
