import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { EntityDAO } from "src/dao/entity-dao";
import Map from "hornet-js-bean/src/decorators/Map";
import { UtilisateurMetier } from "src/models/user-mod";

const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.src.dao.utilisateurs-dao");

export class UtilisateursDAO extends EntityDAO {

    constructor() {
        super();
    }

    @Map(UtilisateurMetier)
    findOne(data): Promise<UtilisateurMetier> {
        return this.modelDAO.utilisateurEntity.findOne(data);
    }

    @Map(UtilisateurMetier)
    listerUtilisateurs(): Promise<Array<UtilisateurMetier>> {
        return this.modelDAO.utilisateurEntity.findAll();
    }

    updateById(id: number, data) {
        return this.modelDAO.utilisateurEntity.update(data, {where: {id: id}});
    }

    insert(data) {
        return this.modelDAO.utilisateurEntity.create(data);
    }

    deleteById(id: number | Array<number>) {
        return this.modelDAO.utilisateurEntity.destroy({where: {id: id}});
    }

    @Map(UtilisateurMetier)
    getRole(data): Promise<UtilisateurMetier> {
        return this.modelDAO.utilisateurEntity.findOne({
                where: {
                    login: data.login,
                    password: data.password
                },
                include: [{
                    model: this.modelDAO.roleEntity,
                    as: "listeRole"
                }]
            }
        );
    }

}
