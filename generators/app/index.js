"use strict";
var fs = require("fs");
var path = require("path");
var Generator = require('yeoman-generator');
var crypto = require("crypto");
var slugify = require("slugify");
var isstring = require("lodash.isstring");
var yosay = require("yosay");

module.exports = Generator.extend({
    constructor: function () {
        Generator.apply(this, arguments);
        this.log(yosay("starting"));

        var pkg = require("../../package.json");
        this.fmkversion = pkg.version;

        this.argument("appname", {type: String, required: false});
        this.argument("appversion", {type: String, required: false});
        this.argument("appdescription", {type: String, required: false});
        this.argument("fmkversion", {type: String, required: false});
    },
    prompting: function () {

        var pkg = require("../../package.json"),
            prompts = [],
            defaultAppName = path.basename(process.cwd());

        var prompts = [];
        var _this = this;

        prompts.push({
            when: function () { // si le nom n'est pas fourni en paramètre de la commande
                return !_this.options.appname;
            },
            type: "input",
            name: "appname",
            message: "Nom de votre projet",
            default: this.appname || defaultAppName // Par défaut le nom du dossier
        });
        prompts.push({
            when: function () {
                return !_this.options.appversion;
            },
            type: "input",
            name: "appversion",
            message: "Version de votre projet",
            default: "1.0.0"
        });
        prompts.push({
            when: function () {
                return !_this.options.appdescription;
            },
            type: "input",
            name: "appdescription",
            message: "Description de votre projet",
            default: this.appdescription || defaultAppName
        });
        prompts.push({
            when: function () {
                return !_this.options.fmkversion;
            },
            type: "input",
            name: "fmkversion",
            message: "Version du framework (hornet-js)",
            default: pkg.version
        });
        return this.prompt(prompts).then( function(answers) {

            if (!this.options.appname) {
                this._applyParam(answers, "appname", "appname");
            }else{
                this._applyOptions("appname", this.options.appname);
            }
            if (!this.options.appversion) {
                this._applyParam(answers, "appversion", "appversion");
            }else{
                this._applyOptions("appversion", this.options.appversion);
            }
            if (!this.options.appdescription) {
                this._applyParam(answers, "appdescription", "appdescription");
            }else{
                this._applyOptions("appdescription", this.options.appdescription);
            }
            if (!this.options.fmkversion) {
                this._applyParam(answers, "fmkversion", "fmkversion");
            }else{
                this._applyOptions("fmkversion", this.options.fmkversion);
            }
        }.bind(this));
    },
    writing: function () {
        var defaultConfig = {
            slugify: slugify,
            appname: this.appname,
            appversion: this.appversion,
            appdescription: this.appdescription,
            fmkversion: this.fmkversion,
        };

        //builder.js
        this._copy("builder.js", "builder.js", defaultConfig);

        this._copy("webpack.addons.config.js", "webpack.addons.config.js", defaultConfig);
        this._copy("karma.addons.config.js", "karma.addons.config.js", defaultConfig);

        //hbw.sh
        this._copy("hbw.sh", "hbw.sh", defaultConfig);

        //Jenkinsfile
        this._copy("Jenkinsfile", "Jenkinsfile", defaultConfig);

        //Jenkinsfile
        this._copy("trigger-rundeck.js", "trigger-rundeck.js", defaultConfig);

        //index.ts
        this._copy("index.ts", "index.ts", defaultConfig);

        // package.json
        this._copy("_package.json", "package.json", defaultConfig);

        // .gitignore
        this._copy("gitignore", ".gitignore", defaultConfig);

        // npmignore
        this._copy("npmignore", ".npmignore", defaultConfig);

        // plopfile
        this._copy("plopfile.js", "plopfile.js", defaultConfig);

        // tests.webpack
        this._copy("tests.webpack.js", "tests.webpack.js", defaultConfig);

        // config/*
        this._writingConfig(defaultConfig);

        // public
        // Attention, ne pas copier l"image unitairement, sinon le proccessing va la corrompre
        //this._copyDir("static/img/");
        this._writingStatic(defaultConfig);

        this._writingTemplate(defaultConfig);

        this._writingPlopTemplate(defaultConfig);

        // src
        this._writingSrc(defaultConfig);

        // test
        this._writingTest(defaultConfig);

        this._writingDatabase(defaultConfig);
        this._writingEnvironnement(defaultConfig)
    },
    _writingConfig: function (defaultConfig) {
        // config
        this._copy("config/**", "config/", defaultConfig);

        this._copy("tsconfig.json", "tsconfig.json", defaultConfig);

        // config/navigation.json
        this._copy("src/resources/**", "src/resources/", defaultConfig);

    },
    _writingDatabase: function (defaultConfig) {
        this._copy("database/**", "database/",defaultConfig );
    },
    _writingEnvironnement: function (defaultConfig) {
        this._copy("environment/**", "environment/",defaultConfig );
    },
    _writingStatic: function (defaultConfig) {
        this._copySingle("static/css/**", "static/css/");
        this._copySingle("static/img/**", "static/img/");
    },
    _writingTemplate: function (defaultConfig) {
        this._copy("template/**", "template/", defaultConfig);
    },
    _writingPlopTemplate: function (defaultConfig) {
        this._copy("plop-templates/**", "plop-templates/", defaultConfig);
    },
    _writingSrc: function (defaultConfig) {

        // actions
        //this._copy("src/actions/cnt/gen-cnt-actions.ts", defaultConfig);
        this._copy("src/actions/**", "src/actions/", defaultConfig);

        // dao
        this._copy("src/dao/**", "src/dao/", defaultConfig);

        // i18n
        this._copy("src/i18n/**", "src/i18n/", defaultConfig);

        // middleware
        this._copy("src/middleware/**", "src/middleware/", defaultConfig);

        // mock
        this._copy("src/mock/**", "src/mock/", defaultConfig);

        // models
        this._copy("src/models/**", "src/models/", defaultConfig);

        // routes
        this._copy("src/routes/**", "src/routes/", defaultConfig);

        // services
        this._copy("src/services/**", "src/services/", defaultConfig);

        // utils
        this._copy("src/utils/**", "src/utils/", defaultConfig);

        // views
        this._copy("src/views/**", "src/views/", defaultConfig);

        this._copySingle("src/views/**/*.jpg", "src/views/");

        // client/server/injector
        this._copy("src/client.ts", defaultConfig);
        this._copy("src/server.ts", defaultConfig);
        this._copy("src/injector-context-services-data.ts", defaultConfig);
        this._copy("src/injector-context-services-page.ts", defaultConfig);

        //README.md
        this._copy("README.md", defaultConfig);

        //LICENSE.md
        this._copy("LICENSE.md", defaultConfig);
    },

    _writingTest: function (defaultConfig) {
        // templates
        this._copy("test/template/**", "test/template/", defaultConfig);

        // karma test example
        this._copy("test/test.karma.tsx", defaultConfig);
    },

    _applyParam: function (answers, key, destkey) {
        var useDestKey = destkey || key;
        var answer = answers[key];
        if (!answer) {
            this.log(yosay("Aucune valeur pour : " + key));
        }
        this[useDestKey] = answer;
        this.config.set(useDestKey, answer);
    },
    _applyOptions: function (key, value) {
        this[key] = value;
        this.config.set(key, value);
    },
    /*
    _copyDir: function (path) {
        this.directory(path);
    },*/
    _copy: function (fromPath, toPath, config) {
        var copyFrom = fromPath, copyTo = toPath, conf = config;
        if (arguments.length === 1) {
            copyTo = copyFrom;
            conf = {};
        } else if (arguments.length === 2 && !isstring(config)) {
            copyTo = copyFrom;
            conf = toPath;
        }

        this.fs.copyTpl(
            this.templatePath(copyFrom),
            this.destinationPath(copyTo),
            conf,
            {},
            { globOptions: {ignore: "/**/*.jpg"} }
        );
    },
    _copySingle: function (fromPath, toPath) {
        var copyFrom = fromPath, copyTo = toPath;
        if (arguments.length === 1) {
            copyTo = copyFrom;
        }
        this.fs.copy(
            this.templatePath(copyFrom),
            this.destinationPath(copyTo)
        );
    },

    _random: function (length) {
        return crypto.randomBytes(length || 48).toString("hex");
    },

    install: function () {
        this.installDependencies({bower: false});
    }
});
