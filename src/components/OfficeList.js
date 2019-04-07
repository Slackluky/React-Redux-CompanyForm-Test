import React from "react";
import { connect } from "react-redux";
import { List, Card, Icon, Layout, Typography, Button, Divider, Row, Col, Modal } from "antd";
import {Link} from 'react-router-dom';
import './App.css';
const { Title } = Typography;
const { Content } = Layout;


class OfficeList extends React.Component {

    state = { visible: false ,
              obt_id:'',
              offi_id: '',
    }

  showModal = (id, Oid) => {
    
    this.setState({
      visible: true,
    });
    this.setState({ obt_id: id , offi_id : Oid });
  }

  handleOk = () => {
    const id = this.state.obt_id;
    const Oid = this.state.offi_id
    this.props.dispatch({type:'REMOVE_OFFICE',id, Oid})
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  onDelete = (id, Oid) => {
    this.props.dispatch({type:'REMOVE_OFFICE',id,Oid}) // mengambil value dari widget dan diproses ko reducer
  }

  render() {
    const { targetId } = this.props.match.params //mengambil params dari react-router
    let {companies} = this.props
    const doubled = companies.filter(value=>{
    return value.id === targetId; // mensortir detail dari company dari ID nya
    });

    return doubled.map((company )=> (
      <div key={company.id}>
      <Layout className="container">
        <Content className="content1"> 
        <Card>
          <div>
        <Title level={2}>{company.companyname}</Title>
        <Divider/>
        <Row>
          <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
          <span style={{fontWeight: "bold", fontSize:20}}>
              Address:</span><br/>{company.address}<br/>
              <span style={{fontWeight: "bold", fontSize:20}}>
              Revenue:</span><br/>{company.revenue}<br/>
              <span style={{fontWeight: "bold", fontSize:20}}>
              Phone Number: <br/> </span> ({company.code}){company.phonumb}
              <br/>
          </Col>
          <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Link to='/'>
              <Button block type="primary" className="buttonBack" >Back to Overview</Button>
              </Link>
          </Col>
        </Row>


        </div>
        <Divider/>
        <Title level={3}>Offices:</Title>
        {
        (typeof(company.offices)=='object')?
        <div>
          {
            
     <List
        grid={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
        locale={{ emptyText: "there is no office created yet" }}
        dataSource={company.offices}
        renderItem={(companyoffices, index)=>(
          <List.Item
          key={index}
          companyoffices={companyoffices}
            >
              <Card
              title={<span style={{ fontWeight:"bold", fontSize: 20}}>
              {companyoffices.officename}</span>}
              className="cardC"
              extra={<Icon style={{ fontSize: 18}} type="close" onClick={() => this.showModal(company.id, companyoffices.Oid)}/>}
              >
              <span style={{fontWeight: "bold"}}>
              Location:</span><br/>
              Latitude: {companyoffices.lat}<br/>
              Logitude: {companyoffices.log}<br/>
              <span style={{fontWeight: "bold"}}>
              Office Start Date: <br/> </span> {companyoffices.startdate}<br/>
              </Card>
          </List.Item>
        )}
            />
          }
        </div>
        : null
        }

        </Card>
        </Content>
        </Layout>

                    <Modal
                        title="Confirmation"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                      >
                      Are you sure want to remove this office?
                      </Modal>
      </div>
    ));
  }
}

const mapStateToProps = (state) => ({
  companies: state.companyData
});

export default connect(mapStateToProps)(OfficeList);