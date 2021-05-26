

export interface LocalizedValue {
    cultureName: string;
    name: string;
    description?: string;
}

export interface SubEquipmentCategory {
    subEquipmentCategoryId: number;
    order: number;
    isActive: boolean;
    localizedValues: LocalizedValue[];
}

export interface Equipment {
    versionId: number;
    versionDate: Date;
    isDisabled: boolean;
    equipmentCategoryId: number;
    order: number;
    localizedValues: LocalizedValue[];
    subEquipmentCategories: SubEquipmentCategory[];
}

