import { Component, Input } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-about-component',
    templateUrl: 'gateway.about.component.html',
    styleUrls: ['gateway.about.component.css']
})
export class GatewayAboutComponent {

    @Input()
    public skin = 'Female';

    @Input()
    public logo = './theme/Logimic_logo_full.png';    

    constructor() {
    }
}
