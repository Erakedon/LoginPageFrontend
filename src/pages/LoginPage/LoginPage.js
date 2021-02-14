import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { loginRequest } from '../../services/auth';
import "./LoginPage.scss";

const LoginPage = props => {
    const [fieldValue, setFieldValue] = useState({email: "", password: ""});
    const [fieldError, setFieldError] = useState({email: "", password: ""});
    const [fieldIsValid, setFieldIsValid] = useState({email: false, password: false});

    const {setUserLoginKey} = useContext(UserContext);

    const submitLogin = (event) => {
        event.preventDefault();
        Object.keys(fieldValue).forEach(key => validateForm(key));
        if(Object.keys(fieldError).find(fieldName => fieldError[fieldName] !== "") === undefined) executeLogin();
    };

    const executeLogin = () => {
        loginRequest({email: fieldValue["email"], password: fieldValue["password"]})
            .then(response => {
                setUserLoginKey(response.data.secretKey);
                props.history.push("/");
            }).catch(error => {
                if(error.data) switch (error.data) {
                    case "user not found":
                        setFieldError({...fieldError, email: "User with this email does not exist"});
                        break;
                    case "wrong password":
                        setFieldError({...fieldError, password: "Wrong password"});
                        break;
                    default:
                        break;
                }
            })
    };

    const handlechange = (event) => {
        switch (event.target.type) {
            case "email":
                setFieldValue({...fieldValue, email: event.target.value});
                break;
            case "password":
                setFieldValue({...fieldValue, password: event.target.value});
                break;
            default:
                break;
        }
    }

    const validateForm = (field) => {
        switch (field) {
            case "email":
                const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
                if (emailRegex.test(fieldValue["email"])) {
                    setFieldIsValid({...fieldIsValid, email: true});
                    setFieldError({...fieldError, email: ""});
                }
                else {
                    setFieldError({...fieldError, email: "Incorrect email address"});
                    setFieldIsValid({...fieldIsValid, email: false});
                }
                break;

                case "password":
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (passwordRegex.test(fieldValue["password"])) {
                        setFieldIsValid({...fieldIsValid, password: true});
                        setFieldError({...fieldError, password: ""});
                    }
                    else {
                        setFieldError({...fieldError, password: "Password must be at least 8 characters, uppercase letter and special sign"});
                        setFieldIsValid({...fieldIsValid, password: true});
                    }
                    break;
        
            default:
                break;
        }
    }

    return (<div className="LoginPage">
        <div className="loginBox">
            <div className="header">Login</div>
            <div className="loginFormContainer">
                <form onSubmit={submitLogin}>
                    <div className="email">
                        <label>Email</label>
                        <input type="email" value={fieldValue["email"]} onChange={handlechange} onBlur={() => validateForm("email")} />
                        <div className="error">{fieldError["email"]}</div>
                    </div>
                    <div className="password">
                        <label>Password</label>
                        <input type="password" value={fieldValue["password"]} onChange={handlechange} onBlur={() => validateForm("password")} />
                        <div className="error">{fieldError["password"]}</div>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>);
}
 
export default LoginPage;