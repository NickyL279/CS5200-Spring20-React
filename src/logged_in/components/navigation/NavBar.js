import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
  withStyles,
  isWidthUp,
  withWidth
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
// import NavigationDrawer from "../../../shared/components/NavigationDrawer";
import profilePicture from "../../dummy_data/images/profilePicture.jpg";

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0
    }
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }
  },
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 24,
    width: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5)
    }
  },
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    },
    backgroundColor: theme.palette.common.black
  },
  smBordered: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "50% !important"
    }
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textPrimary: {
    color: theme.palette.primary.main
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2)
  },
  justifyCenter: {
    justifyContent: "center"
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

function NavBar(props) {
  const { selectedTab, classes, width, loggedInUser /*, setLoggedInUser*/ } = props;
  // Will be use to make website more accessible by screen readers
  const links = useRef([]);

  const adminItem =     {
    link: "/c/posts",
    name: "Manage Users",
    onClick: console.log("Posts clicked"),
    icon: {
      desktop: (
          <PeopleOutlineIcon
              className={
                selectedTab === "Posts" ? classes.textPrimary : "text-white"
              }
              fontSize="small"
          />
      ),
      mobile: <PeopleOutlineIcon className="text-white" />
    }
  }

  const menuItems = [
    {
      link: "/c/dashboard",
      name: "Jobs Dashboard",
      onClick: console.log("Dashboard clicked"),
      icon: {
        desktop: (
          <DashboardIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />
      }
    },
    {
      link: "/c/subscription",
      name: "My Profile",
      onClick: console.log("Subscription clicked"),
      icon: {
        desktop: (
          <AccountCircleIcon
            className={
              selectedTab === "Subscription"
                ? classes.textPrimary
                : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <AccountCircleIcon className="text-white" />
      }
    }
  ];

  if(loggedInUser.dtype === "Admin")
  {
    menuItems.push(adminItem)
  }

  menuItems.push(
      {
        link: "/",
        name: "Logout",
        onClick: console.log("Logout clicked"),
        icon: {
          desktop: (
              <PowerSettingsNewIcon className="text-white" fontSize="small" />
          ),
          mobile: <PowerSettingsNewIcon className="text-white" />
        }
      }
  )

  return (

    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={console.log("Open Navigation clicked")}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            {/*<Hidden xsDown>*/}
            {/*  <Typography*/}
            {/*    variant="h4"*/}
            {/*    className={classes.brandText}*/}
            {/*    display="inline"*/}
            {/*    color="primary"*/}
            {/*  >*/}
            {/*    Wa*/}
            {/*  </Typography>*/}
            {/*  <Typography*/}
            {/*    variant="h4"*/}
            {/*    className={classes.brandText}*/}
            {/*    display="inline"*/}
            {/*    color="secondary"*/}
            {/*  >*/}
            {/*    Ver*/}
            {/*  </Typography>*/}
            {/*</Hidden>*/}
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >

            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              <Avatar
                alt="profile picture"
                src={profilePicture}
                className={classNames(classes.accountAvatar)}
              />
              {isWidthUp("sm", width) && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="textPrimary">{loggedInUser.username} ( {loggedInUser.dtype} )</Typography>
                  }
                />
              )}
            </ListItem>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => (
              <Link
                to={element.link}
                className={classes.menuLink}
                onClick={element.onClick}
                key={index}
                ref={node => {
                  links.current[index] = node;
                }}
              >
                <Tooltip
                  title={element.name}
                  placement="right"
                  key={element.name}
                >
                  <ListItem
                    selected={selectedTab === element.name}
                    button
                    divider={index !== menuItems.length - 1}
                    className={classes.permanentDrawerListItem}
                    onClick={() => {
                      links.current[index].click();
                    }}
                    aria-label={
                      element.name === "Logout"
                        ? "Logout"
                        : `Go to ${element.name}`
                    }
                  >
                    <ListItemIcon className={classes.justifyCenter}>
                      {element.icon.desktop}
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      {/*<NavigationDrawer*/}
      {/*  menuItems={menuItems.map(element => ({*/}
      {/*    link: element.link,*/}
      {/*    name: element.name,*/}
      {/*    icon: element.icon.mobile,*/}
      {/*    onClick: element.onClick*/}
      {/*  }))}*/}
      {/*  anchor="left"*/}
      {/*  open={console.log("NavigationDrawer open")}*/}
      {/*  selectedItem={selectedTab}*/}
      {/*  onClose={console.log("NavigationDrawer closed")}*/}
      {/*/>*/}
    </Fragment>
  );
}

NavBar.propTypes = {
  // selectedTab: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  setLoggedInUser: PropTypes.func.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(NavBar));
