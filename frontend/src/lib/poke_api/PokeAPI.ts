import { API } from "../api/API";
import { optional } from "../utils";

export class PokeAPI extends API {

    public static async dummy() {
        return await this.axios_call("pokemon/ditto");
    }

    public static async get_list_head(): Promise<ListQueryResult> {
        return await this.axios_call("pokemon");
    }

}

interface ListQueryResultRow {
    name: String;
    url: String;
};

export interface ListQueryResult {
    results: Array<ListQueryResultRow>;
    count: number;
    next: optional<String>;
    previous: optional<String>;
};