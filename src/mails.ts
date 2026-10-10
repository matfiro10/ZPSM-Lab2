import { getMails } from './getMails.ts';

const collections: unknown[] = [
    {},
    15,
    'hello@test.pl',
    null,
    ['aaa', 'bbb', 5],
    'admin@gmail.com',
    undefined,
    'a34@yahoo.com',
    '321@a',
    '321.pl',
];

console.log(getMails(collections));