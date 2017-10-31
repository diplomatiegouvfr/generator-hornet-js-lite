import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { AbstractHornetMiddleware } from "hornet-js-core/src/middleware/middlewares";

export class ThemeSwitcherMiddleware extends AbstractHornetMiddleware {
    private static logger: Logger = Utils.getLogger("<%= slugify(appname) %>.middleware.ThemeSwitcherMiddleware");

    constructor() {
        ThemeSwitcherMiddleware.logger.info("MIDDLEWARE CONFIGURATION : Init ThemeSwitcherMiddleware...");
        super((req, res, next) => {
            if (req.query.themeName) {
                ThemeSwitcherMiddleware.logger.trace("Insertion du theme présent dans la query:", req.query.themeName);
                req.getSession().setAttribute("themeName", req.query.themeName);
            }
            next();
        });
    }
}
