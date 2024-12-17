export enum ActionEnum {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  EXPORT = 'EXPORT',
  ONLY_ONE_PREMISE= 'ONLY_ONE_PREMISE',
}

export enum ModuleEnum {
  ROLE = 'ROLE',
  PARTICIPANT = 'PARTICIPANT',
  USER = 'USER',
  PREMISE = 'PREMISE',
  PROMOTION = 'PROMOTION',
}

export function getModuleFromPath(path: string): ModuleEnum | undefined {
  // Split the path into segments and filter out empty strings (due to leading/trailing slashes)
  const segments = path.split('/').filter(Boolean);

  // Check if any of the segments matches a module
  const moduleUrlString = segments.find((segment) => modulePathStringList.includes(segment));

  return getModuleEnumFromUrlString(moduleUrlString);
}

function getModuleEnumFromUrlString(value?: string): ModuleEnum | undefined {
  switch (value) {
    case 'roles':
      return ModuleEnum.ROLE;
    case 'participants':
      return ModuleEnum.PARTICIPANT;
    case 'users':
      return ModuleEnum.USER;
    case 'premises':
      return ModuleEnum.PREMISE;
    case 'promotions':
      return ModuleEnum.PROMOTION;
    case 'database':
      return ModuleEnum.PARTICIPANT;
    default:
      return undefined;
  }
}

export function getActionFromModuleAndPath(module: ModuleEnum, path: string): ActionEnum | undefined {
  // Extract the last segment of the path
  const segments = path.split('/').filter(Boolean); // Split and remove empty segments
  const lastSegment = segments[segments.length - 1]; // Get the last part of the path

  if (actionPathStringList.includes(lastSegment)) {
    return getActionEnumFromUrlString(lastSegment);
  }

  if (modulePathStringList.includes(lastSegment)) {
    return ActionEnum.READ;
  }

  return undefined;
}

function getActionEnumFromUrlString(value?: string): ActionEnum | undefined {
  switch (value) {
    case 'create':
      return ActionEnum.CREATE;
    case 'edit':
      return ActionEnum.UPDATE;
    default:
      return undefined;
  }
}



const modulePathStringList = ['roles', 'participants', 'users', 'premises', 'promotions', 'database'];
const actionPathStringList = ['create', 'edit',];

