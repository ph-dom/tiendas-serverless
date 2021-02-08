import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import InputTextOutlined from '../shared/inputs/textoutlined';
import InputButtonContained from  '../shared/inputs/buttoncontained';
import ButtonOutlined from '../shared/buttons/buttonoutlined';
import { startSigninUserEmail } from '../../redux/user/actions';

class SigninComponent extends React.Component {
	state = {
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
		const { email, password, password2 } = this.state;
		if(password === password2) {
			this.props.startSigninUserEmail(email, password);
		} else {
			window._banner_.setText('Las contraseñas no coinciden.');
            window._banner_.open();
		}
	}

	handleClickLogin = (event) => {
        event.preventDefault();
        this.props.history.push('/login');
    }

	render() {
		const { email, password, password2 } = this.state;
		return (
			<React.Fragment>
				<Typography variant="h2" className="text-center">
					Tiendas
				</Typography>
				<form id="signin-form" onSubmit={this.handleSubmitForm} autoComplete="off">
					<div className="tiendas-form">
						<div className="tiendas-form-inputs">
							<InputTextOutlined
								idInput="SigninInput-email"
								nameInput="email"
								typeInput="email"
								textLabel="Email"
								value={email}
								onChange={this.onInputTextChange}
								
							/>
							<InputTextOutlined
								idInput="SigninInput-password"
								nameInput="password"
								typeInput="password"
								textLabel="Contraseña"
								value={password}
								onChange={this.onInputTextChange}
								
							/>
							<InputTextOutlined
								idInput="SigninInput-password2"
								nameInput="password2"
								typeInput="password"
								textLabel="Confirme contraseña"
								value={password2}
								onChange={this.onInputTextChange}
							/>
						</div>
						<div className="tiendas-form-actions">
							<ButtonOutlined
								text="Iniciar Sesión"
								onClick={this.handleClickLogin}
							/>
							<InputButtonContained
								idForm="signin-form"
								text="Registrarse"
							/>
						</div>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	startSigninUserEmail: (email, password) => dispatch(startSigninUserEmail(email, password))
});

export default connect(undefined, mapDispatchToProps)(SigninComponent);