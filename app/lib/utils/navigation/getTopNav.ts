import { auth } from "@/auth";
import { ActionEnum, ModuleEnum } from "../../enums/authActionModule";
import { userHasPermission } from "../permissions/userHasPermissions";

export async function getTopNav(): Promise<Array<{ name: string; href: string; iconName: string }>> {
    const navItems = [
        { name: 'Participantes', href: '/welcome/participants', iconName: 'UserGroupIcon', module: ModuleEnum.PARTICIPANT, action: ActionEnum.READ },
        { name: 'Promociones', href: '/welcome/promotions', iconName: 'TicketIcon', module: ModuleEnum.PROMOTION, action: ActionEnum.READ },
        { name: 'Locales', href: '/welcome/premises', iconName: 'BuildingStorefrontIcon', module: ModuleEnum.PREMISE, action: ActionEnum.READ },
        { name: 'Usuarios', href: '/welcome/users', iconName: 'UserGroupIcon', module: ModuleEnum.USER, action: ActionEnum.READ },
        { name: 'Base de datos', href: '/welcome/database', iconName: 'CircleStackIcon', module: ModuleEnum.DATABASE, action: [ActionEnum.EXPORT_ALL_PARTICIPANT_BY_PREMISE, ActionEnum.EXPORT_PARTICIPANT_BY_PROMOTION], },
        { name: 'Roles', href: '/welcome/roles', iconName: 'LockClosedIcon', module: ModuleEnum.ROLE, action: ActionEnum.READ },
    ]
    const filteredNav = [];
    const session = await auth();
    for (const item of navItems) {
        let hasAccess: boolean;

        if (Array.isArray(item.action)) {
            const permissions = await Promise.all(
                item.action.map((singleAction) => userHasPermission(item.module, singleAction, session))
            );
            hasAccess = permissions.some((permission) => permission === true);
        } else {
            hasAccess = await userHasPermission(item.module, item.action, session);
        }

        if (hasAccess) {
            filteredNav.push({ name: item.name, href: item.href, iconName: item.iconName });
        }
    }

    return filteredNav;
}