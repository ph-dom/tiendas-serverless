import React from 'react';
import { Link } from 'react-router-dom';

const HomeComponent = () => (
    <React.Fragment>
        <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__inner">
                <div className="mdc-layout-grid__cell">
                    <p>Hola</p>
                    <Link to="/signin">Registrarse</Link>
                    <Link to="/login">Iniciar Sesión</Link>
                </div>
            </div>
        </div>
        
    </React.Fragment>
);

export default HomeComponent;