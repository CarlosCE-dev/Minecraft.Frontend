/**
 * The role types available
 */
export const RoleTypes = {
    /**
    * Admin role type, absolute power
    */
   admin: 0,
   /**
    * Moderator role type, with more power
    */
   moderator: 1,
   /**
    * Basic role type, with limit power
    */
   user: 2
}

/**
 * Vali admin roles
 */
export const validAdminRoles = [RoleTypes.admin, RoleTypes.moderator];