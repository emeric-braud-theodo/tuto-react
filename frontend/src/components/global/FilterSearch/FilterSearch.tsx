type FilterSearchProps = {
    query: string;
    queryChange: (arg0: string) => void
};

function FilterSearch({ query, queryChange }: FilterSearchProps) {
    return (
        <div>
            <input type="search" name="search_filter" value={query} onChange={(e) => queryChange(e.target.value)}></input>
        </div>
    );
}

export default FilterSearch;