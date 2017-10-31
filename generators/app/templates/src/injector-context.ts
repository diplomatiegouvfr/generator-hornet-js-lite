import { Utils } from "hornet-js-utils";

import { Injector } from "hornet-js-core/src/inject/injector";
import { Scope } from "hornet-js-core/src/inject/injectable";

Injector.register("config", "config");

import { AuthService } from "src/services/data/auth/auth-service";
import { AuthServiceImpl } from "src/services/data/auth/auth-service-data-impl";
import { AuthServiceMockImpl } from "src/mock/services/data/auth/auth-service-impl-mock";


if (Utils.config.getOrDefault("mock.enabled", false)) {
    Injector.register(AuthService, AuthServiceMockImpl, Scope.SINGLETON);
} else {
    Injector.register(AuthService, AuthServiceImpl, Scope.SINGLETON);
}
