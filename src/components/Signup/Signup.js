import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./Signup.css";
import { Link } from "react-router-dom";
import Reaptcha from 'reaptcha';

function Signup() {

    const [signupData, setSignupData] = useState({});
    const [msg, setMsg] = useState("");
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let captcha = useRef(null);

    const verifyRecaptchaCallback = () => {
        setIsCaptchaVerified(true);
    }

    const onChangehandler = (e, key) => {
        let newSignupData = signupData;
        newSignupData[e.target.name] = e.target.value;
        setSignupData(signupData);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        captcha.reset();

        setIsCaptchaVerified(false);
        setIsLoading(true);
        axios
            .post("http://localhost:8000/api/user-signup", signupData)
            .then((response) => {
                setIsLoading(false);

                if (response.data.status === 200) {
                    setSignupData({});
                    setMsg(response.data.message);
                    setTimeout(() => {
                        setMsg("");

                    }, 2000);
                }

                if (response.data.status === "failed") {
                    setMsg(response.data.message);
                    setTimeout(() => {
                        setMsg("");

                    }, 2000);
                }
            });
    };

        return (
            <div>
                <h1>Register</h1>

                <Form className="containers shadow">
                    <FormGroup>
                        <Label for="name">Full Name</Label>
                        <Input
                            type="name"
                            name="name"
                            placeholder="Enter full name"
                            value={signupData.name}
                            onChange={onChangehandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={signupData.phone}
                            onChange={onChangehandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email id</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={signupData.email}
                            onChange={onChangehandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={signupData.password}
                            onChange={onChangehandler}
                        />
                    </FormGroup>
                    <div className="recaptcha">
                        {/* <Recaptcha
                        sitekey="6LcRB2scAAAAAJf0o2z3UvbNUGXMF4sJgYMZ80Q3"
                        render="explicit"
                        verifyCallback={verifyRecaptchaCallback}
                    /> */}
                        <Reaptcha
                            ref={e => (captcha = e)}
                            sitekey="6LcRB2scAAAAAJf0o2z3UvbNUGXMF4sJgYMZ80Q3"
                            onVerify={verifyRecaptchaCallback}
                        />
                    </div>
                    <p className="text-danger">{msg}</p>

                    <div className="text-center">
                        <Button
                            className="text-center mb-4"
                            color="success"
                            onClick={onSubmitHandler}
                            disabled={!isCaptchaVerified || isLoading}
                        >
                            Sign Up
                            {isLoading ? (
                                <span
                                    className="spinner-border spinner-border-sm ml-5"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            ) : (
                                <span></span>
                            )}
                        </Button>

                        <div>
                            <Link to="/home" className="ml-5">Go to User List</Link>
                        </div>
                    </div>

                </Form>
            </div>
        );
}

export default Signup;