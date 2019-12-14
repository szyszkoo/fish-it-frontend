import React from 'react';
import { Layout, Form, Input, Icon, Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import './CreateAccountPage.scss';
import { useHistory } from 'react-router-dom';
import { axiosInstance } from 'src/interceptors/interceptor';
import { AxiosResponse } from 'axios';
import { notificationService } from 'src/services/notification.service';


const CreateAccountPage = () => {

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [isSpinning, setIsSpinning] = React.useState<boolean>(false);

    let history = useHistory();

    const submit = async (usernameV: string, passwordV: string, emailV: string) => {
        setIsSpinning(true);
        let data = {
            email: emailV,
            firstname: '',
            password: passwordV,
            username: usernameV,
        }
        axiosInstance.post('/user', data).then(((responseData: AxiosResponse<{ id: string }>) => {
            notificationService.success('User has been created.');
            history.push('/SignIn')
        })).catch((error) => {
            if (error.response.status === 400) {
                notificationService.error(error.response.data);
            } else {
                notificationService.error('Error');
            }
        }).finally(() => {
            setIsSpinning(false);
        });
    }

    const handleOnUsernameChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setUsername(event.target.value as string);
    }

    const handleOnPasswordChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setPassword(event.target.value as string);
    }

    const handleOnEmailChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setEmail(event.target.value as string);
    }

    return (
        <Spin tip="CREATING" spinning={isSpinning} size="large">
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
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleOnPasswordChange}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    onClick={() => submit(username, password, email)}
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
        </Spin>
    )
}

export default CreateAccountPage;