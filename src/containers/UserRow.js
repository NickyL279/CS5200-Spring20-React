import React from 'react';
class UserRow extends React.Component {



    render() {
        return (
            <tr key={this.props.key}>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.password}</td>
            </tr>
        )
    }
}
export default UserRow;