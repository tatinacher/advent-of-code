const { load } = require("../../utils/file");


const findResult = (result) => {
    result.map(el => console.log(el))
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


