
import { Injectable, EventEmitter } from '@angular/core';
import { GatewayService } from './gateway.service';
// import { ISTLFacets, StlService } from '../webgl/stl.service';
import { Observable } from 'rxjs/Rx';
import * as iqrfApi from './iqrf-api';
import * as oegwApi from './oegw-api';
import * as oegwThings from './oegw-things';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

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

/* hold information transmitted by websocket*/
@Injectable()
export class GatewayModel  {

    readonly MAX_RECORDS: number = 10000;
    readonly DW_RECORDS: number = 5000;

    // oegw API
    public thingSpace: oegwThings.ThingSpace = {
        mType: 'thingSpace',
        data: {
            binaryOutput: [],
            faceRecognition: [],
            thermometer: []
        }
    };

    // Recorded data
    public records: ThingSpaceRecord[];
    public iFace: Face;

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

        this.records = new Array();

        service.emitorOnlineStatus$.subscribe( w => {
            this.status.onlineStatus = w;

            if (this.status.onlineStatus) {
                this.connected();
            } else {
                // this.disconnected();
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

        this.records.length = 0;
    }

    protected composition(): void {
        if (this.records.length > this.MAX_RECORDS) {
            this.records = this.records.splice(0, this.MAX_RECORDS - this.DW_RECORDS);
        }
    }

    protected newMsg() {
        window.alert('Num faces:' + this.thingSpace.mType);
    }

    private parseIncomingMsg (json: any) {

        try {
            if (json.mType) {
                if (json.mType === 'thingSpace') {
                    this.thingSpace = json as oegwThings.ThingSpace;

                    // window.alert(JSON.stringify(json));
                    //window.alert('Num faces 2:' + this.thingSpace.data.thermometer[0].temperature);

                    const t: number = Date.now();
                    this.composition();
                    this.records[this.records.length] = {time: t, point: this.thingSpace};

                   // this.nt = this.getNumberThings();

                   this.faceRecognition();
                   

                }
            }
         } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ',
                    json);
                return;
            }
    }
/*
    public getNumberThings (): number {

        const nTemp = this.thingSpace.data.thermometer.length;
        const nBin = this.thingSpace.data.binaryOutput.length;
        const nFaces = this.thingSpace.data.faceRecognition.length;

        return nTemp + nBin + nFaces;

    }
*/


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
       //window.alert('A: ' + nThing + '  ln: ' + this.thingSpace.data.faceRecognition.length);  
        if (this.thingSpace.data.faceRecognition[nThing].faces.length <= 0) {
             
            return null;
        }        
 //window.alert('fl: ' + this.thingSpace.data.faceRecognition[nThing].face.length); 

        if (face < 0 || face >= this.thingSpace.data.faceRecognition[nThing].faces.length) {
            return null;
        }

        const fc: Face = this.thingSpace.data.faceRecognition[nThing].faces[face];    

       // window.alert('fff: ' + fc.maleProb);  

        return fc;
    }
/*
    public getSkin(): CssStylesTiles {
        if (this.status.skin === 0) return this.maleSkin;
        else if (this.status.skin === 1) return this.femaleSkin;
        else return this.maleSkin;
    }
*/
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

    public getSkin(): string {

        // Return by recognized face
        if (this.status.selectedSkin === 'Adaptive') {

            return this.status.face;
        }

        // Return preferred skin    
        return this.status.selectedSkin;        
    }
    
}


