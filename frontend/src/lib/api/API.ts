import axios from "axios"

export class API {
    protected static async call(endoint_url: String) {
        const URL = `https://pokeapi.co/api/v2/${endoint_url}`;
        try {
            const response = await fetch(URL);
            const data = await response.json();
            return data;

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    protected static async axios_call(endoint_url: String) {
        const URL = `https://pokeapi.co/api/v2/${endoint_url}`;
        try {
            const response = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}