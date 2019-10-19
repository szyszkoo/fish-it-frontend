import * as React from 'react';
import Card from './Card';
import { Layout, Menu, Icon } from "antd";
import 'antd/dist/antd.css';
import "./MainPage.scss";
import logo from "./../assets/img/logo_transparent.png";

export interface IMainPageProps {
}

export interface IMainPageState {
    isCollapsed: boolean
}

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class MainPage extends React.Component<IMainPageProps, IMainPageState> {
    constructor(props: IMainPageProps) {
        super(props);
        this.state = {
            isCollapsed: false
        };
    }

    public render() {
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.isCollapsed} onCollapse={this.onCollapse} className="menu" >
                        <div className="logoDiv" >
                            <img src={logo} alt="" className="logo" />
                        </div>
                        <Menu defaultSelectedKeys={['1']} mode="inline" className="menu" >
                            <Menu.Item key="1" className="menu">
                                <Icon type="pie-chart" />
                                <span>Option 1</span>
                            </Menu.Item>
                            <Menu.Item key="2" className="menu">
                                <Icon type="desktop" />
                                <span>Option 2</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                className="menu"
                                title={
                                    <span>
                                        <Icon type="user" />
                                        <span>User</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="3">Tom</Menu.Item>
                                <Menu.Item key="4">Bill</Menu.Item>
                                <Menu.Item key="5">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="team" />
                                        <span>Team</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="6">Team 1</Menu.Item>
                                <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                                <Icon type="file" />
                                <span>File</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className="mainHeader" >
                            <p className="mainHeaderDescription">
                                My awesome site
                            </p>
                        </Header>
                        <Content style={{ margin: '16px 16px' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <Card shortDescription="Create a new set" description="Create a new set of your vocabulary flashcards" onClick={() => alert("Would redirect to the new set creation site")}/>
                                <Card shortDescription="Start practising!" description="Create a new set of your vocabulary flashcards" onClick={() => alert("Would redirect to the practising view")}/>
                                <Card shortDescription="Some third option" description="Create a new set of your vocabulary flashcards" onClick={() => alert("Would redirect somewhere else")}/>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Fishit ©2019 created by Simpleton</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }

    private onCollapse = (collapsed: boolean) => {
        this.setState({
            isCollapsed: collapsed
        })
    }
}
