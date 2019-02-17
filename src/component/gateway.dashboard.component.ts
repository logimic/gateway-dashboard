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

    constructor(protected service: GatewayService, protected model: GatewayModel) {
    }

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

        return 1 + num + nFaces + nAdmins;
/*
        for (let i = 0; i < this.model.thingStatus.data.things.length; i++) {

          if (item.)

        }

        return nTemps + nOutputs + nFaces + nAdmins;
        */
    }

    public getHeigth(): string {

        if (!this.model.status.onlineStatus) { return "200px"; }

        const nColumns = this. model.cfgDashboard.numberColumns;

        const nTiles = this.getNumbertTiles();

        const rows = Math.ceil(nTiles / nColumns);

        // const f = ((window.innerHeight - 5) / rows) + "px";
//         window.alert('nc: ' + nColumns + ' nt: ' + nTiles + ' rows: ' + rows + ' rs: ' +  f)

        return ((window.innerHeight - 5) / rows) + "px";

    }

}
