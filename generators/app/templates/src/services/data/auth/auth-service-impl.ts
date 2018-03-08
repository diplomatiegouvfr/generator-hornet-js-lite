import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { UtilisateursDAO } from "src/dao/utilisateurs-dao";
import { UtilisateurMetier } from "src/models/user-mod";
import { AuthService } from "src/services/data/auth/auth-service";
import { Response } from "superagent";

const logger:Logger = Utils.getLogger("<%= slugify(appname) %>.src.services.data.auth.auth-service-data-impl");

export class AuthServiceImpl extends AuthService {

    private utilisateursDAO: UtilisateursDAO = new UtilisateursDAO();

    auth(data): Promise<any> {
        return this.utilisateursDAO.getRole(data).then((utilisateur: UtilisateurMetier) => {
            return {
                "name": utilisateur.login,
                "roles": utilisateur.roles
            };
        });
    }

    listerUtilisateurs(): Promise<Array<UtilisateurMetier>> {
        return this.utilisateursDAO.listerUtilisateurs();
    }

    modifierUtilisateur(id: string, data, cb: any) {
        // this.utilisateursDAO.updateById(id, data).done(cb);
    }

    creerUtilisateur(data): Promise<any> {
        return this.utilisateursDAO.insert(data);
    }

    supprimerUtilisateur(id: string, cb: any) {
        // this.utilisateursDAO.deleteById(id).done(cb);
    }

}
