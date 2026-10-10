import { user } from './data.ts';
import { printSummary } from './summary.ts';
import find from 'lodash/find.js';


printSummary(user);

let s_weight_id = 7;
const lodashSubject = find(user.subjects, (subject) => subject.weight === s_weight_id);
const nativeSubject = user.subjects.find((subject) => subject.weight === s_weight_id);

console.log(`Lodash and Array.find return the same result: ${lodashSubject === nativeSubject}`);

if (lodashSubject !== undefined) {
    console.log(lodashSubject.name);
} else {
    console.log("Cant find nie subject");
}