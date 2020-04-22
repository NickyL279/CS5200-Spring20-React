import React from "react";
import Styles from "../users/UserFormStyles";
import { Form } from "react-final-form";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";


class StudentAgreementForm extends React.Component {

    onSubmit = values => {
        console.log("values");
        console.log(values);
        // (new UserService()).updateUser(this.props.user.id, values)
        //     .then(()=> {
        //               this.props.setLoggedInUser(null);
        //               this.props.history.push("/");
        //               alert("User updated.")
        //           }
        //     )
    };

    render() {
        return (
            <Styles>
                <Form
                    onSubmit={this.onSubmit}
                    initialValues={{}}
                    render={({handleSubmit,submitting,/* pristine,  reset,*/ values, invalid}) => {

                        // console.log(user.user);
                        console.log(this.props);

                        return (<form onSubmit={handleSubmit}>
                                <h3>Student Agreement Form Status</h3>
                                <FormControl component="fieldset">
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value="top"
                                            control={<Switch color="primary" />}
                                            label="Submitted"
                                            labelPlacement="top"
                                        />
                                        <FormControlLabel
                                            value="top"
                                            control={<Switch color="primary" />}
                                            label="Verified"
                                            labelPlacement="top"
                                        />
                                        <div className="buttons">
                                            <button type="submit" disabled={submitting || invalid}>
                                                Submit Update
                                            </button>
                                        </div>
                                    </FormGroup>

                                </FormControl>

                                <pre>{JSON.stringify(values, 0, 2)}</pre>
                            </form>
                        )
                    }}
                />
            </Styles>
        );
    }
}

StudentAgreementForm.propTypes = {
    history: PropTypes.object.isRequired,
    setLoggedInUser: PropTypes.func.isRequired
}

export default withRouter(StudentAgreementForm)