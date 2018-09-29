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

        return nTemps + nOutputs + nFaces + nAdmins;
    }

    public getHeigth(): string {

        if (!this.model.status.onlineStatus) return '200px';

        const nColumns = this. model.cfgDashboard.numberColumns;

        let nTiles = this.getNumbertTiles();

        let rows = Math.ceil(nTiles / nColumns);

        const perc = 100 / rows;

        return perc + '%';
    }
}
