import { users } from './data.ts';
import { printSummary } from './summary.ts';
import find from 'lodash/find.js';
import { toUser } from './validateZod.ts';
import { load, save } from './storage.ts';


const user = users[0];

if (user === undefined) {
    throw new Error('No users available');
}
printSummary(user);

console.log("\n");

let s_weight_id = 1;
const lodashSubject = find(user.subjects, (subject) => subject.weight === s_weight_id);
const nativeSubject = user.subjects.find((subject) => subject.weight === s_weight_id);

console.log(`Lodash and Array.find return the same result: ${lodashSubject === nativeSubject}`);

if (lodashSubject !== undefined) {
    console.log(lodashSubject.name);
} else {
    console.log("Cant find nie subject");
}

console.log("\n");

save(user, 'data.json');

try {
    const loadedData = load('data.json');
    const loadedUser = toUser(loadedData);

    printSummary(loadedUser);
} catch (error) {
    if (error instanceof SyntaxError) {
        console.error(`[JSON_PARSE_ERROR] ${error.message}`);
    } else if (error instanceof Error) {
        console.error(`[USER_LOAD_ERROR] ${error.message}`);
    }
}

console.log("\n");

const usersWithAverage = users
    .map((user) => {
        const { weightedSum, totalWeight } = user.subjects.reduce(
            (result, { grade, weight }) => ({
                weightedSum: result.weightedSum + grade * weight,
                totalWeight: result.totalWeight + weight,
            }),
            { weightedSum: 0, totalWeight: 0 },
        );

        return { user, weightedAverageGrade: weightedSum / totalWeight };
    })
    .sort((first, second) => second.weightedAverageGrade - first.weightedAverageGrade);

console.log("Users sorted by weighted average: ");
usersWithAverage.forEach(({ user }) => printSummary(user));