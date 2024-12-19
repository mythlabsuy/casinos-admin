export enum PermEnum {
    // Role Permissions
    CREATE_ROLE = 0,
    READ_ROLE = 1,
    UPDATE_ROLE = 2,
    DELETE_ROLE = 3,
    // Participant Permissions
    CREATE_PARTICIPANT = 4,
    READ_PARTICIPANT = 5,
    UPDATE_PARTICIPANT = 6,
    DELETE_PARTICIPANT = 7,
    // User permissions
    CREATE_USER = 8,
    READ_USER = 9,
    UPDATE_USER = 10,
    DELETE_USER = 11,
    // Media permissions
    CREATE_MEDIA = 12,
    READ_MEDIA = 13,
    UPDATE_MEDIA = 14,
    DELETE_MEDIA = 15,
    // Premises permissions
    CREATE_PREMISE = 16,
    READ_PREMISE = 17,
    UPDATE_PREMISE = 18,
    DELETE_PREMISE = 19,
    // Promotion permissions
    CREATE_PROMOTION = 20,
    READ_PROMOTION = 21,
    UPDATE_PROMOTION = 22,
    DELETE_PROMOTION = 23,

    EXPORT_PARTICIPANT_BY_PROMOTION = 24,
    EXPORT_ALL_PARTICIPANT_BY_PREMISE= 25,

    ONLY_ONE_PREMISE = 26,
}

export enum PermCategory {
    ROLE = "role",
    PARTICIPANT = "participant",
    USER = "user",
    MEDIA = "media",
    PREMISE = "premise",
    PROMOTION = "promotion",
    EXPORT_PARTICIPANT_BY_PROMOTION = 'exportAllParticipantByPromotion',
    EXPORT_ALL_PARTICIPANT_BY_PREMISE = 'exportAllParticipantByPremise',
    ONLY_ONE_PREMISE = 'onlyOnePremise',
}

export type Perm = {
    id: PermEnum;
    label: string;
    selected: boolean;
    category: PermCategory;
};

export const permDefaultValues: Perm[] = [
    // Role Permissions
    { id: PermEnum.CREATE_ROLE, label: "Crear roles", selected: false, category: PermCategory.ROLE },
    { id: PermEnum.READ_ROLE, label: "Ver roles", selected: false, category: PermCategory.ROLE },
    { id: PermEnum.UPDATE_ROLE, label: "Actualizar roles", selected: false, category: PermCategory.ROLE },
    { id: PermEnum.DELETE_ROLE, label: "Borrar roles", selected: false, category: PermCategory.ROLE },

    // Participant Permissions
    { id: PermEnum.CREATE_PARTICIPANT, label: "Crear participantes", selected: false, category: PermCategory.PARTICIPANT },
    { id: PermEnum.READ_PARTICIPANT, label: "Ver participantes", selected: false, category: PermCategory.PARTICIPANT },
    { id: PermEnum.UPDATE_PARTICIPANT, label: "Actualizar participantes", selected: false, category: PermCategory.PARTICIPANT },
    { id: PermEnum.DELETE_PARTICIPANT, label: "Borrar participantes", selected: false, category: PermCategory.PARTICIPANT },

    // User Permissions
    { id: PermEnum.CREATE_USER, label: "Crear usuarios", selected: false, category: PermCategory.USER },
    { id: PermEnum.READ_USER, label: "Ver usuarios", selected: false, category: PermCategory.USER },
    { id: PermEnum.UPDATE_USER, label: "Actualizar usuarios", selected: false, category: PermCategory.USER },
    { id: PermEnum.DELETE_USER, label: "Borrar usuarios", selected: false, category: PermCategory.USER },

    // Media Permissions
    { id: PermEnum.CREATE_MEDIA, label: "Crear media", selected: false, category: PermCategory.MEDIA },
    { id: PermEnum.READ_MEDIA, label: "Ver media", selected: false, category: PermCategory.MEDIA },
    { id: PermEnum.UPDATE_MEDIA, label: "Actualizar media", selected: false, category: PermCategory.MEDIA },
    { id: PermEnum.DELETE_MEDIA, label: "Borrar media", selected: false, category: PermCategory.MEDIA },

    // Premises Permissions
    { id: PermEnum.CREATE_PREMISE, label: "Crear locales", selected: false, category: PermCategory.PREMISE },
    { id: PermEnum.READ_PREMISE, label: "Ver locales", selected: false, category: PermCategory.PREMISE },
    { id: PermEnum.UPDATE_PREMISE, label: "Actualizar locales", selected: false, category: PermCategory.PREMISE },
    { id: PermEnum.DELETE_PREMISE, label: "Borrar locales", selected: false, category: PermCategory.PREMISE },

    // Promotion Permissions
    { id: PermEnum.CREATE_PROMOTION, label: "Crear promociones", selected: false, category: PermCategory.PROMOTION },
    { id: PermEnum.READ_PROMOTION, label: "Ver promociones", selected: false, category: PermCategory.PROMOTION },
    { id: PermEnum.UPDATE_PROMOTION, label: "Actualizar promociones", selected: false, category: PermCategory.PROMOTION },
    { id: PermEnum.DELETE_PROMOTION, label: "Borrar promociones", selected: false, category: PermCategory.PROMOTION },

    { id: PermEnum.EXPORT_PARTICIPANT_BY_PROMOTION, label: "Exportar participantes por promoción", selected: false, category: PermCategory.EXPORT_PARTICIPANT_BY_PROMOTION },
    { id: PermEnum.EXPORT_ALL_PARTICIPANT_BY_PREMISE, label: "Exportar TODOS los participantes por local ", selected: false, category: PermCategory.EXPORT_ALL_PARTICIPANT_BY_PREMISE },
    { id: PermEnum.ONLY_ONE_PREMISE, label: "Solo un local (Usuario totem) ", selected: false, category: PermCategory.ONLY_ONE_PREMISE },

];