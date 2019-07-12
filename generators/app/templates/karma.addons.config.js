const path = require("path");

module.exports = (karmaConfig) => {
    return {
        ...karmaConfig,
        browsers: ["FirefoxHeadless"],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            },
        },
        template: {
            debug: "./test/template/debug.html",
            context: "./test/template/context.html",
            clientContext: "./test/template/client_with_context.html"
        },
        clientContext: [
            [/moment[\/\\]locale$/, /fr|en/],
            [/intl[\/\\]locale-data[\/\\]jsonp$/, /((fr)|(en))$/],
            [/^\.$/, (context) => {
                if (!/\/log4js\/lib$/.test(context.context)) return;
                context.regExp = /^\.\/appenders\/console.*$/;
                context.request = ".";
            }]
        ],
        clientExclude: {
            modules: ["cluster", "continuation-local-storage"]
        }
    };
}