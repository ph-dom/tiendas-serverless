import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { startSigninUserEmail } from '../../redux/user/actions';
import { openModal } from '../../redux/modal/action';

class SigninComponent extends React.Component {
	state = {
		fullName: '',
		email: '',
		password: '',
		password2: ''
	};

	onInputTextChange = (event) => {
		let prop = event.target.name;
		let value = event.target.value;
		this.setState({
			[prop]: value
		});
	};

	handleSubmitForm = (event) => {
		event.preventDefault();
		const { fullName, email, password, password2 } = this.state;
		if(password === password2) {
			this.props.startSigninUserEmail(fullName, email, password);
		} else {
			this.props.openModal('Las contraseñas no coinciden.');
		}
	}

	handleClickLogin = (event) => {
        event.preventDefault();
        this.props.history.push('/login');
    }

	render() {
		const { fullName, email, password, password2 } = this.state;
		return (
			<div className="container">
				<Grid container justify="center">
					<Grid item xs={12} sm={8} md={6} lg={4}>
						<Paper elevation={4} className="paper">
						<Typography variant="h2" className="text-center">
							Tiendas
						</Typography>
						<form id="signin-form" onSubmit={this.handleSubmitForm} autoComplete="off" className="tiendas-form">
							<div className="tiendas-form-inputs">
								<TextField
									name="fullName"
									type="text"
									label="Nombre"
									value={fullName}
									onChange={this.onInputTextChange}
									size="small"
									variant="outlined"
									placeholder="Nombre Apellido"
								/>
								<TextField
									name="email"
									type="email"
									label="Email"
									value={email}
									onChange={this.onInputTextChange}
									size="small"
									variant="outlined"
								/>
								<TextField
									name="password"
									type="password"
									label="Contraseña"
									value={password}
									onChange={this.onInputTextChange}
									size="small"
									variant="outlined"
								/>
								<TextField
									name="password2"
									type="password"
									label="Confirme contraseña"
									value={password2}
									onChange={this.onInputTextChange}
									size="small"
									variant="outlined"
								/>
							</div>
							<div className="tiendas-form-actions">
								<Button variant="outlined" color="secondary" onClick={this.handleClickLogin} size="small">
									Iniciar Sesión
								</Button>
								<Button variant="contained" color="primary" form="signin-form" type="submit" size="small">
									Registrarse
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
	startSigninUserEmail: (fullName, email, password) => dispatch(startSigninUserEmail(fullName, email, password)),
	openModal: (message) => dispatch(openModal(message))
});

export default connect(undefined, mapDispatchToProps)(SigninComponent);