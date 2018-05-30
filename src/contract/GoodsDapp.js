'use strict';
class GoodsContent {
    constructor(text) {
        if (text) {
            var gc = JSON.parse(text);
            this.vCode = gc.vCode;
            this.factoryName = gc.factoryName;
            this.desc = gc.desc;
        }
    }

    toString() {
        return JSON.stringify(this);
    }
}

class TheGoodsContract {
    constructor() {
        LocalContractStorage.defineMapProperty(this,'goodsData',{
            parse: text => new GoodsContent(text),
            stringify: o => o.toString()
        });
    }

    defineMapProperty() {
        super.defineMapProperty(this, this.goodsData)
    }

    init() {
        console.log('TheGoodsContract.init');
    }

    save(vCode, desc, fName) {
        if (!vCode || !desc || !fName) {
            throw new Error('Empty vCode or desc or fName!');
        }

        if (vCode.length < 15) {
            throw new Error('THe vCode length must big than 15!');
        }

        if (desc.length > 300) {
            throw new Error('The desc exceed limit length');
        }

        var from = Blockchain.transaction.from;
        var theGoods = this.goodsData.get(vCode);
        if (theGoods) {
            throw new Error("The Goods exist");
        }

        theGoods = new GoodsContent();
        theGoods.vCode = vCode;
        theGoods.desc = desc;
        theGoods.factoryName = fName;

        this.goodsData.put(vCode, theGoods);
    }

    get(vCode) {
        if (!vCode) {
            throw new Error('Empty vCode');
        }
        return this.goodsData.get(vCode);
    }
}

module.exports = TheGoodsContract;