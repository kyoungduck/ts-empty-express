## ts-empty-express

This project is simple typescript code for setting new project.

This project use the typescript and transpile with "ts-node" module. Also it use the wepack bundler.



### Install

This is install node dependency code. I recommend use 'yarn' because I use it when I make this project.

`npm install`

or

`yarn install`



### Implement your service

If you finish install dependency, you can start implement your service. Entry code file is in 'src/index.ts'. And webpack output file is in 'build/' directory.

#### command

###### Build Project

`yarn build`

This export optimized JavaScript bundle and it builds as production environment.

###### Build Development mode

`yarn build-dev`

This build the project as development environment.

###### Run code which was built

`yarn start`

###### Build & Run your code

`yarn watch`

This command watching your typescript code. So if you change the ts code, it build and run automatically. It builds and run as development mode.

###### Build & Run your code as production mode

`yarn watch-prod`

This command is same as `yarn watch` but it runs as production mode.

