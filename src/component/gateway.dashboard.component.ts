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
}
