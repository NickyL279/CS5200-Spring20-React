const COURSE_API_URL= 'https://cs5200-spring2020-hartenstine.com/api/';
// const COURSE_API_URL= 'http://localhost:8080/api/';
// added this comment

function jsonToArray(json){
    const dataArray = [];
    if(json.length > 0){
    json.forEach((row) =>
                 {
                     const rowArray = [];
                     const keys = ["id", "dtype", "firstName", "lastName", "username"];
                     keys.forEach((key) => rowArray.push(row[key]));
        dataArray.push(rowArray);
    })
}
    console.log(dataArray)
    return dataArray;
}

export default class UserService {
    findAllUsers = () =>
        fetch(COURSE_API_URL + "allUsers", {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                return jsonToArray(response);
        });
    createUser = function(user){

        let userUrl;

        const formData = new FormData();
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('username', user.username);
        formData.append('password', user.password);

        switch(user.dtype) {
            case 'Studnt':
                userUrl = "addstudent"
                formData.append('gradYear', user.gradYear);
                formData.append('scholarship', user.scholarship);
                formData.append('major', user.major);
                break;
            case 'Admin':
                userUrl = "addadmin"
                break;
            case 'Advisor':
                userUrl = "addadvisor"
                break;
            default:
                userUrl = "adduser"
        }

        return fetch(COURSE_API_URL + userUrl, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'Content-Type':'application/json; charset=utf-8'}
        }).then(response => {
             console.log(response);
         });
    };

    deleteUser = userId =>
        fetch(COURSE_API_URL + "users/" + userId, {
            crossDomain:true,
            method: 'DELETE',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => {
                console.log(response);
            });

}
