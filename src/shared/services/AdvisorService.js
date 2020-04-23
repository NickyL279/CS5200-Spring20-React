
const COURSE_API_URL= 'https://cs5200-spring2020-hartenstine.com/api/';
// const COURSE_API_URL= 'http://localhost:8080/api/';

export default class AdvisorService {

    findAllAdvisors = () =>
        fetch(COURSE_API_URL + "allAdvisors", {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                return response;
                // return jsonToArray(
                //     response,
                //     ["id", "dtype", "firstName", "lastName", "username"]);
            });


}
