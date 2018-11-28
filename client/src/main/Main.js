import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import "antd/dist/antd.css";
import Home from '../home/Home';
import Candids from '../candids/Candids';
import Jobs from '../jobs/Jobs';
import Explore from '../explore/Explore';
import Stats from '../stats/Stats';

const {Header, Sider, Content} = Layout;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    render() {
        return (
            <Layout className="jobs-layout">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo">
                        Dashboard
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/">
                            <Icon type="home"/>
                            <span>Home</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/candids">
                            <Icon type="team"/>
                            <span>Candidates</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/jobs">
                            <Icon type="folder"/>
                            <span>Jobs</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/stats">
                                <Icon type="line-chart"/>
                                <span>Statistics</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/explore">
                                <Icon type="github"/>
                                <span>Explore</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/candids' component={Candids}/>
                            <Route path='/jobs' component={Jobs}/>
                            <Route path='/explore' component={Explore}/>
                            <Route path='/stats' component={Stats}/>
                        </Switch>

                </Layout>
            </Layout>
        );
    }
}

export default Main;