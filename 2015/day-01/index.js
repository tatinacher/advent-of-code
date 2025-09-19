const { load } = require("../../utils/file");

const findFloor = (result) => {
    let floor = 0;

    result.split('').map(el => {
        if (el === '(') {
            floor += 1;
        }
        if (el === ')') {
            floor -= 1;
        }
    })
    console.log(floor);

}

const findBasementIndex = (result) => {
    let floor = 0, index = 0;
    const splitRes = result.split('');

    for (let i = 0; i < splitRes.length; i++) {
        const el = splitRes[i];
        if (el === '(') {
            floor += 1;
        }
        if (el === ')') {
            floor -= 1;
        }
        if (floor === -1) {
            index = i + 1;
            break
        }
    }

    console.log(index);
}


const findResult = (result) => {
    findFloor(result);
    findBasementIndex(result);
}

const run = ({ file, findResult }) => {
    let promise = new Promise((resolve, reject) => {
        load(file)
            .then((res) => resolve(res))
            .catch((res) => reject(res));
    });

    promise.then(findResult);
};

run({ file: "data.txt", findResult });


