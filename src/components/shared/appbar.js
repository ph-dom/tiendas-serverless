import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { startLogoutUser } from '../../redux/user/actions';
import formatNumber from '../../shared/formatNumber';
import requestStatus from '../../shared/requestStatus';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        marginRight: theme.spacing(2),
        color: 'inherit',
        textDecoration: 'none'
    }
}));

const AppBarComponent = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorNots, setAnchorNots] = React.useState(null);
    const open = Boolean(anchorEl);
    const openNots = Boolean(anchorNots);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        props.startLogoutUser();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} to="/" component={Link}>
                        Tiendas
                    </Typography>
                    <div>
                        <IconButton
                            aria-controls="menu-notifications"
                            aria-haspopup="true"
                            onClick={(event) => setAnchorNots(event.currentTarget)}
                            color="inherit"
                        >
                            <Badge badgeContent={props.notifications.length} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Menu
                            id="menu-notifications"
                            anchorEl={anchorNots}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={openNots}
                            onClose={() => setAnchorNots(null)}
                        >
                            {props.notifications.length > 0 ?
                                props.notifications.map(req => {
                                    return (
                                        <MenuItem key={req.id} onClick={() => setAnchorNots(null)} component={Link}
                                            to={props.uid === req.user.uid ?
                                                `/solicitudes?list=user&status=${req.status}&id=${req.id}` :
                                                `/solicitudes?list=store&status=${req.status}&id=${req.id}`}
                                            >
                                            {props.uid === req.user.uid ?
                                                `Tu solicitud a ${req.store.name} fue ${req.status}.` :
                                                `Nueva solicitud de ${req.user.fullName} por ${formatNumber(req.total)}.`}
                                        </MenuItem>
                                    );
                                }) :
                                <MenuItem component="span" onClick={() => setAnchorNots(null)}>Sin notificaciones</MenuItem>
                            }
                        </Menu>
                        <IconButton
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={event => setAnchorEl(event.currentTarget)}
                            color="inherit"
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} component={Link} to="/">Inicio</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/solicitudes?list=user">Mis Solicitudes</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/mitienda">Mi Tienda</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/solicitudes?list=store">Solicitudes</MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => ({
    notifications: state.storeRequests
        .filter(request => request.status === requestStatus.CREATED)
        .concat(state.userRequests
            .filter(request => (request.status === requestStatus.REJECTED || request.status === requestStatus.ACCEPTED))),
    uid: state.user.uid
});

const mapDispatchToProps = (dispatch) => ({
    startLogoutUser: () => dispatch(startLogoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComponent);