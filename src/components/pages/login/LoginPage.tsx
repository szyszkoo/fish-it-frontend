import React from 'react';
import { Layout, Form, Input, Icon, Button } from 'antd';
import 'antd/dist/antd.css';
import './LoginPage.scss';
import { authenticationService } from 'src/services/authentication.service';
const { } = Layout;

const LoginPage = () => {

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");


    const submit = async (username: string, password: string) => {
        authenticationService.login(username, password);
    }

    const handleOnUsernameChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setUsername(event.target.value as string);
    }

    const handleOnPasswordChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setPassword(event.target.value as string);
    }

    return (
        <Layout>
            <div className="login-form">
                <div className="item-a">
                    <Form>
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
                            <Button
                                onClick={() => submit(username, password)}
                                type="primary" htmlType="submit" className="login-form-button">
                                Log in
                        </Button>
                            <span>
                                Or <a href="">register now!</a>
                            </span>
                        </Form.Item>
                    </Form>
                </div>
                <div className="item-b">
                    Tu będzie jakaś motywacyjna gadka albo jakiś obrazek
                </div>
            </div>
        </Layout>
    )
}

export default LoginPage;