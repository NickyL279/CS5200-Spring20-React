import jsonToArray from "../functions/jsonToArray";

const COURSE_API_URL= 'https://cs5200-spring2020-hartenstine.com/api/';
// const COURSE_API_URL= 'http://localhost:8080/api/';

export default class JobService {
    findJobs = () =>
        fetch(COURSE_API_URL + "allJobs", {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                return jsonToArray(
                    response,
                    ["id","title","company","location","description"]);
            });

}


