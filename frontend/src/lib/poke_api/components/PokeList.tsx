import { PokeAPI } from "../PokeAPI";
import { useQuery } from '@tanstack/react-query';

function PokeList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["poke_list"],
        queryFn: PokeAPI.get_list_head
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        console.error()
        return <div>Error</div>;
    }
    if (!data) return <div>Empty result</div>;
    return (
        <div>
            {
                data.results.map((item, index) => {
                    return (
                        <div key={index}> {item.name} </div>
                    );
                })
            }
        </div>
    );
}
export default PokeList;