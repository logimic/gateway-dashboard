
import { Injectable, EventEmitter } from '@angular/core';
import { GatewayService } from './gateway.service';
// import { ISTLFacets, StlService } from '../webgl/stl.service';
import { Observable } from 'rxjs/Rx';
// import * as iqrfApi from './iqrf-api';
import * as oegwApi from './oegw-api';
import * as oegwThings from './oegw-things';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Things } from '../../../../Logimic/gateway-manager/src/gateway/oegw-things';
import { Face3 } from 'three';

export interface ServerStatus {
    cncStatus: number;      // status cnc core
    systemStatus: number;   // status server system
}

export class Status  {
    public serverStatus: ServerStatus; // Server status from websockets
    public onlineStatus= false; // Indicates if we have connection with server
    public mode = 0; // 0-control mode; 1-learning mode
    public cncFile = ' ';
    public jsonFile = ' ';
    public trajReachable = false;
    public message = '';
    public trajReady; // trajectory is loaded and has at least one segment
    public manTrajsOn = false;  // Sets visible manual trajs...
    public skin = 1; // 0: male, 1: female
    public face = 'Male';
    public selectedSkin = 'Female';
    skins: string[];

}

export interface IMessageList {
    messages: string [];
}

export interface ConfigWS {
    wsServer: string;
    wsIP: string;
    wsPort: string;
    detectServer: boolean;
    valid: boolean;
}

export interface ConfigDashboard {
    numberColumns: number;
    initSkin: string;
}

export interface ThingSpaceRecord {
    point: oegwThings.ThingSpace;
    time: number;
}

export interface Face {
    label: number;
    maleProb: number;
    age: number;
    confidence: number;
    location: {
        x: number;
        y: number;
        z: number;
    };
    headPose: {
        r: number;
        p: number;
        y: number;
    };
}


export interface Thing {
      /**
       * Identificator of thing...
       */
      name: string;
      /**
       * Value of thing...
       */
      value: number;
      /**
       * Type of thing...
       */
      atype: string;
      /**
       * Unit of thing value...
       */
      unit?: string;
}


/* hold information transmitted by websocket*/
@Injectable()
export class GatewayModel  {

    // readonly MAX_RECORDS: number = 10000;
    // readonly DW_RECORDS: number = 5000;

    // oegw API
    public thingSpace: oegwThings.ThingSpace = {
        mType: 'thingSpace',
        data: {
            binaryOutput: [],
            faceRecognition: [],
            thermometer: []
        }
    };

    public thingStatus: oegwApi.UpdateThingsResponse = {
      mType: 'updateThings',
      data: {
        things: []
      }
    };

    // Recorded data
    // public records: ThingSpaceRecord[];
    public iFace: Face;
    public faces: Face[];

    public ready = false;

    // Default/Initial; status
    public status: Status = {
        serverStatus: {cncStatus: 0, systemStatus: 0},
        onlineStatus: false,
        mode: 0,
        cncFile: '',
        jsonFile: '',
        trajReachable: false,
        message: '',
        trajReady: false,
        manTrajsOn: false,
        skin: 1,
        face: 'Male',
        selectedSkin: 'Female',
        skins: ['Female', 'Male', 'Adaptive']
    };

    public cfg: ConfigWS = {
        wsServer: '-',
        wsIP: '-',
        wsPort: '-',
        detectServer: false,
        valid: false
    };

    public cfgDashboard: ConfigDashboard = {
        numberColumns: 4,
        initSkin: 'Female'
    };

    constructor (protected service: GatewayService) {

        // this.records = new Array();
        this.faces = new Array();

        service.emitorOnlineStatus$.subscribe( w => {
            this.status.onlineStatus = w;

            if (this.status.onlineStatus) {
                this.connected();
            } else {

            }
        });

        service.emitorMessage$.subscribe( w => {
           this.parseIncomingMsg(w);
        });

        service.emitorWsOegw$.subscribe( w => {
            this.cfg = w;

            // this.cfg.wsServer = window.location.origin;
            // window.alert('IP:' + this.cfg.wsServer);
        });

        service.emitorConfigDashboard$.subscribe( w => {
            this.cfgDashboard = w;

            // Set init skin
            if (this.cfgDashboard.initSkin === 'female' || this.cfgDashboard.initSkin === 'Female') {
                this.status.selectedSkin = 'Female';
            } else if (this.cfgDashboard.initSkin === 'male' || this.cfgDashboard.initSkin === 'Male') {
                this.status.selectedSkin = 'Male';
            } else if (this.cfgDashboard.initSkin === 'adaptive' || this.cfgDashboard.initSkin === 'Adaptive') {
                this.status.selectedSkin = 'Adaptive';
            }
        });

        service.emitorThingSpace$.subscribe( w => {
            this.thingSpace = w;
            this.newMsg();
        });

        // Set init state as control
        this.status.mode = 0;

        setTimeout(() => {
            this.ready = true;
        }, 500);

    }

    public isReady() {
        return this.ready;
    }

