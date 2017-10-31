/**
 * Classe regroupant les rôles disponibles dans l'application
 */
export class Roles {
    static USER_STR = "<%= slugify(appname) %>_USER";
    static ADMIN_STR = "<%= slugify(appname) %>_ADMIN";

    static USER = [Roles.USER_STR];
    static ADMIN = [Roles.ADMIN_STR];

    static EVERYONE = [Roles.USER_STR, Roles.ADMIN_STR];
}
