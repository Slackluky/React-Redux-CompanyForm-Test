import React from "react";
import { connect } from "react-redux";
import { List, Card, Icon, Modal } from "antd";
import {
  Link
    } from 'react-router-dom';

class CompanyList extends React.Component {
  state = { visible: false ,
            obt_id:'',
  }

  showModal = (id) => {
    
    this.setState({
      visible: true,
    });
    this.setState({ obt_id: id });
  }

  handleOk = () => {
    const id = this.state.obt_id
    this.props.dispatch({type:'REMOVE',id})
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


  render() {
    let {companies} = this.props
    const CompNode =  () =>(
      <List
        grid={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
        locale={{ emptyText: "there is no companies created yet" }}
        dataSource={companies}
        renderItem={(company)=>(
          <List.Item 
          key={company.id}
          company={company}>
                  <Card 
                  title={<Link to={{ pathname: '/OfficeList/'+ company.id}} style={{ fontWeight:"bold", fontSize: 20}} >
                  {company.companyname}</Link> }
                  className="cardC"
                  extra={<div><Icon style={{ fontSize: 18}} type="close" onClick={() => this.showModal(company.id)}/></div>}
                  >
                        <span style={{fontWeight: "bold"}}>
                        Address: <br/> </span>{company.address}<br/>
                        <span style={{fontWeight: "bold"}}>
                        Revenue: <br/> </span> {company.revenue}<br/>
                        <span style={{fontWeight: "bold"}}>
                        Phone Number: <br/> </span> ({company.code}){company.phonumb}
                  </Card>
          </List.Item>
        )}
        />
    );
    
    return (
      <div>
      <CompNode/>
          <Modal
              title="Confirmation"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
            Are you sure want to remove this company?
          </Modal>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  companies: state.companyData
});
export default connect(mapStateToProps)(CompanyList);