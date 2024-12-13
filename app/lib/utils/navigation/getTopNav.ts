import { auth } from "@/auth";
import { ActionEnum, ModuleEnum } from "../../enums/authActionModule";
import { userHasPermission } from "../permissions/userHasPermissions";

export async function getTopNav(): Promise<Array<{ name: string; href: string; iconName: string }>> {
    const navItems = [
        { name: 'Participantes', href: '/welcome/participants', iconName: 'UserGroupIcon', module: ModuleEnum.PARTICIPANT, action: ActionEnum.READ },
        { name: 'Promociones', href: '/welcome/promotions', iconName: 'TicketIcon', module: ModuleEnum.PROMOTION, action: ActionEnum.READ },
        { name: 'Locales', href: '/welcome/premises', iconName: 'BuildingStorefrontIcon', module: ModuleEnum.PREMISE, action: ActionEnum.READ },
        { name: 'Usuarios', href: '/welcome/users', iconName: 'UserGroupIcon', module: ModuleEnum.USER, action: ActionEnum.READ },
        { name: 'Roles', href: '/welcome/roles', iconName: 'LockClosedIcon', module: ModuleEnum.ROLE, action: ActionEnum.READ },
    ]

    const filteredNav = [];
    const session = await auth();
    for (const item of navItems) {
        const hasAccess = await userHasPermission(item.module, item.action, session);
        if (hasAccess) {
            filteredNav.push({ name: item.name, href: item.href, iconName: item.iconName });
        }
    }

    return filteredNav;
}