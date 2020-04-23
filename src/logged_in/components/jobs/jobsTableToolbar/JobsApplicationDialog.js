import React from "react";
import Styles from "../../users/UserFormStyles";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import {Field, Form} from "react-final-form";
import StudentService from "../../../../shared/services/StudentService";

class JobsApplicationDialog extends React.Component {

    handleSubmit = (values) => {
        (new StudentService()).createApplication(values).then(() => {
            this.props.handleClose()
        })
    };

    render() {
        return (
            <React.Fragment>
                <Dialog open={this.props.open} onClose={this.props.handleClose}
                        aria-labelledby="form-dialog-title">
                    <Styles>
                        <Form onSubmit={this.handleSubmit}
                              initialValues={this.props.initialData}
                              render={({handleSubmit, submitting,/* pristine,  reset,*/ values, invalid}) => {
                                  return (
                                      <form onSubmit={handleSubmit}>

                                          <h3>Job Application</h3>
                                          <span>
                                          Company: {values.job.company}
                                              <br/>Job Title: {values.job.title}
                                      </span>
                                          <div key="1">
                                              <label>Describe why you should get the job.</label>
                                              <Field
                                                  name="description"
                                                  component="textarea"
                                                  type="text"
                                                  validate={val => val ? undefined : 'Required'}
                                              />
                                          </div>
                                          <div key="2">
                                              <label>Give the name of anyone you know within the
                                                  company who may provide a referral.</label>
                                              <Field
                                                  name="referral"
                                                  component="textarea"
                                                  type="text"
                                                  validate={val => val ? undefined : 'Required'}
                                              />
                                          </div>
                                          <div className="buttons">
                                              <button type="submit"
                                                      disabled={submitting || invalid}>
                                                  Submit Application
                                              </button>
                                          </div>
                                          <pre>{JSON.stringify(values, 0, 2)}</pre>
                                      </form>
                                  )
                              }}/></Styles>
                </Dialog>
            </React.Fragment>
        )
    }
}

JobsApplicationDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    initialData: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
}

export default JobsApplicationDialog;