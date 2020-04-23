import jsonToArray from "../functions/jsonToArray";

const API_URL= 'https://cs5200-spring2020-hartenstine.com/api/';
// const API_URL= 'http://localhost:8080/api/';

export default class AdvisorService {

    findAllAdvisors = () =>
        fetch(API_URL + "allAdvisors", {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                return response;
                // return jsonToArray(
                //     response,
                //     ["id", "dtype", "firstName", "lastName", "username"]);
            });

    findStudentsForAdvisor = (id) =>
        fetch(API_URL + "allStudents", {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                return jsonToArray(
                    response.filter(student => student.advisor != null && student.advisor.id === id),
                    ["id", "dtype", "firstName", "lastName", "username"]);
            });


}
