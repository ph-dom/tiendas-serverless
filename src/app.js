import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles'
import AppRouter from './components/AppRouter';
import store from './redux/index';
import theme from './config/theme';

const App = () => (
    <Provider store={store}>
		<ThemeProvider theme={theme}>
			<AppRouter/>
		</ThemeProvider>
	</Provider>
);

export default App;