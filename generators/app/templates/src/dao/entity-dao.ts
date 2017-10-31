import { injectable } from "hornet-js-core/src/inject/injectable";
import { HornetSequelizeEntity } from "hornet-js-database/src/sequelize/hornet-sequelize-entity";
import { inject } from "hornet-js-core/src/inject/inject";
import { ModelDAO } from "src/dao/model-dao";

@injectable()
export class EntityDAO extends HornetSequelizeEntity<ModelDAO> {

    constructor(@inject(ModelDAO) modelDAO?: ModelDAO) {
        super(modelDAO);
    }
}
