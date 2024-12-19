export async function fetchJson<T>(
    url: string,
    init?: RequestInit,
): Promise<T | undefined> {
    const response = await fetch(url, init);
    if (!response.ok) {
        return;
    }

    const json = await response.json();
    return json as T;
}
