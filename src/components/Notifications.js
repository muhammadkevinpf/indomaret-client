import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { readNotifications } from "../redux/actions/userActions";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.fileTheme,
});

function Notifications({
  classes,
  user: { notifications },
  readNotifications,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let notifIcon, NOT_READ_NOTIFICATIONS;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (notifications && notifications.length > 0) {
    NOT_READ_NOTIFICATIONS = notifications.filter(
      (notif) => notif.read === false
    );

    NOT_READ_NOTIFICATIONS.length > 0
      ? (notifIcon = (
          <Badge badgeContent={NOT_READ_NOTIFICATIONS.length} color="error">
            <NotificationIcon />
          </Badge>
        ))
      : (notifIcon = <NotificationIcon />);
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notif, index) => {
        return (
          <MenuItem key={index} onClick={handleClose}>
            <Typography
              variant="body2"
              component={Link}
              className={classes.linkText}
              to={`/products/${notif.productId}`}
            >
              Terjadi perubahan pada {notif.name}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>Tidak ada notifikasi</MenuItem>
    );

  const handleMenuOpen = () => {
    let notificationIds = NOT_READ_NOTIFICATIONS.map(
      (notif) => notif.notificationId
    );
    readNotifications(notificationIds);
  };

  return (
    <Fragment>
      <IconButton color="inherit" onClick={handleClick}>
        {notifIcon}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={handleMenuOpen}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { readNotifications })(
  withStyles(styles)(Notifications)
);
