import React from "react";
import Styles from "../users/UserFormStyles";
import {Field, Form} from "react-final-form";
import {Radio, Select} from 'final-form-material-ui';
import {FormControl, FormControlLabel, MenuItem, RadioGroup,} from '@material-ui/core';
import UserService from "../../../shared/services/UserService";
import PropTypes from "prop-types";

class UsersEditForm extends React.Component {

    onSubmit = values => {
        const selectedAdvisor = values.advisor
        values.advisor = this.props.advisorList[selectedAdvisor]

        console.log("values");
        console.log(values);
        (new UserService()).updateUser(this.props.user.id, values)
            .then(() => {
                      alert("User updated.")
                      this.props.datacall()
                  }
            )
    };

    render() {
        let intitValues = this.props.user
        let currentAdvisorId = null;
        if (intitValues.advisor != null) {
            currentAdvisorId = intitValues.advisor.id
            intitValues.advisor =
                this.props.advisorList.findIndex(advisor => advisor.id === currentAdvisorId)
        }

        return (
            <Styles>
                <Form
                    onSubmit={this.onSubmit}
                    initialValues={intitValues}
                    render={({handleSubmit, submitting,/* pristine,  reset,*/ values, invalid}) => {

                        switch (values.dtype) {
                            case 'Student':
                                // code block
                                break;
                            case 'Admin':
                                delete values.scholarship
                                delete values.major
                                break;
                            case 'Advisor':
                                delete values.scholarship
                                delete values.major
                                break;
                            default:
                            // code block
                        }

                        // console.log(user.user);
                        console.log(this.props);

                        return (<form onSubmit={handleSubmit}>
                                <div key="0">
                                    <label>User Type</label>
                                    <FormControl component="fieldset">
                                        <RadioGroup row>
                                            <FormControlLabel
                                                label="User"
                                                control={
                                                    <Field
                                                        name="dtype"
                                                        component={Radio}
                                                        type="radio"
                                                        value="User"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Student"
                                                control={
                                                    <Field
                                                        name="dtype"
                                                        component={Radio}
                                                        type="radio"
                                                        value="Student"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Advisor"
                                                control={
                                                    <Field
                                                        name="dtype"
                                                        component={Radio}
                                                        type="radio"
                                                        value="Advisor"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Admin"
                                                control={
                                                    <Field
                                                        name="dtype"
                                                        component={Radio}
                                                        type="radio"
                                                        value="Admin"
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div key="1">
                                    <label>First Name</label>
                                    <Field
                                        name="firstName"
                                        component="input"
                                        type="text"
                                        validate={val => val ? undefined : 'Required'}
                                    />
                                </div>
                                <div key="2">
                                    <label>Last Name</label>
                                    <Field
                                        name="lastName"
                                        component="input"
                                        type="text"
                                        validate={val => val ? undefined : 'Required'}
                                    />
                                </div>
                                <div key="3">
                                    <label>Username</label>
                                    <Field
                                        name="username"
                                        component="input"
                                        type="text"
                                        validate={val => val ? undefined : 'Required'}
                                    />
                                </div>
                                <div key="4">
                                    <label>Password</label>
                                    <Field
                                        name="password"
                                        component="input"
                                        type="text"
                                        validate={val => val ? undefined : 'Required'}
                                    />
                                </div>
                                {values.dtype === 'Student' && [
                                    <div key="7">
                                        <label>Advisor</label>
                                        <Field type="text" name="advisor" component="select">
                                            <option>---</option>
                                            {this.props.advisorList
                                                .map((option, index) => {
                                                         if (values.advisor === index) {
                                                             return (
                                                                 <option selected="selected"
                                                                         key={index}
                                                                         value={index}>
                                                                     {option.firstName} {option.lastName}
                                                                 </option>)
                                                         } else {
                                                             return (<option key={index}
                                                                             value={index}>
                                                                 {option.firstName} {option.lastName}
                                                             </option>)
                                                         }
                                                     }
                                                )}
                                        </Field>
                                    </div>,
                                    <div key="5">
                                        <label>Scholarship</label>
                                        <Field
                                            name="scholarship"
                                            component="input"
                                            type="text"
                                        />
                                    </div>,
                                    <div key="6">
                                        <label>Major</label>
                                        <Field
                                            fullWidth
                                            name="major"
                                            component={Select}
                                            label="Select a Major"
                                            formControlProps={{fullWidth: true}}
                                        >
                                            <MenuItem value="CS">Computer Science</MenuItem>
                                            <MenuItem value="BS">Business</MenuItem>
                                            <MenuItem value="ENG">English</MenuItem>
                                            <MenuItem value="MA">Math</MenuItem>
                                        </Field>
                                    </div>
                                ]}

                                <div className="buttons">
                                    <button type="submit" disabled={submitting || invalid}>
                                        Submit Update
                                    </button>
                                </div>
                                <pre>{JSON.stringify(values, 0, 2)}</pre>
                            </form>
                        )
                    }}
                />
            </Styles>
        );
    }
}

UsersEditForm.propTypes = {
    advisorList: PropTypes.array.isRequired
}

export default UsersEditForm