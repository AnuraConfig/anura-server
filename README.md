# Anura   <img src="https://raw.githubusercontent.com/AnuraConfig/anura-server/master/public/favicon.ico" width="48">


[![Version](https://badge.fury.io/js/anura-server.svg)](https://badge.fury.io/js/anura-server)   [![CodeFactor](https://www.codefactor.io/repository/github/anuraconfig/anura-server/badge)](https://www.codefactor.io/repository/github/anuraconfig/anura-server)

Anura is a configuration manager that helps you and your team with managing your configuration across multiple services and multiple environments with a simple UI backed with real-time update system and custom configuration database with options to use external ones as well.

Feel free to fork and make contributions. We'll try to get them into the main application.

### Installation 

Anura requires [Node.js](https://nodejs.org/) to run  
Anura is available as an npm package for easy installation. [Anura On NPM](https://www.npmjs.com/package/anura-server)

```sh
$ npm install anura-server -g 
$ anura start
```

after these commands, Anura will start-up in port ``4000`` by default.

###  Configuration

After installing Anura, A new directory will be created in the ``/var/local`` folder in Linux or in ``%AppData%`` folder on windows. The installation will create an initial folder with a ``config.yaml`` file. You can also add a ``config_file`` argument in the ``anura start`` script

| Verible | Info | Type| Default |
| ------ | ------ | ------ | ------ |
| STORE_LOCATION | Where to save the config data| Path |  ``/var/local/Anura`` \|``$appdata%\Anura`` | 
| HUMAN_READABLE | Save the config data in a human readable format| ``true``/``false``  |``false`` |
| SERVER_PORT | The port of the config server (and it's ui) | number | ``4000``|


### Development


#### Todos in the near future

 - ~~Make Anura easier to setup.~~
 - Add more external data store options. (like mongo and redis)
 - Make an option to scale out. (multi-service is fun)
 - Improve UI usability.

License
----

MIT

Icon made by [Freepik](https://www.freepik.com/) from [www.flaticon.com](https://www.flaticon.com/)

