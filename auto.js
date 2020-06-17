const rowItem = [2, 5, 8, 11, 14, 17, 20];
const colItem = [1, 2, 3, 4, 5];

const selectItem = (row, col) => {
    let path = `#tblView > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(${row}) > td > input[type=radio]:nth-child(${col})`;
    console.log(path);
    document.querySelector(path).setAttribute('checked', true);
}

const randomGernete = (num, base)=>{
    return [1, 2, 3, 4, 5].map(() => Math.ceil(num + base * Math.random())).concat([1, 2, 3, 4, 5].map(() => Math.ceil(num + base * Math.random()))).slice(0, 6);
}

const result1 = (num, base) => {
    let newArr = randomGernete(num, base);
    for (let i = 0; i<6; i++) {
        selectItem((2 + 3 * i), newArr[i]);
    }
    selectItem(20,1);
}

const best = () => result(1, 0);
const good = () => result(0, 3);
const soso = () => result(1, 3);
const notgood = () => result(2, 3);
const bad = () => result(5, 0);