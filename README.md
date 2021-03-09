# MEANS Course project, done by Phpminor(derelict-drone)
# MeanCourse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## Development server
Make sure to edit connection_config, both the .js(backend) and .ts(frontend) files in accordance to your use case. (currently it comes with my own configs, which will most likely not work for you)

Run `ng serve` for an angular dev server. Navigate to `http://localhost:25565/`. The app will automatically reload if you change any of the source files.

Run `npm run start:server` to run the node server with NodeMon.

## Generating Apidocs
Run `npm run makedoc-backend` to compile documentation comments in the backend folder, and output them to root/doc/backend

Run `npm run makedoc-src` to compile documentation comments in the src folder, and output them to root/doc/src

Up-to-date apidocs are hosted at https://www.mechanicum.duckdns.org/docs/backend/index.html

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
