import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import "./MainPage.scss";
import logo from "./../../assets/img/logo_transparent.png"; // TODO: handle paths
import { Switch, Route, useHistory } from "react-router-dom";
import Training from "./TrainingPage";
import Home from "./HomePage";
import CreatePage from "./CreatePage";

const { Header, Content, Footer, Sider } = Layout;

const MainPage = () => {
    const [isCollapsed, setCollapsed] = React.useState(false);
    let history = useHistory();

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    }

    const goHome = () => {
        history.push("/home");
    }

    const redirectToCreateNewSet = () => {
        history.push("/create");
    }

    return <>
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={isCollapsed} onCollapse={onCollapse} className="menu" >
                <div className="logoDiv" >
                    <img src={logo} alt="" className="logo" />
                </div>
                <Menu defaultSelectedKeys={["1"]} mode="inline" className="menu" >
                    <Menu.Item className="menu" onClick={goHome}>
                        <Icon type="pie-chart" />
                        <span>Home</span>
                    </Menu.Item>
                    <Menu.Item className="menu" onClick={redirectToCreateNewSet}>
                        <Icon type="pie-chart" />
                        <span>Create</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="mainHeader" >
                    <p className="mainHeaderDescription">
                        My awesome site
                            </p>
                </Header>
                <Content style={{ margin: "16px 16px" }}>
                    <Switch>
                        <Route exact path="/training" component={Training} />
                        <Route path="/home" component={Home} />
                        <Route exact path="/create" component={CreatePage} />
                    </Switch>
                </Content>
                <Footer style={{ textAlign: "center" }}>Fishit ©2019 created by Simpleton</Footer>
            </Layout>
        </Layout>
    </>
}

export default MainPage;
