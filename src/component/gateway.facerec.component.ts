import { Component, Input } from '@angular/core';
import { GatewayModel, Face} from '../gateway/gateway.model';
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

    constructor(protected service: GatewayService, protected model: GatewayModel) {
    }

    /*
    * Returns type of face
    */
    public getFaceType(n: number): number {

        const fc: Face = this.model.getFace(0, 0);

        if (fc !== null) {
            return fc.maleProb;
        }

        return 0;
    }

    public isMale(n: number): boolean {

        // return true;

        const fc: Face = this.model.getFace(0, 0);

        if (fc !== null) {

            if (fc.maleProb > 0.6) {
                return true;
            } else {
                return false;
            }
            //return fc.maleProb;
        }        

        return false;
        
    }
  
}
