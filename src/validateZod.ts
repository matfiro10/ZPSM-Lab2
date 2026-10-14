import { z } from 'zod';
import type { User } from './data.ts';

export const subjectSchema = z.object({
	name: z.string(),
	grade: z.number(),
	weight: z.number(),
});

export const userSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	subjects: z.array(subjectSchema),
});

function formatPath(path: PropertyKey[]): string {
	if (path.length === 0) {
		return 'root';
	}
	return path.reduce<string>((current, part) => {
		if (typeof part === 'number') {
			return `${current}[${part}]`;
		}
		return current ? `${current}.${String(part)}` : String(part);
	}, '');
}

export function toUser(input: unknown): User {
	const result = userSchema.safeParse(input);

	if (result.success) {
		return result.data;
	}

	if (input === null || typeof input !== 'object') {
		throw new Error('User: expected an object');
	}

	const errors = result.error.issues.map((issue) => ({
		field: formatPath(issue.path),
		message: issue.message,
		code: issue.code,
	}));

	throw new Error(`User: invalid fields — ${JSON.stringify(errors, null, 2)}`);
}