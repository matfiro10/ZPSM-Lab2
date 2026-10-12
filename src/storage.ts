import { writeFileSync, readFileSync } from 'node:fs';
import type { User } from './data.ts';

export function save(data: User, file: string): void {
    writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

export function load(file: string): unknown {
    return JSON.parse(readFileSync(file, 'utf8'));
}