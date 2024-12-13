import { auth } from "@/auth";
import { ActionEnum, ModuleEnum } from "../../enums/authActionModule";
import { hasPermission } from "./hasPermissions";
import { Session } from "next-auth";


export async function userHasPermission(module: ModuleEnum, action: ActionEnum, session : Session | null): Promise<boolean> {
    const permissions = session?.user_data?.roles ?? [];
    return hasPermission(module, action, permissions);
}