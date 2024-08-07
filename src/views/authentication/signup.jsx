import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './common.css'
import UserPool from '../../UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(true);
    const firstNameRef = useRef();

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(true);

    // check if user name is already present
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        firstNameRef.current.focus();
    }, []);

    function validateFirstNameAndSet(e) {
        const inputFn = e.target.value;
        const fName = inputFn;
        const fNameRegex = /^[a-zA-Z ]+$/;

        if (fNameRegex.test(fName)) {
            setValidFirstName(true);
        } else {
            setValidFirstName(false);
        }
        setFirstName(fName);
    }

    function validateLastNameAndSet(e) {
        const inputLn = e.target.value;
        const lName = inputLn;
        const lNameRegex = /^[a-zA-Z ]+$/;

        if (lNameRegex.test(lName)) {
            setValidLastName(true);
        } else {
            setValidLastName(false);
        }
        setLastName(lName);
    }

    function validateEmailAndSet(e) {
        const inputEmail = e.target.value;

        const email = inputEmail;
        // email is an email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (emailRegex.test(email)) {
            setValidEmail(true);
        }
        else {
            setValidEmail(false);
        }
        setEmail(email);
    }

    function validatePasswordAndSet(e) {
        const pwd = e.target.value;
        const pwdRegex = /^.{8,}$/;

        if (pwdRegex.test(pwd)) {
            setValidPassword(true);
        }
        else {
            setValidPassword(false);
        }
        setPassword(pwd);
    }

    function validateConfirmPassword(e) {
        const confirmedPwd = e.target.value;
        if (confirmedPwd.match(password)) {
            setPasswordMatch(true);
        }
        else {
            setPasswordMatch(false);
        }
    }

    function validatePhoneNumberAndSet(e) {
        const phoneNumber = (e.target.value);
        const phoneNumberRegex = /^(\+[1]\s?)?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/;

        if (phoneNumberRegex.test(phoneNumber)) {
            setValidPhoneNumber(true);
        }
        else {
            setValidPhoneNumber(false);
        }
        setPhoneNumber(phoneNumber);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (firstName !== '' && lastName !== '' && email !== '' && password !== '' && phoneNumber !== ''
            && validFirstName && validLastName && validEmail && validPassword && passwordMatch && validPhoneNumber) {

            const firstNameAttribute = new CognitoUserAttribute({ Name: 'custom:firstName', Value: firstName });
            const lastNameAttribute = new CognitoUserAttribute({ Name: 'custom:lastName', Value: lastName });
            const phoneNumberAttribute = new CognitoUserAttribute({ Name: 'custom:phoneNumber', Value: phoneNumber });
            const attributeList = [firstNameAttribute, lastNameAttribute, phoneNumberAttribute];

            console.log(UserPool);

            UserPool.signUp(email, password, attributeList, null, (err, data) => {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                navigate('/signin');
            });
        }
        else {
            alert("Invalid field(s), please enter valid values.");
            window.location.reload();
        }
    }


    return (
        <div className='signup-page'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card signup-card glass'>
                            <div className="tab-content">
                                <h2 style={{ color: "#333333" }}>Sign Up</h2>
                                <form>
                                    <div className='form-group m-1'>
                                        <label>First Name</label>
                                        <input type='text' ref={firstNameRef} className='form-control' placeholder='Enter first name' onInput={validateFirstNameAndSet} value={firstName} />
                                        {validFirstName ? null : <small style={{ color: 'red' }}>Please enter a valid first name</small>}
                                    </div>
                                    <div className='form-group m-1'>
                                        <label>Last Name</label>
                                        <input type='text' className='form-control' placeholder='Enter last name' onInput={validateLastNameAndSet} value={lastName} />
                                        {validLastName ? null : <small style={{ color: 'red' }}>Please enter a valid last name</small>}
                                    </div>
                                    <div className='form-group m-1'>
                                        <label>Email</label>
                                        <input type='text' className='form-control' placeholder='Enter email' onInput={validateEmailAndSet} value={email} />
                                        {validEmail ? null : <small style={{ color: 'red' }}>Please enter a valid email</small>}
                                    </div>
                                    <div className='form-group m-1'>
                                        <label>Phone number</label>
                                        <input type='text' className='form-control' placeholder='Enter phone number' onInput={validatePhoneNumberAndSet} value={phoneNumber} />
                                        {validPhoneNumber ? null : <small style={{ color: 'red' }}>Please enter a valid Canadian phone number</small>}
                                    </div>
                                    <div className='form-group m-1'>
                                        <label>Password</label>
                                        <input type='password' className='form-control' placeholder='Enter password' onInput={validatePasswordAndSet} value={password} />
                                        {validPassword ? null : <small style={{ color: 'red' }}>Passwords must be minimum 8 characters</small>}
                                    </div>
                                    <div className='form-group m-1'>
                                        <label>Confirm password</label>
                                        <input type='password' className='form-control' placeholder='Confirm password' onInput={validateConfirmPassword} />
                                        {passwordMatch ? null : <small style={{ color: 'red' }}>Passwords do not match</small>}
                                    </div>
                                    <button type='submit' className='btn btn-primary m-1' onClick={handleSubmit} >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;