export class BFFCaller {
    static readonly BFF_URL = `${process.env.REACT_APP_BFF_URL}/`;

    protected static async call(
        route: string,
        token?: string | null,
        options?: RequestInit,
    ) {
        try {
            const response = await fetch(`${BFFCaller.BFF_URL}${route}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    ...(options?.headers || {}),
                },
                ...options,
            });

            console.log('URL appelée =', `${BFFCaller.BFF_URL}${route}`);
            console.log('Status =', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}