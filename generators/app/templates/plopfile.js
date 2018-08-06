const promptDirectory = require("inquirer-directory");
const promptFile = require("inquirer-file");
const  _ = require("lodash");

const isNotEmptyFor = ( name ) => {
  return ( value ) => {
    if ( _.isEmpty( value ) ) return name + " is required";
    return true;
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ensureSuffixe = ( suffixe,  capitalizeFirstL) => {
  return ( value ) => {
    let result = value;
    if(result && capitalizeFirstL) {
      result = capitalizeFirstLetter(result);
    }
    if ( result &&  !result.endsWith(suffixe)) return result + suffixe;
    return result;
  }
};

module.exports = function (plop) {
  plop.setPrompt("directory", promptDirectory);
  plop.setPrompt("file", promptFile);
  
  plop.setHelper("upperCase", (txt) => txt.toUpperCase());
  plop.setHelper("camelCase", (txt) => txt.replace(/\W+(.)/g, (match, chr) => {return chr.toUpperCase();}));
  plop.setHelper("snakeCase", (txt) => txt.replace(/([a-z]|[A-Z])([A-Z])/g, "$1-$2").replace(/([a-z]|[A-Z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase());
  plop.setHelper("packageCase", (txt) => txt.replace(/(\/|\\)/g, ".").toLowerCase().replace(/^([^\.])/g, ".$1").replace(/\.$/g, ""));
  plop.setHelper("unixPathCase", (txt) => txt.replace(/(\\)/g, "/").replace(/(\.[^\.]+)$/g, ""));
  // create your generators here
  /*plop.setGenerator("basics", {
    description: "this is a skeleton plopfile",
    prompts: [], // array of inquirer prompts
    actions: []  // array of actions
  });*/
  plop.setPartial('applicationName', require("./package.json").name);

  plop.setGenerator("add lazy route", {
    description: "ajout des différent composants pour une route de type page",
    prompts: [
      {
        type: "file",
        name: "mainroute",
        message: "fichier référencant les routes",
        basePath: "./src/routes",
        ext: ".ts"
      },
      {
        type: "directory",
        name: "repertoire",
        message: "répertoire cible de la route",
        basePath: "./src/routes"
      },
      {
        type: "input",
        name: "groupe",
        message: "répertoire intermédiaire à créer (sans / au début et à la fin)",
        basePath: "./src/routes"
      },
      {
        type: "input",
        name: "routeClass",
        message: "nom de la classe route",
        validate: isNotEmptyFor( "routeClass" ),
        filter: ensureSuffixe("Routes", true)
      },
      {
        type: "input",
        name: "url",
        message: "prefixe de l'url (sans / au début et à la fin)",
        validate: isNotEmptyFor( "url" )
      }
    ],
    actions: [{
      type: "add",
      path: "./src/routes/{{repertoire}}{{groupe}}/{{snakeCase routeClass}}.ts",
      templateFile: "plop-templates/route.hbs"
    }, {
      type: "modify",
      path: "./src/routes/{{mainroute}}",
      pattern: /(\s+}\s*})$/mg,
      template: "\nthis.addLazyRoutes(\"/{{url}}\", \"{{repertoire}}{{groupe}}/{{snakeCase routeClass}}\");\n$1"
    }]
  });
  plop.setGenerator("new page route", {
    description: "ajout des différent composants pour une route de type page",
    prompts: [
      {
        type: "file",
        name: "routeFile",
        message: "fichier contenant le déclaration de la route a créer",
        basePath: "./src/routes",
        ext: ".ts"
      },
      {
        type: "input",
        name: "url",
        message: "url de la route à créer(sans / au début et à la fin)"
      },
      {
        type: "list",
        name: "verb",
        message: "verbe http de la route à créer",
        default: "get",
        choices: [{name: "get", value: "get"}, {name: "post", value: "post"}, {name: "update", value: "update"}, {name: "put", value: "put"}, {name: "delete", value: "delete"}]
      },
      {
        type: "list",
        name: "role",
        message: "rôle d'accès à cette route",
        choices: [{name: "administrateur", value: "ADMIN"}, {name: "utilisateur", value: "USER"}, {name: "aucun", value: "EVERYONE"}]
      },
      {
        type: "input",
        name: "pageClass",
        message: "nom de la classe page",
        validate: isNotEmptyFor( "pageClass" ),
        filter: ensureSuffixe("Page", true)
      },
      {
        type: "confirm",
        name: "createPageClass",
        message: "Souhaitez-vous créer le fichier de classe page",
        default: true
      },
      {
        type: "input",
        name: "pageClassDescription",
        message: "description de la page",
        validate: isNotEmptyFor( "pageClassDescription" ),
        when: data => data.createPageClass
      },
      {
        type: "directory",
        name: "pageDirectory",
        message: "répertoire contenant la page",
        basePath: "./src/views",
        when: data => data.createPageClass
      },
      {
        type: "input",
        name: "creatPathPage",
        message: "répertoire intermédiaire à créer (sans / au début et à la fin)",
        when: data => data.createPageClass
      },
      {
        type: "file",
        name: "pageFile",
        message: "fichier contenant la classe de page",
        basePath: "./src/views",
        ext: ".tsx",
        when: data => !data.createPageClass
      },
      {
        type: "input",
        name: "sevicePageClass",
        message: "nom de la classe de service page",
        validate: isNotEmptyFor( "sevicePageClass" ),
        filter: ensureSuffixe("ServicePage", true)
      },
      {
        type: "confirm",
        name: "createServiceClass",
        message: "Souhaitez-vous créer le fichier de service page",
        default: true
      },
      {
        type: "directory",
        name: "serviceDirectory",
        message: "répertoire contenant le service",
        basePath: "./src/services/page",
        when: data => data.createServiceClass
      },
      {
        type: "input",
        name: "creatPathService",
        message: "répertoire intermédiaire à créer (sans / au début et à la fin)",
        when: data => data.createServiceClass
      },
      {
        type: "file",
        name: "serviceFile",
        message: "fichier contenant la classe de service page",
        basePath: "./src/services/page",
        ext: ".ts",
        when: data => !data.createServiceClass
      },

    ],
    actions: ( data ) => {

      let templateImportPage = "";
      if(data.createPageClass) {
        templateImportPage = "import { {{pageClass}} } from \"src/views/{{pageDirectory}}{{creatPathPage}}/{{snakeCase pageClass}}\";\n$1";
      } else {
        templateImportPage = "import { {{pageClass}} } from \"src/views/{{unixPathCase pageFile}}\";\n$1";
      }

      let templateImportServicePage = "";
      if (data.createServiceClass) {
        templateImportServicePage = "import { {{sevicePageClass}} } from \"src/services/page/{{serviceDirectory}}{{creatPathService}}/{{snakeCase sevicePageClass}}\";\n$1";
      } else {
        templateImportServicePage = "import { {{sevicePageClass}} } from \"src/services/page/{{unixPathCase serviceFile}}\";\n$1";
      }

      let actions = [{
        type: "modify",
        path: "./src/routes/{{routeFile}}",
        pattern: /(\s+}\s*})$/mg,
        template: "\nthis.addPageRoute(\"/{{url}}\",\n() => new PageRouteInfos({{camelCase pageClass}}, null, Injector.getRegistered({{camelCase sevicePageClass}})),\nRoles.{{role}}\n);$1"
      },{
        type: "modify",
        path: "./src/routes/{{routeFile}}",
        pattern: /(export default class)/mg,
        template: templateImportPage
      },{
        type: "modify",
        path: "./src/routes/{{routeFile}}",
        pattern: /(export default class)/mg,
        template: templateImportServicePage
      }]

      if ( data.createPageClass) {
        actions.push({
          type: "add",
          path: "./src/views/{{pageDirectory}}{{creatPathPage}}/{{snakeCase pageClass}}.tsx",
          templateFile: "plop-templates/page.hbs"
        });
      
      }
      if ( data.createServiceClass) {
        actions.push({
          type: "add",
          path: "./src/services/page/{{serviceDirectory}}{{creatPathService}}/{{snakeCase sevicePageClass}}.ts",
          templateFile: "plop-templates/service-page.hbs"
        });
      }
      // Retourne le tableau des actions à réaliser.
      return actions;
    }
  });

  plop.setGenerator("new data route", {
    description: "ajout des différent composants pour une route de type data",
    prompts: [
      {
        type: "file",
        name: "routeFile",
        message: "fichier contenant le déclaration de la route a créer",
        basePath: "./src/routes",
        ext: ".ts"
      },
      {
        type: "input",
        name: "url",
        message: "url de la route à créer(sans / au début et à la fin)"
      },
      {
        type: "list",
        name: "verb",
        message: "verbe http de la route à créer",
        default: "get",
        choices: [{name: "get", value: "get"}, {name: "post", value: "post"}, {name: "update", value: "update"}, {name: "put", value: "put"}, {name: "delete", value: "delete"}]

      },
      {
        type: "list",
        name: "role",
        message: "rôle d'accès à cette route",
        choices: [{name: "administrateur", value: "ADMIN"}, {name: "utilisateur", value: "USER"}, {name: "aucun", value: "EVERYONE"}]
      },
      {
        type: "input",
        name: "actionClass",
        message: "nom de la classe d'action",
        validate: isNotEmptyFor( "actionClass" ),
        filter: ensureSuffixe("Action", true)
      },
      {
        type: "confirm",
        name: "createActionClass",
        message: "Souhaitez-vous créer le fichier de classe d'action",
        default: true
      },
      {
        type: "input",
        name: "actionClassDescription",
        message: "description de l'action",
        validate: isNotEmptyFor( "actionClassDescription" ),
        when: data => data.createActionClass
      },
      {
        type: "directory",
        name: "actionDirectory",
        message: "répertoire contenant l'action",
        basePath: "./src/actions",
        when: data => data.createActionClass
      },
      {
        type: "input",
        name: "creatPathAction",
        message: "répertoire intermédiaire à créer (sans / au début et à la fin)",
        when: data => data.createActionClass
      },
      {
        type: "file",
        name: "actionFile",
        message: "fichier contenant la classe d'action'",
        basePath: "./src/action",
        ext: ".ts",
        when: data => !data.createActionClass
      },
      {
        type: "input",
        name: "seviceDataClass",
        message: "nom de la classe de service data",
        validate: isNotEmptyFor( "seviceDataClass" ),
        filter: ensureSuffixe("ServiceData", true)
      },
      {
        type: "confirm",
        name: "createServiceClass",
        message: "Souhaitez-vous créer le fichier de service data",
        default: true
      },
      {
        type: "directory",
        name: "serviceDirectory",
        message: "répertoire contenant le service",
        basePath: "./src/services/data",
        when: data => data.createServiceClass
      },
      {
        type: "input",
        name: "creatPathService",
        message: "répertoire intermédiaire à créer (sans / au début et à la fin)",
        when: data => data.createServiceClass
      },
      {
        type: "file",
        name: "serviceFile",
        message: "fichier contenant la classe de service data'",
        basePath: "./src/services/data",
        ext: ".ts",
        when: data => !data.createServiceClass
      },

    ],
    actions: ( data ) => {

      let templateImportAction = "";
      if(data.createActionClass) {
        templateImportAction = "import { {{actionClass}} } from \"src/actions/{{pageDirectory}}{{creatPathPage}}/{{snakeCase actionClass}}\";\n$1";
      } else {
        templateImportAction = "import { {{actionClass}} } from \"src/actions/{{unixPathCase actionFile}}\";\n$1";
      }

      let templateImportServiceData = "";
      if (data.createServiceClass) {
        templateImportServiceData = "import { {{seviceDataClass}} } from \"src/services/data/{{serviceDirectory}}{{creatPathService}}/{{snakeCase seviceDataClass}}\";\n$1";
      } else {
        templateImportServiceData = "import { {{seviceDataClass}} } from \"src/services/data/{{unixPathCase serviceFile}}\";\n$1";
      }

      let actions = [{
        type: "modify",
        path: "./src/routes/{{routeFile}}",
        pattern: /(\s+}\s*})$/mg,
        template: "\nthis.addDataRoute(\"/{{url}}\",\n(/*route parameter*/) => new DataRouteInfos({{camelCase actionClass}}, null, Injector.getRegistered({{camelCase seviceDataClass}})),\nRoles.{{role}}, \"{{verb}}\"\n);$1"
      },{
        type: "modify",
        path: "./src/routes/{{routeFile}}",
        pattern: /(export default class)/mg,
        template: templateImportAction
      },{
        type: "modify",
        path: "./src/routes/{{routeFile}}",
        pattern: /(export default class)/mg,
        template: templateImportServiceData
      }]
      if ( data.createActionClass) {
        actions.push({
          type: "add",
          path: "./src/actions/{{actionDirectory}}{{creatPathAction}}/{{snakeCase actionClass}}.ts",
          templateFile: "plop-templates/action.hbs"
        });
      }
      if ( data.createServiceClass) {
        actions.push({
          type: "add",
          path: "./src/services/data/{{serviceDirectory}}{{creatPathService}}/{{snakeCase seviceDataClass}}.ts",
          templateFile: "plop-templates/service-data.hbs"
        });
      }
      // Retourne le tableau des actions à réaliser.
      return actions;
    }
  });

};
