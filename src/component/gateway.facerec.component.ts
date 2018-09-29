import { Component, Input } from '@angular/core';
import { GatewayModel} from '../gateway/gateway.model';
import { GatewayService } from '../gateway/gateway.service';

@Component({
    selector: 'app-gateway-facerec-component',
    templateUrl: 'gateway.facerec.component.html',
    styleUrls: ['gateway.facerec.component.css']
})
export class GatewayFacerecComponent {

    @Input()
    public name = 'Face Recognition';

    @Input()
    public nFaces = 0;

    constructor() {
    }
}
