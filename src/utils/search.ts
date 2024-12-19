export function search(values: string[], substr: string): string[] {
    substr = substr.toLowerCase();

    const startsWith = values.filter((s) => s.toLowerCase().startsWith(substr));
    const includes = values.filter((s) => {
        s = s.toLowerCase();
        return s.includes(substr) && !s.startsWith(substr);
    });

    return [...startsWith.sort(), ...includes.sort()];
}
