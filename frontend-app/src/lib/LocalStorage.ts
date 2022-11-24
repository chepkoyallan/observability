export enum LocalStorageKey {
    navbarCollapsed = 'navbarCollapsed',
  }
  
export class LocalStorage {
    public static hasKey(key: LocalStorageKey): boolean {
        return localStorage.getItem(key) !== undefined;
}

    public static isNavbarCollapsed(): boolean {
        return localStorage.getItem(LocalStorageKey.navbarCollapsed) === 'true';
    }

    public static saveNavbarCollapsed(value: boolean): void {
        localStorage.setItem(LocalStorageKey.navbarCollapsed, value.toString());
    }
}