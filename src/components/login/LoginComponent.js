import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { startLoginUser } from '../../redux/user/actions';
import { openModal } from '../../redux/modal/action';

class LoginComponent extends React.Component {
    state = {
        email: '',
        password: ''
    }

    onInputTextChange = (event) => {
		let prop = event.target.name;
		let value = event.target.value;
		this.setState({
			[prop]: value
		});
	}

	handleSubmitForm = (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			this.props.startLoginUser(email, password, () => {
				this.props.openModal('Correo o contraseña incorrectas.');
				this.setState({
        			password: ''
				});
			});
		} catch(error) {
			console.log(error)
		}
    }
    
    handleClickSignin = (event) => {
        event.preventDefault();
        this.props.history.push('/signin');
    }

	render() {
		const { email, password } = this.state;
		return (
			<div className="container">
				<Grid container justify="center">
					<Grid item xs={12} sm={8} md={6} lg={4}>
						<Paper elevation={4} className="paper">
							<Typography variant="h2" className="text-center">
								Tiendas
							</Typography>
							<form id="login-form" onSubmit={this.handleSubmitForm} autoComplete="off" className="tiendas-form">
								<div className="tiendas-form-inputs">
									<TextField
										name="email"
										type="email"
										label="Email"
										value={email}
										onChange={this.onInputTextChange}
										variant="outlined"
										size="small"
									/>
									<TextField
										name="password"
										type="password"
										label="Contraseña"
										value={password}
										onChange={this.onInputTextChange}
										variant="outlined"
										size="small"
									/>
								</div>
								<div className="tiendas-form-actions">
									<Button variant="outlined" color="secondary" onClick={this.handleClickSignin} size="small">
										Registrarse
									</Button>
									<Button variant="contained" color="primary" form="login-form" type="submit" size="small">
										Iniciar Sesión
									</Button>
								</div>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	startLoginUser: (email, password, errorCallback) => dispatch(startLoginUser(email, password, errorCallback)),
	openModal: (message) => dispatch(openModal(message))
});

export default connect(undefined, mapDispatchToProps)(LoginComponent);