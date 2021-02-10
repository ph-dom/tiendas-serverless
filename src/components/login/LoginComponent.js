import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import InputTextOutlined from '../shared/inputs/textoutlined';
import InputButtonContained from  '../shared/inputs/buttoncontained';
import InputButtonOutlined from '../shared/buttons/buttonoutlined';
import { startLoginUser } from '../../redux/user/actions';

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
		this.props.startLoginUser(email, password);
    }
    
    handleClickSignin = (event) => {
        event.preventDefault();
        this.props.history.push('/signin');
    }

	render() {
		const { email, password } = this.state;
		return (
			<React.Fragment>
				<Typography variant="h2" className="text-center">
					Tiendas
				</Typography>
				<form id="login-form" onSubmit={this.handleSubmitForm} autoComplete="off" className="tiendas-form">
					<div className="tiendas-form-inputs">
						<InputTextOutlined
							idInput="LoginInput-email"
							nameInput="email"
							typeInput="email"
							textLabel="Email"
							value={email}
							onChange={this.onInputTextChange}
						/>
						<InputTextOutlined
							idInput="LoginInput-password"
							nameInput="password"
							typeInput="password"
							textLabel="Contraseña"
							value={password}
							onChange={this.onInputTextChange}
						/>
					</div>
					<div className="tiendas-form-actions">
						<InputButtonOutlined
							onClick={this.handleClickSignin}
							text="Registrarse"
						/>
						<InputButtonContained
							idForm="login-form"
							text="Iniciar Sesión"
						/>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	startLoginUser: (email, password) => dispatch(startLoginUser(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginComponent);