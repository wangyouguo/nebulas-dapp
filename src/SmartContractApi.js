'use strict'
import * as crypto from 'crypto';
import Nebulas from './lib';
import config from './config.json';
import NebPay from './lib/pay/nebpay';

const testUrl = 'https://testnet.nebulas.io';
const CONTRACT_ADDRESS = "n1n3mkdkSpyrka6rH42GiJrzabDQUSVWuv7";
const from = 'n1a7SWwXurYNwzRdUtMeaeCTK8HFeK9NEjC';

class ContarctApi {
    constructor() {
        this.neb = new Nebulas.Neb();
        this.neb.setRequest(new Nebulas.HttpRequest(testUrl));
        this.nebPay = new NebPay();
    }

    get(gId) {
        return this._doGet({
            value: 0,
            gas_price: '1000000',
            gas_limit: '200000',
            contract: {
                function: 'get',
                args: `["${gId}"]`
            }

        })
            .then(resp => {
                console.log(`resp-->+${JSON.stringify(resp)}`);
                return resp;
            })
            .catch(error => {
                console.log(`error-->+${JSON.stringify(error)}`);
                return error;
            });
    }

    save(param, listener) {
        if (param) {
            this._doSave({
                to: CONTRACT_ADDRESS,
                value: 0,
                callFunction: 'save',
                callArgs: param,
                listener: listener
            });
        } else {

            throw new Error('参数错误');
        }
    }

    _doSave(param) {
        this.nebPay.call(param.to, param.value, param.callFunction, param.callArgs, {
            listener: param.listener
        });

    }

    parseDate(param, nonce) {
        var account = Nebulas.Account.NewAccount();
        var chainID = 10;//parseInt(localSave.getItem('chainId'));
        var tx = new Nebulas.Transaction({
            chainID: chainID,
            from: account,
            to: CONTRACT_ADDRESS,
            value: 0,
            nonce: nonce,
            gasPrice: 1000000,
            gasLimit: 2000000,
            contract: {
                function: 'save',
                args: `${param}`
            }
        });
        tx.signTransaction();

        return tx.toProtoString();
    }



    _doGet({ value = "0", nonce = '0', gas_price = "1000000", gas_limit = "1000000", contract } = {}) {
        console.log(`=====contract${JSON.stringify(contract)},${from},${CONTRACT_ADDRESS}`);
        return this.neb.api.call({
            from: from,
            to: CONTRACT_ADDRESS,
            value: value,
            gasPrice: gas_price,
            gasLimit: gas_limit,
            contract: contract
        });
    }

}
var Api = new ContarctApi();
export default Api;