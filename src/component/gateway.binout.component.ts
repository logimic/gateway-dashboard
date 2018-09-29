import { Component, Input } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-binout-component',
    templateUrl: 'gateway.binout.component.html',
    styleUrls: ['gateway.binout.component.css']
})
export class GatewayBinoutComponent {

    @Input()
    public output = false;

    @Input()
    public name = 'no-name';

    constructor() {
    }
}
