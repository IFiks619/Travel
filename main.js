const ls = [51, 56, 58, 59, 61]; // Відстань між містами
const k = 3; // кількість міст 
const t = 174; // максимальна відстань

function generateCombinations(array, comboLength) {
    const sourceLength = array.length;
    if (comboLength > sourceLength) return [];
    const combos = [];

    const makeNextCombos = (workingCombo, currentIndex, remainingCount) => {
        const oneAwayFromComboLength = remainingCount == 1;

        for (let sourceIndex = currentIndex; sourceIndex < sourceLength; sourceIndex++) {
            const next = [...workingCombo, array[sourceIndex]];

            if (oneAwayFromComboLength) {
                combos.push(next);
            }
            else {
                makeNextCombos(next, sourceIndex + 1, remainingCount - 1);
            }
        }
    }
    makeNextCombos([], 0, comboLength);
    return combos;
}

const chooseOptimalDistance = (maxDistance, numberOfCities, arrayOfDistances) => {
    for (item of arrayOfDistances) {
        if (item < 0) {
            console.error('Wrong input of distances')
            return null
        }
    }
    if (arrayOfDistances.length < numberOfCities || numberOfCities < 1) {
        return null
    }
    const combos = generateCombinations(ls, k);
    const sums = []
    for (let combo of combos) {
        const sum = combo.reduce((item, acc) => acc + item, 0)

        if (!sums.includes(sum) && sum < maxDistance) {
            sums.push(sum)
        }
    }
    sums.sort((a, b) => a - b)
    return (sums[sums.length - 1] || null)
}

console.log(chooseOptimalDistance(t, k, ls))
