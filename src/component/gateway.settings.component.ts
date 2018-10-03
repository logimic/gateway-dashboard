import { Component, Input } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-settings-component',
    templateUrl: 'gateway.settings.component.html',
    styleUrls: ['gateway.settings.component.css']
})
export class GatewaySettingsComponent {

    @Input()
    public skin = 'Female';  

/*
    favoriteSkin: string = 'Female';

    skins: string[] = ['Female', 'Male', 'Kid', 'Adaptive'];          
*/
    constructor(protected service: GatewayService, protected model: GatewayModel) {

    }

}
