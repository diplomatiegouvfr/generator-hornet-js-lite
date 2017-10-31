import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { AuthService } from "src/services/data/auth/auth-service";
import { ServiceSecure } from "hornet-js-core/src/services/service-secure";
import { Response } from "superagent";

const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.mock.services.data.auth.auth-service-mock-impl");

/**
 * Liste des utilisateurs en mode bouchon
 * @type {any[]}
 */
var users = [
    {
        "name": "test",
        "roles": [{"id": 2, "name": "<%= slugify(appname) %>_USER"}]
    },
    {
        "name": "admin",
        "roles": [{"id": 1, "name": "<%= slugify(appname) %>_ADMIN"}, {"id": 2, "name": "<%= slugify(appname) %>_USER"}]
    }
];
function findByUsername(username) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.name === username) {
            return user;
        }
    }
    return null;
}

/**
 * Implementation des services pour l'authentification
 * @class
 * @implements {AuthService}
 * @extends {ServiceApi}
 */
export class AuthServiceMockImpl extends AuthService {

    /**
     * recherche de l'identité
     * @param {object} data
     */
    auth(data) : Promise<any> {
        logger.info("SERVICES MOCK - auth", data);
        let user = findByUsername(data.login);
        return Promise.resolve(user);
    }

    saveToken(response:Response) {
    }

    getToken() {
        return null;
    }

}
