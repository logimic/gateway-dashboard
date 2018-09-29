import { Component, Input } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-temp-component',
    templateUrl: 'gateway.temp.component.html',
    styleUrls: ['gateway.temp.component.css']
})
export class GatewayTempComponent {

    @Input()
    public name = 'no-name';   
    
    @Input()
    public temp = 0;

    @Input()
    public unit = '°C';

    constructor() {
    }
}