    private connected () {

        // this.records.length = 0;
    }
/*
    protected composition(): void {
        if (this.records.length > this.MAX_RECORDS) {
            this.records = this.records.splice(0, this.MAX_RECORDS - this.DW_RECORDS);
        }
    }
*/
    protected newMsg() {
        window.alert('Num faces:' + this.thingSpace.mType);
    }

    private parseIncomingMsg (json: any) {

     // window.alert('MSG' + JSON.stringify(json));
      try {
        if (json.mType) {
            if (json.mType === 'updateThings') {
                this.thingStatus = json as oegwApi.UpdateThingsResponse;
                this.faceRecognition();

               // window.alert('tgs: ' + this.thingStatus.data.things.length + ' 1: ' + this.thingStatus.data.things[0].atype);

                /*
                const t: number = Date.now();
                this.composition();
                this.records[this.records.length] = {time: t, point: this.thingSpace};

                this.faceRecognition();
                */
            }
          }
        } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ',
                    json);
                return;
        }

        /*  OLD ONE
        try {
            if (json.mType) {
                if (json.mType === 'thingSpace') {
                    this.thingSpace = json as oegwThings.ThingSpace;

                    const t: number = Date.now();
                    this.composition();
                    this.records[this.records.length] = {time: t, point: this.thingSpace};

                   this.faceRecognition();
                }
            }
         } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ',
                    json);
                return;
         }
         */
    }

    // fit: false - name is contained in full name of thing, true: name is exact name of things
    public getThing (name: string, fit: boolean): Thing {

      // const fc: Face = this.thingSpace.data.faceRecognition[nThing].faces[face];

      let th: Thing = null;

      for (const item of this.thingStatus.data.things) {

        if (fit) {
          if (item.name === name) {
            th = item;
            return th;
          }
        } else {

          if (item.name.search(name) !== -1) {
            th = item;
            return th;
          }
        }
      }

      return th;
    }

    /*
    * Returns face
    */
    public getFace(nThing: number, face: number): Face {

        if (this.thingSpace.data.faceRecognition.length <= 0) {
            return null;
        }
        if (nThing < 0 || nThing >= this.thingSpace.data.faceRecognition.length) {
            return null;
        }

        if (this.thingSpace.data.faceRecognition[nThing].faces.length <= 0) {

            return null;
        }

        if (face < 0 || face >= this.thingSpace.data.faceRecognition[nThing].faces.length) {
            return null;
        }

        const fc: Face = this.thingSpace.data.faceRecognition[nThing].faces[face];

       // window.alert('fff: ' + fc.maleProb);

        return fc;
    }

    public faceRecognition() {

      let nFaces = 0;

      const th: Thing = this.getThing ('faceRecog/faces/number', false);

      if (th != null) {

        nFaces = th.value;
      }

     // if (this.faces.length !== nFaces) {
        this.faces.length = 0;

     // }

      for (let i = 1; i <= nFaces; i ++) {

        const face: Face = {
          label: 0,
          maleProb: 0,
          age: 0,
          confidence: 0,
          location: {
            x: 0,
            y: 0,
            z: 0
          },
          headPose: {
            r: 0,
            p: 0,
            y: 0
          }
        };

        const nameBase = 'faceRecog/faces/face' + i;

        const thAge: Thing = this.getThing (nameBase + '/age', false);
        const thConfidence: Thing = this.getThing (nameBase + '/confidence', false);
        const thLabel: Thing = this.getThing (nameBase + '/age', false);
        const thMaleProb: Thing = this.getThing (nameBase + '/maleProb', false);

        if (thAge !== null) {
          face.age = thAge.value;
        }

        if (thConfidence !== null) {
          face.confidence = thConfidence.value;
        }

        if (thLabel !== null) {
          face.label = thLabel.value;
        }

        if (thMaleProb !== null) {
          face.maleProb = thMaleProb.value;
        }

        this.faces.push(face);

        /*
        /myHouse/faceRecog/faces/face1/age :   20
        /myHouse/faceRecog/faces/face1/confidence :   1
        /myHouse/faceRecog/faces/face1/headPose/p :   0
        /myHouse/faceRecog/faces/face1/headPose/r :   0
        /myHouse/faceRecog/faces/face1/headPose/v :   0
        /myHouse/faceRecog/faces/face1/label :   1
        /myHouse/faceRecog/faces/face1/location/h :   0
        /myHouse/faceRecog/faces/face1/location/w :   0
        /myHouse/faceRecog/faces/face1/location/x :   0
        /myHouse/faceRecog/faces/face1/location/y :   0
        /myHouse/faceRecog/faces/face1/maleProb :   0.9
        /myHouse/faceRecog/faces/face2/age :   0
        */

      }
    }

    /*
    public faceRecognition() {

        const fc: Face = this.getFace(0, 0);
        if (fc !== null) {
            if (fc.maleProb > 0.8) {
                this.status.skin = 0;
                this.status.face = 'Male';
            } else {
                this.status.skin = 1;
                this.status.face = 'Female';
            }
        }
    }
    */

    public getSkin(): string {

        // Return by recognized face
        if (this.status.selectedSkin === 'Adaptive') {

            return this.status.face;
        }

        // Return preferred skin
        return this.status.selectedSkin;
    }

}


