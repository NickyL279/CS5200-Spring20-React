import React from 'react';
import UserRow from "./UserRow";
import UserService from "../services/UserService";

class UserList extends React.Component {
    constructor() {
        super();
        this.userService = new UserService();
        this.state = {users: []};
    }
    componentDidMount() {
        this.userService.findAllUsers()
            .then(data => this.setState({users: data }));
    }

    userRows = () =>
        this.state.users.map(
            (user, idx) =>
                <UserRow key={idx} user={user}/>);

    render() {
            return (
                <div>
                    <h2>User List</h2>
                    <table>
                        <thead><tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>username</th>
                            <th>password</th>
                        </tr></thead>
                        <tbody>
                        {this.users}
                        {this.userRows()}
                        </tbody>
                    </table>
                </div>
            )
        }



}
export default UserList;