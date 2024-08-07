import React, { useState, useEffect, useRef } from "react";
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const { getAuthData } = useAuth();

    useEffect(() => {
        const userInfo = getAuthData()?.userInfo;
        setFirstName(userInfo?.firstName);
        setLastName(userInfo?.lastName);
        setEmail(userInfo?.email);
        setPhone(userInfo?.phoneNumber);
    }, []);

    return (
        <div className="text-white">
            <div className="background">
                <div className="row d-flex pcontainer">
                    <div className="col-md-4 ">
                        <div className="card display glass">
                            <div className="card-body">
                                <div>
                                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar" />
                                </div>
                                <div>
                                    <h5 className="card-title text-center text-light">{firstName + " " + lastName}</h5>
                                    <div className="social-accounts text-center ">
                                        <a href="#" className="social-link px-4">
                                            <Icon.Facebook
                                                iconname="Facebook"
                                                color="royalblue"
                                                size={30}
                                                className="align-left"
                                            />
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                        <a href="#" className="social-link px-4">
                                            <Icon.Twitter
                                                iconname="Twitter"
                                                color="#1DA1F2"
                                                size={30}
                                                className="align-left"
                                            />
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="#" className="social-link px-4">
                                            <Icon.Instagram
                                                iconname="Instagram"
                                                color=" #cd486b"
                                                size={30}
                                                className="align-left"
                                            />
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="info mx-5 glass">
                            <h4 className="text-center m-3">Personal Information</h4>
                            <div className="d-flex justify-content-center my-5">
                                <div className=" row col-md-7 align-items-end">
                                    <div className="form-label fw-bolder text-center">First Name</div>
                                    <div className="form-label fw-bolder text-center">Last Name</div>
                                    <div className="form-label fw-bolder text-center">Email</div>
                                    <div className="form-label fw-bolder text-center">Phone</div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-label text-center">{firstName}</div>
                                    <div className="form-label text-center">{lastName}</div>
                                    <div className="form-label text-center">{email}</div>
                                    <div className="form-label text-center">{phone}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
