function jsonToArray(json, arrayOfDesiredColumns) {
    const dataArray = [];
    if (json.length > 0) {
        json.forEach((row) => {
            const rowArray = [];
            arrayOfDesiredColumns.forEach((key) => rowArray.push(row[key]));
            dataArray.push(rowArray);
        })
    }
    console.log(dataArray)
    return dataArray;
}

export default jsonToArray;

