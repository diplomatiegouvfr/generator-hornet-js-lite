import { Injector } from "hornet-js-core/src/inject/injector";
import { Scope } from "hornet-js-core/src/inject/injectable";
import { Utils } from "hornet-js-utils";
import { AuthService } from "src/services/data/auth/auth-service";

Injector.register("databaseConfigName", "config");

if (Utils.config.getOrDefault("mock.enabled", false) && Utils.config.getOrDefault("mock.serviceData.enabled", false)) {
    Promise.all([
        import("src/mock/services/data/auth/auth-service-impl-mock")
    ]).then(([AuthServiceDataMockImpl] ) => {
        Injector.register(AuthService, AuthServiceDataMockImpl.AuthServiceDataMockImpl, Scope.SINGLETON);
    });
} else {
    Promise.all([
        import("src/services/data/auth/auth-service-impl")
    ]).then(([AuthServiceImpl, SecteurServiceImpl, PartenaireServiceImpl, ReferentielPaysServiceImpl, FicheProduitServiceImpl]) => {
        Injector.register(AuthService, AuthServiceImpl.AuthServiceImpl, Scope.SINGLETON);
    });
}


