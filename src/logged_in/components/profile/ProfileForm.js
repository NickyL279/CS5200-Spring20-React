import React from "react";
import Styles from "../users/UserFormStyles";
import { Form, Field } from "react-final-form";
import { Radio, Select } from 'final-form-material-ui';
import {
    RadioGroup,
    MenuItem,
    FormControl,
    FormControlLabel,
} from '@material-ui/core';
import UserService from "../../../shared/services/UserService";

const onSubmit = values => {
    (new UserService()).createUser(values)
};

const ProfileForm = (props) => (
    <Styles>
        <Form
            onSubmit={onSubmit}
            initialValues={{ dtype: 'Student' }}
            render={({ handleSubmit, reset, submitting, pristine, values, invalid }) => {

                switch(values.dtype) {
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
                console.log(props);

                return (<form onSubmit={handleSubmit}>
                        <h3>Edit User Profile</h3>
                        <div key="0">
                            <label>User Type</label>
                            <FormControl component="fieldset">
                                <RadioGroup row>
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
                                    defaultValue={props.user.firstName}
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
                            <div key="5">
                                <label>Scholarship</label>
                                <Field
                                    name="scholarship"
                                    component="input"
                                    type="text"
                                    placeholder="$ 0"
                                />
                            </div>,
                            <div key="6">
                                <label>Major</label>
                                <Field
                                    fullWidth
                                    name="major"
                                    component={Select}
                                    label="Select a Major"
                                    formControlProps={{ fullWidth: true }}
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
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={reset}
                                disabled={submitting || pristine}
                            >
                                Reset
                            </button>
                        </div>
                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}}
        />
    </Styles>
);

export default ProfileForm