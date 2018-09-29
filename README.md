# gateway-dashboard
Nice dashboard for OpenEdgeGateway.

# Prerequisites

1. **npm & node.js**
How to install is here: https://nodejs.org/en/

2. **Angular cli** https://github.com/angular/angular-cli

* Latest recommended version for build is 1.4.3., install it this way:
```
npm uninstall -g @angular/cli
npm cache verify
npm install -g @angular/cli
```

# Setup gateway-dashboard on your machine

1. Pull this repository
2. Open terminal/command line and go to main folder.
3. Run command

```
npm install
```

# Run

### A. With Angular
1.  Open terminal/command line in main folder.
2. Run server
```
ng serve
```
3. Open browser **http://localhost:4200/**

### B. With https://www.npmjs.com/package/local-web-server
```
$ npm install -g local-web-server
$ cd <your-app-folder>
$ ws
```
or with port specification
```
$ ws -p 8181
```
