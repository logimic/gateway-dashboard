import { Component, Input } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-dashboard-component',
    templateUrl: 'gateway.dashboard.component.html',
    styleUrls: ['gateway.dashboard.component.css']
})
export class GatewayDashboardComponent {

    @Input()
    public onlineStatus = true;

    public counter = 0;

    constructor(protected service: GatewayService, protected model: GatewayModel) {
    }
/*
    public getNumbertTiles(): number {

        const nTemps = this.model.thingSpace.data.thermometer.length;
        const nOutputs = this.model.thingSpace.data.binaryOutput.length;
        const nFaces = 1;
        const nAdmins = 3;

        let num = 0;

        for (const item of this.model.thingStatus.data.things) {

          if (item.atype === 'Temperature' || item.atype === 'BinaryOutput') {
            num ++;
          }
        }

        num = this.model.thingStatus.data.things.length;

        return 1 + num + nFaces + nAdmins;
    }
*/
    public GetNumTiles(): number {

      const nColumns = this. model.cfgDashboard.numberColumns;
      const nRows = this. model.cfgDashboard.numberRows;

      return (nColumns * nRows) - 6 - 1;
    }

    public getHeigth(): string {

        if (!this.model.status.onlineStatus) { return "200px"; }

        const nColumns = this. model.cfgDashboard.numberColumns;
        const nRows = this. model.cfgDashboard.numberRows;

       // const nTiles = this.getNumbertTiles();

        const rows = nRows; // Math.ceil(nTiles / nColumns);

         // const f = ((window.innerHeight - 5) / rows) + "px";
         // window.alert('nc: ' + nColumns + ' nt: ' + nTiles + ' rows: ' + rows + ' rs: ' +  f);

        return ((window.innerHeight - 5) / rows) + "px";

    }

    public getBkColorFemale (atype: string) {

      if (atype === 'Temperature') {
        return '#85C1E9';

      } else if (atype === 'BinaryOutput') {
        return '#F8C471';

      } else if (atype === 'RelativeHumidity') {
        return '#48C9B0';

      } else if (atype === 'Concentration') {
        return '#F0B27A';

      } else if (atype === 'Voltage') {
        return '#B2BABB';

      } else if (atype === 'SoundPressureLevel') {
        return '#82E0AA';

      } else  {
        return '#C39BD3';
      }

    }

    public isValidThing (name: string): boolean {

      for (const disName of this.model.cfgDashboard.disableNames) {
        if (name.search(disName) !== -1) {
          return false;
        }
      }

      return true;
    }

    public isValidThingType (atype: string): boolean {

      for (const aTypeItem of this.model.cfgDashboard.disableAtypes) {
        if (atype.search(aTypeItem) !== -1) {
          return false;
        }
      }

      return true;
    }

    public isTimeTile() {

      if(this.model.cfgDashboard.timeTile != null) {
        return this.model.cfgDashboard.timeTile;
      }

      return false;
    }

    public count() {
      this.counter ++;
    }

    public clearCount () {
      this.counter = 0;
    }

    public getCount(): number {
      return this.counter;
    }

}
