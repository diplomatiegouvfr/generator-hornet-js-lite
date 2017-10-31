import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { URL_CONTACT } from "src/utils/urls";
import { ContactService } from "src/services/page/cnt/contact-service-page";
import { ServicePage } from "hornet-js-core/src/services/service-page";


const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.services.page.cnt.contact-service-page-impl");

/**
 * Implementation des services pour les contacts
 * @class
 * @implements {ContactService}
 * @extends {ServiceApi}
 */
export class ContactServiceImpl extends ServicePage implements ContactService {

    /**
     * Envoie d'un message sur contacts
     * @param {object} data message à envoyer
     */
    envoyer(data: any): Promise<any> {
        logger.info("SERVICES - send : ", data);

        return this.fetch({
            method: "post",
            url: this.buildUrl(URL_CONTACT),
            data: data
        });
    }
}
