export class FavoriteService {
    private static readonly KEY = "favorites";

    static getAll(): string[] {
        return JSON.parse(localStorage.getItem(this.KEY) ?? "[]");
    }

    static isFavorite(name: string): boolean {
        return this.getAll().includes(name);
    }

    static toggle(name: string): void {
        const favs = this.getAll();
        const exists = favs.includes(name);

        const updated = exists
            ? favs.filter((n) => n !== name)
            : [...favs, name];

        localStorage.setItem(this.KEY, JSON.stringify(updated));
    }

    static setFavorite(name: string, value: boolean): void {
        const favs = this.getAll();

        const updated = value
            ? favs.includes(name) ? favs : [...favs, name]
            : favs.filter((n) => n !== name);

        localStorage.setItem(this.KEY, JSON.stringify(updated));
    }
}