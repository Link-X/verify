import {
    arrayLen,
    objectLen,
    isNumber,
    isString,
    isObject
} from '@/utils/index.js'
class verify {
    constructor() {
        this.data = null
        this.verifyData = {}
        this.verify = {}
        this.typeJudgeData = {
            array: arrayLen,
            object: objectLen
        }
    }
    init(data, verify) {
        // 开发模式
        if (!data || !objectLen(verify)) {
            console.log('设置的校验数据或规则错误')
        }
        this.data = data
        this.verify = verify
    }
    validatorCallBack (cb) {
        let message = ''
        try {
            cb()
        } catch (err) {
            message = err.substring(lastIndexOf('at <anonymous>:1') + 1, err.length)
        }
        return message || false
    }
    typeJudge (key, type) {
        const func = this.typeJudgeData[type]
        return func(this.data[key])
    }
    convertVerify() {
        if (isObject(this.verify)) {
            return
        }
        let stop = false
        for (let v of Object.keys(this.verify)) {
            const judge1 = this.verify[v][0]
            const judge2 = this.verify[v][1] || []
            if (!!judge1.validator) {
                stop = judge1.validator(this.validatorCallBack)
            } else if (judge1.type){
                stop = this.typeJudge(judge1.type, v)
            }
        }
    }
    finish() {

    }
}
export default verify