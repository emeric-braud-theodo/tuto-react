export class BFFCaller {
    static readonly BFF_URL = `${process.env.REACT_APP_BFF_URL}/`;
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