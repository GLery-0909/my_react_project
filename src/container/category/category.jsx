import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetCategoryAsyncAction } from '../../redux/actions/category';
import { Card, Button, Icon, Table, Modal, Input, Form, message } from 'antd';
import { PAGE_SIZE } from '../../config';

const { Item } = Form;

@connect(state => ({ categoryList: state.categoryList }), {
  getCategory: createGetCategoryAsyncAction
})
@Form.create()
class Category extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    this.props.getCategory();
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
        width: '75%'
      },
      {
        title: '操作',
        //dataIndex: 'a',
        key: 'age',
        width: '25%',
        align: 'center',
        render: () => <Button type="link">修改分类</Button>
      }
    ];
    return (
      <div>
        <Card
          extra={
            <Button type="primary" onClick={this.showModal}>
              <Icon type="plus-circle" />
              添加
            </Button>
          }
        >
          <Table
            dataSource={this.props.categoryList}
            columns={columns}
            bordered
            pagination={{ pageSize: PAGE_SIZE }}
            rowKey="_id"
          />
        </Card>
        <Modal
          title="添加分类" //
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('categoryName', {
                rules: [{ required: true, message: '分类名必须输入' }]
              })(<Input placeholder="请输入分类名" />)}
            </Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Category;
