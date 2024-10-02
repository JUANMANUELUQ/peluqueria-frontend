import React, {useState} from 'react';
import './UserData.css';

function DataRegisterUser() {
    const [fullName, setFullName] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleSubmit() {
        //Aquí  agregar la lógica para registrar un usuario
        console.log('User registered successfully');
        alert("User registration was successful");
    }


    return (
            <div className="BackgroundB2">
                <div className="BackgroundB21">
                    <body>
                    <h2 className="titlePage3">
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Bigshot+One&display=swap');
                        </style>
                        Create an account
                    </h2>
                    <div className="inputRegisterBox">
                        <style>
                            @import
                            url('https://fonts.googleapis.com/css2?family=Abel&family=Bigshot+One&display=swap');
                        </style>
                        <div className="boxL">
                            <div className="registerBox">
                                <label className="fullName">Full Name:</label>
                                <input
                                    type="text"
                                    required="required"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="registerBox">
                                <label className="address">Address:</label>
                                <input
                                    type="text"
                                    required="required"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="registerBox">
                                <label className="password">Password</label>
                                <input
                                    type="text"
                                    required="required"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="registerButton" onClick={handleSubmit}>
                                <style>
                                    @import url('https://fonts.googleapis.com/css2?family=Bigshot+One&display=swap');
                                </style>
                                Register
                            </button>
                            <a href="https://www.google.com" className="haveAnAccount">Already have an account? Log in</a>
                        </div>
                        <div className="boxR">
                            <div className="registerBox">
                                <label className="id">Id:</label>
                                <input
                                    type="text"
                                    required="required"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </div>
                            <div className="registerBox">
                                <label className="number">Phone Number:</label>
                                <input
                                    type="text"
                                    required="required"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                /></div>
                            <div className="registerBox">
                                <label className="email">Email</label>
                                <input
                                    type="text"
                                    required="required"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    </body>

                </div>
            </div>
    );
}

export {DataRegisterUser};