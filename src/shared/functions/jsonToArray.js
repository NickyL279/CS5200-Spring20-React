function jsonToArray(json, arrayOfDesiredColumns) {
    const dataArray = [];
    if (json.length > 0) {
        json.forEach((row) => {
            const rowArray = [];
            arrayOfDesiredColumns.forEach((key) => {
                const subKey = key.split(".");
                if(subKey.length > 1){
                    rowArray.push(row[subKey[0]][subKey[1]])
                }else {
                    rowArray.push(row[key])
                }
            });
            dataArray.push(rowArray);
        })
    }
    return dataArray;
}

export default jsonToArray;

