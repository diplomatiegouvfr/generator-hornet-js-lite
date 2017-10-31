import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";

const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.views.gen.gen-hom-page");

/**
 * Ecran de page d'accueil de l'application
 */
export class HomePage extends HornetPage<any, HornetComponentProps,any> {

    prepareClient() {
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.info("VIEW HomePage render");
        return (
            <div id="pageAccueil">
                <h2>Accueil</h2>

                <div>
                    <h3>Qu'est-ce que l'application TUTORIEL ?</h3>

                    <div>
                        <p className="texte">L'application TUTORIEL a pour objectif de présenter une application
                                basée sur le framework Hornet.
                        </p>

                        <p className="texte">
                            <em>A noter :</em>
                        </p>
                        <ul>
                            <li>Hornet facilite la mise en oeuvre du RGAA dans une application.</li>
                            <li>Mais l'utilisation de Hornet ne garantit pas qu'une application soit valide RGAA.
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3>Mise en oeuvre</h3>

                    <div>
                        <h4>Cas fonctionnels</h4>

                        <p className="texte">Les cas fonctionnels présentés dans l'application sont :
                        </p>
                        <ul>
                            <li>Formulaire de recherche</li>
                            <li>Présentation du résultat sous forme de tableau éditable</li>
                            <li>Formulaire étendu</li>
                            <li>Tableau d'ajout/suppression/modification d'items</li>
                        </ul>
                        <h4>RGAA</h4>

                        <p className="texte">Pour plus d'infos sur le RGAA, aller sur le lien&nbsp;
                            <a href={this.genUrl("/politiqueAccessibilite")}>Accessibilité</a>.
                        </p>

                        <p className="texte">
                            Le framework fourni est un élément facilitant la mise en conformité RGAA.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}