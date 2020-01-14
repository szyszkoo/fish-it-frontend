import React from 'react';
import { Layout, Form, Input, Icon, Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import './LoginPage.scss';
import { authenticationService } from 'src/services/authentication.service';
import { useHistory } from 'react-router-dom';
import { User } from 'src/model/user';
import { notificationService } from 'src/services/notification.service';


const LoginPage = () => {

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [isSpinning, setIsSpinning] = React.useState<boolean>(false);
    let history = useHistory();




    const userSubmit = async (username: string, password: string) => {
        setIsSpinning(true);
        authenticationService.userChange.subscribe((user: User) => {
            history.push('/home');
        })
        authenticationService.login(username, password)
            .catch(error => {
                console.log(error.response)
                if (error.response.status === 401) {
                    notificationService.error('Wrong username or password, try again.')
                } else {
                    notificationService.error('ERROR');
                }
            }).finally(() => {
                setIsSpinning(false);
            });
    }

    const goSignUp = () => {
        history.push('/SignUp');
    }

    const handleOnUsernameChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setUsername(event.target.value as string);
    }

    const handleOnPasswordChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setPassword(event.target.value as string);
    }

    return (
        <Spin tip="LOADING" spinning={isSpinning} size="large">
            <Layout>
                <div className="login-form" id='login-page'>
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
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleOnPasswordChange}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    onClick={() => userSubmit(username, password)}
                                    type="primary" className="login-form-button">
                                    Log in
                        </Button>
                                <span>
                                    Or <span onClick={() => goSignUp()}>register now!</span>
                                </span>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="item-b">
                        Tu będzie jakaś motywacyjna gadka albo jakiś obrazek
                </div>
                </div>
            </Layout>
        </Spin>
    )
}

export default LoginPage;