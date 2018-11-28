import React, {Component} from 'react';
import {Layout, Icon, Card, Avatar, Col, Row} from 'antd';
import "antd/dist/antd.css";
import "./Jobs.css";

const {Content} = Layout;
const {Meta} = Card;

class Jobs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content style={{margin: '24px 16px', padding: 24, minHeight: 280}}>
                <Row gutter={20} justify={'space-around'} type={'flex'} align={'middle'}>
                    <Col span={8}>
                        <Card
                            style={{width: 300}}
                            cover={<img alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                            actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
                        >
                            <Meta

                                title="Card title"
                                description="This is the d escription"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{width: 300}}
                            cover={<img alt="example"
                                        src="./undraw_programming_2svr.png"/>}
                            actions={[<Icon type="edit"/>, <Icon type="delete"/>]}
                        >
                            <Meta
                                title="Full Stack Developer"
                                description="React, Express, Node, MongoDB"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{width: 300}}
                            cover={<img alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                            actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
                        >
                            <Meta
                                avatar={<Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={20} justify={'space-around'} type={'flex'} align={'middle'}>
                    <Col span={8}>
                        <Card
                            style={{width: 300}}
                            cover={<img alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                            actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
                        >
                            <Meta
                                avatar={<Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{width: 300}}
                            cover={<img alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                            actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
                        >
                            <Meta
                                avatar={<Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{width: 300}}
                            cover={<img alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                            actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
                        >
                            <Meta
                                avatar={<Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                </Row>
            </Content>
        );
    }
}


// const Jobs = () => (
//     <main>
//         hello!
//     </main>
// );

export default Jobs;