
export interface ResourceLocationLocalizedValues {
    [locale: string]: string;
}

export interface LocaleInfo {
    cultureName: string;
    messageTitle: string;
    htmlMessageText: string;
}

export interface ParkAlerts {
  [locale: string]: LocaleInfo[];
}

export interface RootMap {
    resourceLocationId?: number;
    resourceLocationLocalizedValues: ResourceLocationLocalizedValues;
    mapId: number;
    parkAlerts: ParkAlerts;
    resourceCategoryIds: number[];
}

export type RootMaps = Array<RootMap>;
