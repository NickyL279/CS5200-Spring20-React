const COURSE_API_URL= 'http://localhost:8080/api/allUsers';

export default class UserService {
    findAllUsers = () =>
        fetch(COURSE_API_URL)
        .then(response =>
                  response.json());
    createUser = user => {}
    deleteUser = userId => {}

}
