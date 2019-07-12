
const path = require("path");

const clientContext = [
    [/moment[\/\\]locale$/, /fr|en/],
    [/intl[\/\\]locale-data[\/\\]jsonp$/, /((fr)|(en))$/],
    [/^\.$/, (context) => {
        if (!/\/log4js\/lib\/appenders$/.test(context.context)) return;
        Object.assign(context, {
            regExp: /^console.*$/,
            request: "."
        });
        
    }]
];

const dev = {
    dllEntry: {
        vendor: ["hornet-js-react-components", "hornet-js-components", "hornet-js-utils", "hornet-js-core"]
    }
}

const externals = [
        new RegExp(path.join("src", "services", "data") + "/.*"),
        new RegExp(path.join("src", "dao") + "/.*"),
        /src\/middleware\/.*/,
        new RegExp(path.join("src", "services", "data") + "/.*-data-\.*"),
        "hornet-js-database",
        "config",
        "continuation-local-storage",
        "sequelize",
        "pdfmake",
        "carbone",
        "csv-parser",
        "nodemailer",
        "tls",
        "child_process",
        "net",
        "fs",
        "dns"
]


module.exports = (project, conf, helper, webpackConfigPart, configuration, webpack) => {
    const projectPlugins = [...webpackConfigPart.addContextReplacement(clientContext).plugins];
    if (helper.isDevMode()) {
        conf.dev = dev;
        const dllReference =  webpackConfigPart.addDllReferencePlugins(project, "static", "js", "dll");
        if(dllReference && dllReference.plugins) {
            projectPlugins.push(...dllReference.plugins);
        }
    }
    return {
        ...configuration,
        plugins: [...configuration.plugins, ...projectPlugins,
            new webpack.optimize.MinChunkSizePlugin({
              minChunkSize: 300000 // Minimum number of characters
            })],
        externals : (context, request, callback) => {
                if(/log4js\/lib\/appenders/.test(context) && (!/console/.test(request)) && (/^\.\//.test(request))) {
                    return callback(null, "{}");
                } 
                for (let i = 0; i < externals.length; i++) {
                    let extern = externals[i];
                    if (extern.test) { // c'est une regexp'
                        if (extern.test(request)) {
                            return callback(null, "{}");
                        }
                    } else if (request == extern) {
                        return callback(null, "{}");
                    }
                }

                return callback();
            }
        
        
    }

}
