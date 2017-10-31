/// <reference path="src.d.ts" />
import Sequelize = require("sequelize");

import { UtilisateurAttributes, UtilisateurModel } from "src/models/seq-user-mod";
import { RoleAttributes, RoleModel } from "src/models/model-role";
import { RoleUtilisateurAttributes, RoleUtilisateurModel } from "src/models/model-role_utilisateur";
import { Entity } from "hornet-js-database/src/decorators/dec-seq-entity";
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { SequelizeUtils } from "hornet-js-database/src/sequelize/sequelize-utils";
import { injectable, Scope, Side } from "hornet-js-core/src/inject/injectable";
import { HornetSequelizeModel } from "hornet-js-database/src/sequelize/hornet-sequelize-model";
import { inject } from "hornet-js-core/src/inject/inject";
import { HornetSequelizeInstanceModel } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

const logger : Logger= Utils.getLogger("<%= slugify(appname) %>.src.dao.model-dao");

@injectable(ModelDAO, Scope.SINGLETON, Side.SERVER)
export class ModelDAO extends HornetSequelizeModel {

    @Entity("utilisateur", UtilisateurModel)
    public utilisateurEntity: HornetSequelizeInstanceModel<UtilisateurAttributes>;

    @Entity("role", RoleModel)
    public roleEntity: HornetSequelizeInstanceModel<RoleAttributes>;

    @Entity("role_utilisateur", RoleUtilisateurModel)
    public roleUtilisateurEntity: HornetSequelizeInstanceModel<RoleUtilisateurAttributes>;

    constructor(@inject("config")conf?: string) {
        super(conf);
        this.initUtilisateurEntity();
        this.initRoleEntity();
    }

    private initUtilisateurEntity(): void {
        SequelizeUtils.initRelationBelongsToMany(this.utilisateurEntity, this.roleEntity, "listeRole", "id_utilisateur", "role_utilisateur");
    }

    private initRoleEntity(): void {
        SequelizeUtils.initRelationBelongsToMany(this.roleEntity, this.utilisateurEntity, "listeUser", "id_role", "role_utilisateur");
    }
}