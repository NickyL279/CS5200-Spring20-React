import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";


const styles = theme => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  }
});

class Main extends PureComponent {
  state = {
    selectedTab: null,
    CardChart: null,
    EmojiTextArea: null,
    ImageCropper: null,
    Dropzone: null,
    DateTimePicker: null,
    transactions: [],
    statistics: { views: [], profit: [] },
    posts: [],
    targets: [],
    messages: [],
    isAccountActivated: false,
    addBalanceDialogOpen: false
  };

  componentDidMount() {

  }


  selectDashboard = () => {
    smoothScrollTop();
    document.title = "Jobs";
    this.setState({
      selectedTab: "Dashboard"
    });
    if (!this.hasFetchedCardChart) {
      this.hasFetchedCardChart = true;
      import("../../shared/components/CardChart").then(Component => {
        this.setState({ CardChart: Component.default });
      });
    }
  };

  selectPosts = () => {
    smoothScrollTop();
    document.title = "Users";
    this.setState({
      selectedTab: "Posts"
    });
    if (!this.hasFetchedEmojiTextArea) {
      this.hasFetchedEmojiTextArea = true;
      import("../../shared/components/EmojiTextArea").then(Component => {
        this.setState({ EmojiTextArea: Component.default });
      });
    }
    if (!this.hasFetchedImageCropper) {
      this.hasFetchedImageCropper = true;
      import("../../shared/components/ImageCropper").then(Component => {
        this.setState({ ImageCropper: Component.default });
      });
    }
    if (!this.hasFetchedDropzone) {
      this.hasFetchedDropzone = true;
      import("../../shared/components/Dropzone").then(Component => {
        this.setState({ Dropzone: Component.default });
      });
    }
    if (!this.hasFetchedDateTimePicker) {
      this.hasFetchedDateTimePicker = true;
      import("../../shared/components/DateTimePicker").then(Component => {
        this.setState({ DateTimePicker: Component.default });
      });
    }
  };

  selectSubscription = () => {
    smoothScrollTop();
    document.title = "Subscription";
    this.setState({
      selectedTab: "Subscription"
    });
  };

  render() {
    const { classes,
      setLoggedInUser,
      loggedInUser} = this.props;
    const {
      selectedTab,
      ImageCropper,
      EmojiTextArea,
      CardChart,
      Dropzone,
      DateTimePicker,
      transactions,
      statistics,
      posts,
      targets,
      isAccountActivated,
      messages
    } = this.state;
    return (
      <Fragment>
        <NavBar
          selectedTab={selectedTab}
          messages={messages}
          openAddBalanceDialog={this.openAddBalanceDialog}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />

        <main className={classNames(classes.main)}>
          <Routing
            isAccountActivated={isAccountActivated}
            ImageCropper={ImageCropper}
            EmojiTextArea={EmojiTextArea}
            CardChart={CardChart}
            Dropzone={Dropzone}
            DateTimePicker={DateTimePicker}
            handleNumberChange={this.handleNumberChange}
            handleSwitchToggle={this.handleSwitchToggle}
            handleSelectChange={this.handleSelectChange}
            toggleAccountActivation={this.toggleAccountActivation}
            pushMessageToSnackbar={this.pushMessageToSnackbar}
            transactions={transactions}
            statistics={statistics}
            posts={posts}
            targets={targets}
            selectDashboard={this.selectDashboard}
            selectPosts={this.selectPosts}
            selectSubscription={this.selectSubscription}
            loggedInUser={loggedInUser}
            // openAddBalanceDialog={this.openAddBalanceDialog}
          />
        </main>
      </Fragment>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  setLoggedInUser: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Main);
