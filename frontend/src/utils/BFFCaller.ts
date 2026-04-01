export class BFFCaller {
    static readonly BFF_URL = "http://localhost:3001/";
    protected static async call(route: string) {
        try {
            const response = await fetch(`${BFFCaller.BFF_URL}${route}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}