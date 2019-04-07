import React, { Component } from 'react';
import './App.css';
import { Layout, Card, Row, Col  } from 'antd';
import OfficeForm from './formOffice';
import CompanyForm from './formCompany';
import CompanyList from './CompanyList';

const { Content, Footer } = Layout;


class AllComponent extends Component {
  render() {
    return (
      <div >
        
      <Layout className="container">
        <Content className="content"> 
            <Row gutter={12}  >
              <Col span={12}
              xs={24} sm={24} md={12} lg={12} xl={12}
              >
                <Card title={<span style={{ fontSize: 22}}>Create Company</span>} bordered={true} className="card">
                  <CompanyForm/>
                </Card>
              </Col>
              <Col span={12}
              xs={24} sm={24} md={12} lg={12} xl={12}
              >
              <Card title={<span style={{ fontSize: 22}}>Create Office</span>} bordered={true} className="card">
              <OfficeForm/>
                </Card>
              </Col>
            </Row>
            <Row >
              <Col span={24}>
                <Card title={<span style={{ fontSize: 22}}>Companies</span>} className="card">
                <CompanyList />
                </Card>
              </Col>
            </Row>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          <span > created by Luky Setiawan, UI framework By Ant Design, state management by Redux </span>
        </Footer>
      </Layout>
      </div>
    );
  }
}

export default AllComponent;
