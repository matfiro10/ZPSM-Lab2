import { user } from './data.ts';
import { printSummary } from './summary.ts';
import find from 'lodash/find.js';
import { toUser } from './validate.ts';
import { load, save } from './storage.ts';


printSummary(user);

let s_weight_id = 1;
const lodashSubject = find(user.subjects, (subject) => subject.weight === s_weight_id);
const nativeSubject = user.subjects.find((subject) => subject.weight === s_weight_id);

console.log(`Lodash and Array.find return the same result: ${lodashSubject === nativeSubject}`);

if (lodashSubject !== undefined) {
    console.log(lodashSubject.name);
} else {
    console.log("Cant find nie subject");
}

save(user, 'data.json');

const loadedData = load('data.json');

try {
    const loadedUser = toUser(loadedData);
    printSummary(loadedUser);
} catch (error) {
    if (error instanceof Error) {
        console.error(`Error while loading user: ${error.message}`);
    }   
}