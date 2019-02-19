import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-thing-component',
    templateUrl: 'gateway.thing.component.html',
    styleUrls: ['gateway.thing.component.css']
})
export class GatewayThingComponent implements AfterViewInit {

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

    @ViewChild('myCanvas') myCanvas: ElementRef;

    public context: CanvasRenderingContext2D;

    constructor() {
    }

    ngAfterViewInit() {

    //  if (this.skin === 'Male') {

          this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
          // this.draw();
    //  }
   }

    private draw() {
      if (this.skin === 'Female') {
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(20, 20);
        this.context.stroke();
      }
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
        return 'ppm';

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
        return 'dB';

      } else if (this.unit === 'MeterPerSecond2') {
        return 'm/sec2';

      } else if (this.unit === 'Percent') {
        return '%';

      } else if (this.unit === 'WattHour') {
        return 'Wh';

      }

      return ' ';
    }

    public getName (): string {

      if (this.name.search('Volatile_organic_compound') !== -1) {
        const regex = /Volatile_organic_compound/gi;
        const newName = this.name.replace(regex, 'VolOrgCompound');
        return newName;

      } else if (this.name.search('Extra-low_voltage') !== -1) {
        const regex = /Extra-low_voltage/gi;
        const newName = this.name.replace(regex, 'Voltage');
        return newName;

      } else if (this.name.search('Low_voltage') !== -1) {
        const regex = /Low_voltage/gi;
        const newName = this.name.replace(regex, 'Voltage');
        return newName;

      } else if (this.name.search('Atmospheric_pressure') !== -1) {
        const regex = /Atmospheric_pressure/gi;
        const newName = this.name.replace(regex, 'AtmPressure');
        return newName;

      } else if (this.name.search('Carbon_dioxide') !== -1) {
        const regex = /Carbon_dioxide/gi;
        const newName = this.name.replace(regex, 'CO2');
        return newName;

      } else if (this.name.search('Sound_pressure_level') !== -1) {
        const regex = /Sound_pressure_level/gi;
        const newName = this.name.replace(regex, 'Noise');
        return newName;

      } else if (this.name.search('Relative_humidity') !== -1) {
        const regex = /Relative_humidity/gi;
        const newName = this.name.replace(regex, 'Humidity');
        return newName;

      }

      return this.name;
    }

    public getNumber(): number {
      return parseFloat(parseFloat(this.value.toString()).toFixed(2));
    }
}
