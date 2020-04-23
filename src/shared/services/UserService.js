import jsonToArray from "../functions/jsonToArray";

const COURSE_API_URL= 'https://cs5200-spring2020-hartenstine.com/api/';
// const COURSE_API_URL= 'http://localhost:8080/api/';
// added this comment


export default class UserService {

    createUser = function(user){

        let userUrl;

        const formData = new FormData();
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('username', user.username);
        formData.append('password', user.password);

        switch(user.dtype) {
            case 'Student':
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

    findUserById = (userId) =>
        fetch(COURSE_API_URL + "allUsers", {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                var user = null
                response.forEach(row => {
                    if (row.id === userId) {
                        console.log("found user");
                        user = row
                    }
                })
                return user;
            });

    findAllUsers = () =>
        fetch(COURSE_API_URL + "allUsers", {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                return jsonToArray(
                    response,
                    ["id", "dtype", "firstName", "lastName", "username"]);
            });

    updateUser = (userId, user) => {
        let userUrl

        switch(user.dtype) {
            case 'Student':
                userUrl = "students/"
                break;
            case 'Advisor':
                userUrl = "advisors/"
                break;
            default:
                userUrl = "users/"
        }

        return fetch(COURSE_API_URL + userUrl + userId, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(response => {
            console.log(userId)
            console.log(user)
            console.log(response);
        });
    }

    deleteUser = userId =>
        fetch(COURSE_API_URL + "users/" + userId, {
            crossDomain:true,
            method: 'DELETE',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => {
                console.log(response);
            });

    authenticateUser = (username, password) =>
        fetch(COURSE_API_URL + "userlogin/" + username + "/" + password, {
            crossDomain:true,
            method: 'GET',
            headers: {'Content-Type':'application/json; charset=utf-8'}
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                    if (response.length > 0) {
                        return response[0]
                    } else {
                        return "fail"
                    }
            })
}
