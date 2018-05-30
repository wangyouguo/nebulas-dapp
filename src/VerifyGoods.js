'use strict';
import React, { Component } from 'react';
import { Input } from 'antd';
import Api from './SmartContractApi';
const Search = Input.Search;

export default class VerifyGoods extends Component {
    constructor(props) {
        super(props);
        this.fingGoodsInfo = this.fingGoodsInfo.bind(this);
        this.state = {
            goodsInfo: {
                vCode: '',
                desc: '',
                factoryName: ''
            },
            error: false,
            emptyGoodsId: false
        }

    }

    render() {
        return (<div className=''>
            <Search className='goods-search-input'
                placeholder="请输入商品识别码"
                onSearch={value => this.fingGoodsInfo(value)}
                enterButton
            />
            <div className='error-search-msg-tip'>
                {
                    this.state.emptyGoodsId ? '商品编号不能为空' : ''
                }
            </div>

            <div className='result-layout'>
                <span className='result-title'>查询结果：</span>
                <ul>
                    <li>商品编号：{this.state.goodsInfo.vCode}</li>
                    <li>商品描述：{this.state.goodsInfo.desc}</li>
                    <li>生产厂家：{this.state.goodsInfo.factoryName}</li>
                </ul>
                <div className='error-msg-tip'>
                    {
                        this.state.error ? '未查找到此编号商品信息。' : ''
                    }
                </div>
            </div>

        </div>)
    }

    fingGoodsInfo(value) {
        //let vCode = 'GID12345678987656';
        if (value.length == 0) {
            this.updateSearchViewErrorTip(true);
            return;
        }
        this.updateSearchViewErrorTip(false);
        Api.get(value).then(resp => {
            console.log(`resp===${resp}`);
            this.updateResult(resp);
        }).catch(e => console.log(`error${e}`));
    }

    updateSearchViewErrorTip(empty) {
        this.setState({
            emptyGoodsId: empty
        });
    }

    updateResult(resp) {
        let result = resp && resp.result;
        let data = result ? Object.assign({}, JSON.parse(resp.result)) : {};
        console.log(`goodsInfo${data}`);
        this.setState((prevState, props) => {
            prevState.vCode = '';
            prevState.desc = '';
            prevState.factoryName = '';
            prevState.error = result == 'null'
            return {
                goodsInfo: Object.assign({}, this.state.prevState, data)
            }
        });


    }

}