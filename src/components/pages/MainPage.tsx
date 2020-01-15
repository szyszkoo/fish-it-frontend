import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import "./MainPage.scss";
import logo from "./../../assets/img/logo_transparent.png";
import { Switch, Route, useHistory } from "react-router-dom";
import Training from "./TrainingPage/TrainingPage";
import Home from "./HomePage";
import CreateSetPage from "./CreateSetPage/CreateSetPage";
import LoginPage from "./login/LoginPage";
import CreateAccountPage from "./CreateAccount/CreateAccountPage";
import { authenticationService } from "src/services/authentication.service";
import { User } from "src/model/user";


const { Header, Content, Footer, Sider } = Layout;

const MainPage = () => {
    const [isCollapsed, setCollapsed] = React.useState(false);
    const [isLoggedUser, setIsLoggedUser] = React.useState(false);
    const [user, setUser] = React.useState<User>({} as User);
    let history = useHistory();

    authenticationService.userChange.subscribe((data: User) => {
        setUser(data);
        setIsLoggedUser(!isLoggedUser);
    });

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    }

    const goHome = () => {
        history.push("/home");
    }

    const goSignIn = () => {
        history.push("/signIn")
    }

    const goSignUp = () => {
        history.push("/signUp")
    }

    const goLogOut = () => {
        authenticationService.logout();
        history.push("/home");
    }

    const redirectToCreateNewSet = () => {
        history.push("/create");
    }

    const LoginButtons = () => (
        <span className="login-menu">
            <span onClick={goSignIn} className="clickable">Sign in</span>
            <span onClick={goSignUp} className="bordered clickable">Sign up</span>
        </span>
    );

    const LoggedUser = () => (
        <span className="login-menu">
            <span>Hello, {user.username}</span>
            <span onClick={goLogOut} className="bordered clickable">LogOut</span>
        </span>
    );

    return <>
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={isCollapsed} onCollapse={onCollapse} className="menu" >
                <div className="logoDiv" >
                    <img src={logo} alt="" className="logo" />
                </div>
                <Menu defaultSelectedKeys={["1"]} mode="inline" className="menu" >
                    <Menu.Item className="menu" onClick={goHome}>
                        <Icon type="home" />
                        <span>Home</span>
                    </Menu.Item>
                    <Menu.Item className="menu" onClick={redirectToCreateNewSet}>
                        <Icon type="plus" />
                        <span>Create</span>
                    </Menu.Item>
                    <Menu.Item className="menu" onClick={() => history.push("/training")}>
                        <Icon type="trophy" />
                        <span>Train</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="mainHeader" >
                    {!isLoggedUser && <LoginButtons />}
                    {isLoggedUser && <LoggedUser />}
                </Header>
                <Content style={{ margin: "16px 16px" }}>
                    <Switch>
                        <Route exact path="/training" component={Training} />
                        <Route path="/home" component={Home} />
                        <Route exact path="/create" component={CreateSetPage} />
                        <Route exact path="/signIn" component={LoginPage} />
                        <Route exact path="/signUp" component={CreateAccountPage} />
                    </Switch>
                </Content>
                <Footer style={{ textAlign: "center" }}>Fishit ©2019 created by Simpleton</Footer>
            </Layout>
        </Layout>
    </>
}

export default MainPage;
