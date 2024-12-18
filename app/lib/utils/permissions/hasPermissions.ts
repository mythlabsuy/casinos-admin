// import { Module, Action } from './permissionEnums';

import { ActionEnum, ModuleEnum } from "../../enums/authActionModule";

type PermissionMapType = {
  [key in ModuleEnum]?: {
    [key in ActionEnum]?: number;
  };
};

const PermissionMap: PermissionMapType = {
  [ModuleEnum.ROLE]: {
    [ActionEnum.CREATE]: 0,
    [ActionEnum.READ]: 1,
    [ActionEnum.UPDATE]: 2,
    [ActionEnum.DELETE]: 3,
  },
  [ModuleEnum.PARTICIPANT]: {
    [ActionEnum.CREATE]: 4,
    [ActionEnum.READ]: 5,
    [ActionEnum.UPDATE]: 6,
    [ActionEnum.DELETE]: 7,
    [ActionEnum.EXPORT]: 24,
  },
  [ModuleEnum.USER]: {
    [ActionEnum.CREATE]: 8,
    [ActionEnum.READ]: 9,
    [ActionEnum.UPDATE]: 10,
    [ActionEnum.DELETE]: 11,
  },
  [ModuleEnum.PREMISE]: {
    [ActionEnum.CREATE]: 16,
    [ActionEnum.READ]: 17,
    [ActionEnum.UPDATE]: 18,
    [ActionEnum.DELETE]: 19,
    //This role works different, if you have it, then you are restricted by it
    [ActionEnum.ONLY_ONE_PREMISE]: 26,
  },
  [ModuleEnum.PROMOTION]: {
    [ActionEnum.CREATE]: 20,
    [ActionEnum.READ]: 21,
    [ActionEnum.UPDATE]: 22,
    [ActionEnum.DELETE]: 23,
  },
  // [ModuleEnum.EXPORT_PARTICIPANT]: {
  //   [ActionEnum.EXPORT]: 24,
  // },
};

export function hasPermission(
  module: ModuleEnum,
  action: ActionEnum,
  userPermissions: number[]
): boolean {
  //check for the edit role first, if it's not there, then we don't care about the other roles
  const editPermission = PermissionMap[module]?.[ActionEnum.READ];
  if (!editPermission || !userPermissions.includes(editPermission)) {
    return false;
  }

  const permissionId = PermissionMap[module]?.[action];
  if (permissionId === undefined) return false;

  return userPermissions.includes(permissionId);
}