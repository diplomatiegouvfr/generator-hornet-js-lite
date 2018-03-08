<%= appname %> <%= appversion %>
===============


# Prérequis

* NodeJS 6.X
* hornet-js-builder installé en global:


    $ npm install -g hornet-js-builder

* checkout du projet `<%= slugify(appname) %>`

# Initialisation

Se positionner dans le répertoire du projet `<%= slugify(appname) %>` et lancer la commande:

    $ hb install

# Démarrage de l'application en mode développement

## Commande par défaut

la commande à exécuter en mode développement est la suivante:

    $ hb w

Elle permet de lancer l'application en mode `watcher` afin que les modifications soient prises en compte (ce qui
entrainera un redémarrage du serveur node dans le cas d'une détection de modification).

## Options

Il est également possible d'ajouter à cette commande l'option:

    $ hb w -i

Cette commande indique au builder de ne pas transpiler les fichiers typescript en javascript.
Elle est à utiliser dans le cas où l'IDE a été configuré de telle sorte que la transpilation ts->js
se fasse via ce dernier.


# Vérification

Vous pouvez accéder à l'application depuis l'url [http://localhost:8888/<%= slugify(appname) %>/](http://localhost:8888/<%= slugify(appname) %>)

# Fichier de configuration de l'application : default.json

L'ensemble de la configuration applicative du serveur NodeJS se situe dans le fichier default.json contenu dans les sources de l'application.

Ce fichier ne doit pas être modifié, excepté pour le log console. Les modifications sont à apporter dans les fichiers d'infrastructure.

## Partie applicative

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|contextPath| Contexte de l'application déployée|Par défaut vide|
|welcomePage|Page de démarrage de l'application|Passé en paramètre du ServerConfiguration|
|themeUrl|Url du thème CSS|[Protocol]://[host]:[port]/hornet/themeName|

```javascript
{
  "contextPath": "<%= slugify(appname) %>",
  "welcomePage": "/accueil",
  ...<
}

```


## Partie serveur

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|route|Route identifiée pour l'affinité de session nodejs|js1|
|port|Port de démarrage du serveur|8888|
|keepAlive|Activation du mode HTTP KeepAlive|true|
|maxConnections|Nombre maximal de connexions à l'instance nodejs|100|
|timeout|Timeout des réponses HTTP|300000|
|uploadFileSize|Taille maximale d'upload de fichier|1000000|
|sessionTimeout|Timeout des sessions utilisateur|1800000|

```javascript
  "server": {
    "route": "js1",
    "port": 8888,
    "keepAlive": true,
    "maxConnections": 100,
    "timeout": 300000,
    "uploadFileSize": 1000000,
    "sessionTimeout": 1800000
  }
```

## Partie Cookie

Cette partie contient l'ensemble du paramétrage spécifique aux exécutions réalisées coté serveur, ainsi que ses spécificités de démarrage.

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|domain|Domaine du cookie|null|
|path|Path du cookie|null|
|httpOnly|Activation du mode HTTP KeepAlive|true|
|secure|Sécurisation du cookie|true|
|alwaysSetCookie|Ajout du cookie dans le Header|false|

```javascript
  "cookie": {
    //"domain": null,
    //"path": null,
    "httpOnly": true,
    "secure": false
    //"alwaysSetCookie": false
  }
```


## Configuration de la sécurité

Ce bloc contient l'ensemble des paramètres destinés à la configuration de helmet.

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation de la sécurité| true |
|hpp|HTTP Parameter Pollution attacks| true |
|ienoopen|Middleware for IE security. Set X-Download-Options to noopen| true |
|noSniff|Keep clients from sniffing the MIME type| true |
|csp.enabled|Activation de CSP (Content Security Policy)| true |
|csp.defaultSrc|Nom de domaine par défaut des différentes ressources du site| ["'self'", {hostname}] |
|csp.scriptSrc|Nom de domaine des différentes ressources de scripts du site| ["'self'", "'unsafe-inline'", "'unsafe-eval'"]|
|csp.styleSrc|Nom de domaine des différentes ressources de css du site | ["'self'", {hostname}]|
|csp.fontSrc|Nom de domaine des différentes ressources de fonts du site| ["'self'", {hostname}]|
|csp.imgSrc|Nom de domaine des différentes ressources images du site | ["'self'", {hostname}]|
|csp.reportOnly|Si valorisé à true, génération d'un rapport d'erreur uniquement|false|
|csp.setAllHeaders|Valorisé à true si tous les headers doivent être remplis|false|
|csp.disableAndroid|Permet de désactiver la navigation via Android|false|
|csp.safari5|Permet de désactiver la navigation via safari5|false|
|xss.enabled|Activation de la protection contre les failles XSS|true|
|xss.setOnOldIE|Force le header X-XSS-Protection sur les anciens IE|true|
|hpkp.enabled|Activation du Public Key Pinning: HPKP, HTTPS certificates can be forged, allowing man-in-the middle attacks|bool|true|
|hpkp.maxAge|Durée de validité|7776000000|
|hpkp.sha256s|Liste des sha au format 256|["AbCdEf123=","ZyXwVu456="]|
|hpkp.includeSubdomains|Inclusion des sous domaines|true|
|hpkp.reportUri|URL de rapport|vide|
|hsts.enabled|Activation du HTTP Strict Transport Security: hsts|false|
|hsts.maxAge|Durée de validité|7776000000|
|hsts.includeSubdomains|Inclusion des sous domaines|true|
|hsts.preload|Activation du preload dans le header HSTS|false|
|csrf.enabled|Activation du mode CSRF : Cross-Site Request Forgery|true|
|csr.>maxTokensPerSession|Nombre de tokens par session|10|


```javascript
"security": {
    "enabled": true,
    "hpp": true,
    "ienoopen": true,
    "noSniff": true,
    "csp": {
      "enabled": true,
      "defaultSrc": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'"
      ],
      "scriptSrc": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'"
      ],
      "styleSrc":[
        "'self'",
        "[Protocol]://[host]:[port]",
        "'unsafe-inline'"
      ],
      "fontSrc":[
        "'self'",
        "[Protocol]://[host]:[port]"
      ],
      "imgSrc":[
        "'self'",
        "[Protocol]://[host]:[port]"
      ],
      "reportOnly": false,
      "setAllHeaders": false,
      "disableAndroid": false,
      "safari5": false
    },
    "frameguard": {
      "enabled": true,
      "mode": "deny",
      "allowFromPattern": ""
    },
    "xss": {
      "enabled": true,
      "setOnOldIE": true
    },
    "hpkp": {
      "enabled": true,
      "maxAge": 7776000000,
      "sha256s": [
        "AbCdEf123=",
        "ZyXwVu456="
      ],
      "includeSubdomains": true,
      "reportUri": null
    },
    "hsts": {
      "enabled": false,
      "maxAge": 10886400000,
      "includeSubdomains": true,
      "preload": false
    },
    "csrf": {
      "enabled": true,
      "maxTokensPerSession": 10
    }
  }
```

## Configuration des logs : log4js.json

### Appender console

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|type|Type d'appender|*console* Affiche des logs dans la console |console|
|layout.type| Type d'affichage des messages|pattern|
|layout.pattern| Schéma d'affichage des messages,  %[...] permet d'afficher les couleurs dans la console.|"%[%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m%]"|


Ex: type console

```json
{
   "appenders": {
      "console": {
        "type": "console",
        "layout": {
          "type": "pattern",
          "pattern": "%[%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m%]"
        }
      }
  }
}
```

### Appender dateFile

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|type|Type d'appender|*dateFile* permet d'avoir un rolling avec un fichier contenant la date|dateFile|
|pattern| Présent pour les types *dateFile* <br />Permet de donner un pattern de date qui sera ajouté au nom du fichier.|-yyyy-MM-dd|
|filename| Chemin absolu ou relatif au lancement du fichier de log | /var/log/nodejs/#{INSTANCE_NAME}/#{INSTANCE_NAME}.log |
|layout.type| Type d'affichage des messages|pattern|
|layout.pattern| Schéma d'affichage des messages |"%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m"|
|compress| Compression gzip lors du rotate |true|
|keepFileExt| Permet de garder le pattern de log d'origine, monappli-20171212.log.gz |true|


```json
{
   "appenders": {
      "dateFile": {
         "type": "dateFile",
         "pattern": ".yyyy-MM-dd",
         "filename":"/var/log/nodejs/#{INSTANCE_NAME}/#{INSTANCE_NAME}.log",
         "layout": {
            "type": "pattern",
            "pattern": "%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m"
         },
         "compress": true,
         "keepFileExt": true
      }
   }
}
```

### Categories

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|default|Nom d'une categorie d'appender|default|
|appenders|Liste des appenders utilisés |"dateFile", "console"|
|level|Level des appenders |INFO|

```json
{
   "categories": {
      "default": { "appenders": ["dateFile", "console"], "level": "INFO" }
   }
}
```
## Configuration des logs client

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|remote|Activation des remotes log|false|
|level|Niveau de log|INFO|

```javascript
  "logClient": {
    "remote": false,
    "level": "TRACE",
    ...
```

## Déclaration des appenders

Type BrowserConsole :


| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|type|Type d'appender|BrowserConsole|
|layout.type| Type d'affichage des messages|THIN/BASIC/pattern/...|
|layout.pattern| Schéma d'affichage des messages |"%p|%c|%m%"|

```json
"appenders": {
    "BrowserConsole" : {
        "type": "BrowserConsole",
        "layout": {
          "type": "THIN"
        }
    }
}
```

Type Ajax :

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|type|Type d'appender|Ajax|
|layout.type| Type d'affichage des messages|THIN/BASIC/pattern/...|
|layout.pattern| Schéma d'affichage des messages |"%p|%c|%m%"|
|threshold|Seuil d'envoi des messages de log|100|
|timeout|Timeout d'envoie des messages|3000|
|url|URL d'envoi des logs|/logs|

```json
"appenders": {
    "Ajax": {
        "type": "Ajax",
        "layout": {
          "type": "BASIC"
        },
        "threshold": 100,
        "timeout": 3000,
        "url": "/log"
    }
}
```

## Configuration des services


| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|services.host| URL de déploiement du module <%= slugify(appname) %>-service| [Protocol]://[host]:[port] |
|services.name| Nom de déploiement des services|<%= slugify(appname) %>|

```javascript
"mock": {
    "enabled": true,
    "host": "127.0.0.1", //default localhost
    "routes": "/mock/routes"
  }
```

## Mode mock

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du mode mock(bouchon) de l'application|false|
|host|Hôte local du mock|localhost|
|routes|Chemin vers le fichier de routes mocké sans le /src |/mock/routes|

```javascript
  "mock": {
    "enabled": true,
    "host": "127.0.0.1", //default localhost
    "routes": "/mock/routes"
  }
```

## Mode fullSPA

NOTE : Le mode fullSPA n'est pas encore complètement supporté par hornet, la configuration est présente à titre d'information

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du mode fullSPA|false|
|host|Host du mode fullSPA|""|
|name|Nom du service pour le mode fullSPA|/services|

```javascript
"fullSpa": {
    "enabled": false,
    "host": "",
    "name": "/services"
  }
```

## Configuration de l'authentification

Note : Il ne s'agit pas d'une configuration à proprement parler de Hornet mais uniquement viable dans l'application <%= appname %>

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|loginUrl|Url de connexion à l'application|/login|
|logoutUrl|Url de déconnexion de l'application|/logout|

```javascript
  "authentication": {
    "loginUrl": "/login",
    "logoutUrl": "/logout"
  }
```

## Configuration du Cache

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du cache sur les requêtes de services|true|
|timetolive|Durée de rétention du cache|60|

```javascript
"cache": {
    "enabled": true,
    "timetolive": 60
  }
```

## Configuration de la database

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|config|Nom de la base de données avec sa configuration ||
|uri|Chaine de connexion à une bdd [sgbd]://[user]@[host]:[ports]/[name]||
|options|options nécessaires ou facultatives pour le sgbd||
|omitNull| indique si ont doit prendre ou non les valeurs null lors d'une modification||
|timestamps| indique si les colonnes createAt et updateAt doivent être présentes ||

```javascript
 "database": {
        "config": {
          "uri": "postgres://hornetJS@localhost:5433/appli",
          "options" : {
            "pool" : {
              "max" : 5,
              "min" : 0,
              "idle" : 1000
            },
            "define": {
              "timestamps" : false
            },
            "omitNull" : false
          }
        }
      }

```

## Configuration des mails

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|config|Object de configuration pour nodeMailer|https://nodemailer.com/smtp/|
|mailRecever|Mail servant de destinataire à l'envoi de mail||

```javascript
"mail": {
    "config": {
      "host": "127.0.0.1",
      "port": 25,
      "secure": false,
      "connectionTimeout": 20000,
      "tls": {
        "rejectUnauthorized": false
      },
      "auth": {
        "user": "user",
        "pass": "pass"
      }
    }

  }
```