import type { User } from './data.ts';

export function printSummary(user: User): void {
    const { firstName, lastName, subjects } = user;
    const { weightedSum, totalWeight } = subjects.reduce(
        (result, { grade, weight }) => ({
            weightedSum: result.weightedSum + grade * weight,
            totalWeight: result.totalWeight + weight,
        }),
        { weightedSum: 0, totalWeight: 0 },
    );
    const weightedAverage = weightedSum / totalWeight;

    console.log(`${firstName} ${lastName} - weighted average: ${weightedAverage.toFixed(2)}`);
}
