# Anura   <img src="https://raw.githubusercontent.com/AnuraConfig/anura-server/master/public/favicon.ico" width="48">


![Version](https://img.shields.io/badge/version-0.0.1-brightgreen.svg)

Anura is a configuration manager that help you and your team manage your configuration across multiple service and multiple environment with a simple and easy UI backed with real time update system and custom configuration db.

### Installation

Anura requires [Node.js](https://nodejs.org/) to run 
Install the dependencies and build the anura

```sh
$ cd anura-server
$ npm install
$ npm run build 
$ npm run prod
```

### Environment Veribles

Anura Server dosen't have configuration for now but you can change some options using environment veribles specified below.

| Verible | Info | Type| Default |
| ------ | ------ | ------ | ------ |
| STORE_LOCATION | Where to save the config data| Path | ``/`` | 
| HUMAN_READABLE | Is the config data will save in human readable format| ``true``/``false``  |``false`` |
|SERVER_PORT| the port of the config server (and it's ui) | number | ``4000``|


### Development


#### Todos

 - Add more data store options (like elastic and redis)
 - Make option to scale out (multi service fun)
 - Improve and fix ui
 - Make Anura easier to setup 

License
----

MIT


**Free Software, Hell Yeah!**



Icon made by [Freepik](https://www.freepik.com/) from [www.flaticon.com](https://www.flaticon.com/)

