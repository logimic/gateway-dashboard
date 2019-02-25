import { Injectable, EventEmitter } from '@angular/core';
import { ServerStatus, ConfigWS } from './gateway.model';
import { Http } from '@angular/http';
import * as oegwThings from './oegw-things';
import * as dashboardCfg from './dashboard-cfg';


@Injectable()
export class GatewayService {

    public hostname = '';
    private timerConnect;
    // Oegw config...
    public wsOegw: ConfigWS = {
        wsServer: '',
        wsIP: '',
        wsPort: '',
        detectServer: false,
        valid: false
    };

    public cfgDashboard: dashboardCfg.DashboardConfigSchema100 = {
        numberColumns: 3,
        numberRows: 3,
        initSkin: 'Female',
        disableNames: [
          'aaa',
          'ssss'
        ]
    };

    private connection: WebSocket = null;
    // public emitorMachineStatus$: EventEmitter<ServerStatus> = new EventEmitter();
    public emitorOnlineStatus$: EventEmitter<boolean> = new EventEmitter();
    // public emitorMessage2$: EventEmitter<String> = new EventEmitter();
    public emitorMessage$: EventEmitter<any> = new EventEmitter();
    public emitorWsOegw$: EventEmitter<ConfigWS> = new EventEmitter();
    public emitorConfigDashboard$: EventEmitter<dashboardCfg.DashboardConfigSchema100> = new EventEmitter();
    public emitorThingSpace$: EventEmitter<oegwThings.ThingSpace> = new EventEmitter();

    constructor(protected http: Http) {

        // Get local IP...
        this.hostname = window.location.hostname;

        this.loadConfig();
        this.loadConfigDashboard();
        this.connectionTimer(2000);
    }


    loadConfig() {
        const path = './assets/cfg/oegwServerConfig.json';
        this.http.get(path).subscribe(data => {
            this.wsOegw.wsIP = data.json().wsIP;
            this.wsOegw.wsPort = data.json().wsPort;
            this.wsOegw.detectServer = data.json().detectServer;
            this.wsOegw.valid = true;

            if (this.wsOegw.detectServer) {
              this.wsOegw.wsServer = 'ws://' + this.hostname + ':' + this.wsOegw.wsPort;
            } else {
                this.wsOegw.wsServer = 'ws://' + this.wsOegw.wsIP + ':1341';
            }

            this.emitorWsOegw$.emit(this.wsOegw);
        });
    }

    loadConfigDashboard() {
        const path = './assets/cfg/dashboardConfig.json';
        this.http.get(path).subscribe(data => {
          this.cfgDashboard = data.json();
          this.emitorConfigDashboard$.emit(this.cfgDashboard);
        });
    }

    private connectionTimer(step: number) {
        // LOaded adresses
        if (this.wsOegw.valid) {

            if (this.connection == null) {
                this.open();

            } else {
                window.clearTimeout(this.timerConnect);
                return;
            }
        }

        window.clearTimeout(this.timerConnect);
        this.timerConnect = window.setTimeout(() => this.connectionTimer(step), step);
    }

    open(): boolean {

        if (this.connection == null) {
            this.connection = new WebSocket(this.wsOegw.wsServer);
        }

        const self = this;

        this.connection.onopen = (evnt: any) => {
            self.emitorOnlineStatus$.emit(true);
        };

        this.connection.onerror = (evnt: any) => {
            self.emitorOnlineStatus$.emit(false);
        };

        this.connection.onclose = (evnt: any) => {
            self.emitorOnlineStatus$.emit(false);
            this.connection.close();
            this.connection = null;
            this.connectionTimer(2000);
        };

        this.connection.onmessage = (message: any) => {
            this.receivedMessage(message);
        };

        return true;
    }

    /*
    *
    * This sends message to gateway.
    */
   public sendMessage(msg: string) {

    }
   /*
    *
    * This recieves message from gateway.
    */
   public receivedMessage(msg: any) {

        const self = this;

        let msgStr = '';

        try {
            const mm = JSON.parse(msg.data);
            msgStr = msg.data;

            self.emitorMessage$.emit(mm);

        }catch (e) {
            msgStr = '' + msg.data;
        }
    }

}
