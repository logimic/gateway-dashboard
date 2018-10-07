import { Component, Input } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-info-component',
    templateUrl: 'gateway.info.component.html',
    styleUrls: ['gateway.info.component.css']
})
export class GatewayInfoComponent {

    @Input()
    public skin = 'Female';    

    @Input()
    public online = false;

    constructor() {
    }
}
