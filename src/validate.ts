import type { User, Subject } from './data.ts';

const isString = (v: unknown): v is string => typeof v === 'string';
const isNumber = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object';

function parseSubject(value: unknown, label: string, errors: string[]): Subject | null {
    if (!isObject(value)) {
        errors.push(label);
        return null;
    }

    const s = value as Record<string, unknown>;
    let valid = true;
    let name = '';
    let grade = 0;
    let weight = 0;

    if (isString(s.name))   name = s.name;      else { errors.push(`${label}.name`);   valid = false; }
    if (isNumber(s.grade))  grade = s.grade;    else { errors.push(`${label}.grade`);  valid = false; }
    if (isNumber(s.weight)) weight = s.weight;  else { errors.push(`${label}.weight`); valid = false; }

    return valid ? { name, grade, weight } : null;
}

export function toUser(input: unknown): User {
    if (!isObject(input)) throw new Error('User: expected an object');

    const u = input as Record<string, unknown>;
    const errors: string[] = [];

    let firstName = '';
    let lastName = '';
    const subjects: Subject[] = [];

    if (isString(u.firstName)) firstName = u.firstName;  else errors.push('firstName');
    if (isString(u.lastName))  lastName = u.lastName;    else errors.push('lastName');

    if (Array.isArray(u.subjects)) {
        for (const [i, s] of u.subjects.entries()) {
            const result = parseSubject(s, `subjects[${i}]`, errors);
            if (result) subjects.push(result);
        }
    } else {
        errors.push('subjects');
    }

    if (errors.length > 0) {
        throw new Error(`User: invalid fields — ${errors.join(', ')}`);
    }

    return { firstName, lastName, subjects };
}