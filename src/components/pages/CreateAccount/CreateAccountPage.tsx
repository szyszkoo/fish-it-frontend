
import React from 'react';
import { Layout, Form, Input, Icon, Button } from 'antd';
import 'antd/dist/antd.css';
import './CreateAccountPage.scss';
import { useHistory } from 'react-router-dom';
import { axiosInstance } from 'src/interceptors/interceptor';
import { AxiosResponse } from 'axios';
const { } = Layout;

const CreateAccountPage = () => {

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [repPassword, setRepPassword] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [firstname, setFirstname] = React.useState<string>("");
    let history = useHistory();

    const submit = async (usernameV: string, passwordV: string, firstnameV: string, emailV: string) => {
        let data = {
            email: emailV,
            firstname: '',
            password: passwordV,
            username: usernameV,
        }
        axiosInstance.post('/user', data).then(((user: AxiosResponse<number>) => {
            console.log(data);
        }));
        // {
        //     "email": "agataszyszko@gmail.com",
        //     "firstname": "Agata",
        //     "password": "ploki",
        //     "username": "szyszkooo"
        // }
    }

    const handleOnUsernameChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setUsername(event.target.value as string);
    }

    const handleOnPasswordChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setPassword(event.target.value as string);
    }

    const handleOnRepPasswordChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setRepPassword(event.target.value as string);
    }

    const handleOnEmailChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setEmail(event.target.value as string);
    }

    return (
        <Layout>
            <div className="login-form">
                <div className="item-a">
                    <Form>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="email address"
                                value={email}
                                onChange={handleOnEmailChange}
                                type="email"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                value={username}
                                onChange={handleOnUsernameChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleOnPasswordChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Repeat password"
                                value={repPassword}
                                onChange={handleOnRepPasswordChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                onClick={() => submit(username, password, firstname, email)}
                                type="primary" htmlType="submit" className="login-form-button">
                                Create Account
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="item-b">
                    Create Page
                </div>
            </div>
        </Layout>
    )
}

export default CreateAccountPage;