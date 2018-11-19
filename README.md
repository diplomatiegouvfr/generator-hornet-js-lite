# generator-hornet-js-lite

## Description

Le module Node « generator-hornet-js-lite » contient les éléments de création d'une application Hornet JS Lite. Il est utilisable avec Yeoman.

## Pré-requis

* NodeJS 8.X
* hornet-js-builder >1.6.0 installé en global:

```shell
    $ npm install -g hornet-js-builder
```

## Utilisation

### Yeoman

[Yeoman](http://yeoman.io/) est un outil permettant de construire des outils de génération de projets. Celui-ci s'appuie sur plusieurs composants dont Yo qui s'occupe plus spécifiquement de l'aspect génération.

Hornet JS propose un générateur d'application basé sur Yo.

Pour installer Yeoman, exécuter la ligne de commande suivante :

```shell
$ npm install -g yo
```

### Installation du générateur

```shell
$ npm install -g generator-hornet-js-lite
```

### Initialisation d'un projet

Tout d'abord, il vous faut créer un dossier pour accueillir votre nouveau projet : 

```shell
$ mkdir nom_de_l_application
$ cd nom_de_l_application
```

Dans le répertoire destiné à accueillir le code de l'application, exécuter la ligne de commande suivante pour débuter la génération d'un nouveau projet basé sur `hornet.js` :

```shell
$ yo hornet-js-lite
```

Le générateur va vous demander plusieurs informations nécessaires à l'initialisation de votre projet Hornet JS :

* ` Nom de votre projet: (nom_de_l_application) ` : par défaut, le nom du répertoire est suggéré comme nom technique du projet
* ` Version de votre projet:` `(1.0.0)` : version du projet (`1.0.0` par défaut).
* ` Description de votre projet ` : un texte court présentant succintement le projet.
* ` Version du framework (hornet-js):` `(5.x.x)` : version du framework hornet-js (`5.x.x` par défaut identique à generator-hornet-js).
* ` Theme de l'application, ex : hornet-themes-intranet (hornet-themes-intranet) ` : theme sous forme de projet et dépendance
* ` Version du theme de l'application (5.x.x)` : version du projet theme

Le processus d'initialisation vous indique ensuite les fichiers créés :


### Options avancées

#### Paramètre nom du projet

Il est possible de fournir directement le nom du projet à la ligne de commande :

```shell
$ yo hornet-js-lite nom_de_l_application
```
Dans ce cas, la première question n'est pas posée et la valeur passée en paramètre est utilisée.

### Actions post-génération

#### Récupération des dépendances

Une fois le projet initialisé, vous devez lancer l'installation des dépendances Node.js avec la commande suivante :

```shell
$ hb install
```

#### Configuration

Si vous souhaitez modifier la configuration de l'application, vous pouvez éditer le fichier suivant :

* `config\default.json`

#### Démarrage de l'application

Pour exécuter votre nouvelle application, utilisez la commande suivante :

```shell
$ hb w
```

Puis, utiliser un navigateur web pour y accéder par l'url [http://localhost:8888/nom_de_l_application](http://localhost:8888/nom_de_l_application).


## Licence

`generator-hornet-js-lite` est sous [licence cecill 2.1](./LICENSE.md).

Site web : [http://www.cecill.info](http://www.cecill.info/licences/Licence_CeCILL_V2.1-en.html)