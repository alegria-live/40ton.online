import React from 'react';
import RegisterForm from '../../../Containers/RegisterForm/RegisterForm';

const Register = props => (
    <div className="container mt-5 p-2">       
        <div className="card">
            <h5 className="card-header">{props.formName}</h5>
            <div className="card-body">
                <RegisterForm />
            </div>
        </div>        
    </div>
);
export default Register;