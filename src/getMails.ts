export function getMails(data: unknown[]): string[] {
    const email_regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return data
            .filter((item): item is string => typeof item === 'string' && email_regex.test(item))
            .sort();
}