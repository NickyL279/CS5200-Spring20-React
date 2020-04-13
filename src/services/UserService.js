const COURSE_API_URL= 'https://radiant-wave-20858.herokuapp.com/api/allUsers';

export default class UserService {
    findAllUsers = () =>
        fetch(COURSE_API_URL)
        .then(response =>
                  response.json());
    createUser = user => {}
    deleteUser = userId => {}

}
