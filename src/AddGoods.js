'use strict';
import React, { Component } from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import Api from './SmartContractApi';
const FormItem = Form.Item;
class AddGoods extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label='商品编号'>

                    {
                        getFieldDecorator('goodsVCode', {
                            rules: [{
                                required: true, message: '请输入商品编号',
                            },
                            {
                                validator: this.validateGoodsVCode,
                              }],
                        })
                            (<Input className='form-item-input'/>)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='商品详情'>

                    {
                        getFieldDecorator('goodsDesc', {
                            rules: [{
                                required: true, message: '请输入商品详情',
                            }],
                        })
                            (<textarea className='form-item-input'/>)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='生产厂商'>

                    {
                        getFieldDecorator('goodsFactory', {
                            rules: [{
                                required: true, message: '请输入商品生产厂商',
                            }],
                        })
                            (<Input className='form-item-input' />)
                    }
                </FormItem>

                <FormItem >
                    <Button type="primary" htmlType="submit" className='form-confrim-btn'>确认添加</Button>
                </FormItem>
            </Form>
        );
    }


    validateGoodsVCode(rule,value,callback){
        if(value && value.length<15){
            callback('商品编号必须大于等于15位');
        }else{
            callback();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        //const value = e.target.value;
        this.props.form.validateFields((err,values)=>{
            if (!err) {
                console.log(`value====${JSON.stringify(values)}`);
                Api.save(`["${values.goodsVCode}","${values.goodsDesc}","${values.goodsFactory}"]`, resp => {
                    console.log(`resp==2222=---${JSON.stringify(resp)}`);
                    if(resp && resp.txhash){
                        message.success('添加成功')
                    }else{
                        message.error('添加失败')
                    }
                });
            }
        });
    }
}
const WrappedAddGoods = Form.create()(AddGoods);

export default WrappedAddGoods;