import {
    arrayLen,
    objectLen,
    isNumber,
    isString,
    isObject,
    isArray,
    isDate,
    isBoolean
} from '@/utils/index.js'
class verify {
    constructor() {
        this.data = null
        this.verify = {}
        this.typeJudgeData = {
            array: isArray,
            object: isObject,
            number: isNumber,
            string: isString,
            boolean: isBoolean,
            date: this.judgeDate
        }
        this.judgeSectionFunc = {
            array: this.getLen,
            object: this.getObjLen,
            number: this.getNumLen,
            string: this.getLen,
            date: this.getLen
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
    getLen (val) {
        return val.length
    }
    getObjLen (val) {
        return Object.keys(val).length
    }
    getNumLen (val) {
        return val
    }
    judgeDate (val) {
        return isArray(val) ? (isDate(val[0]) && isDate(val[1])) : isDate(val)
    }
    validatorCallBack(cb) {
        // 自定义校验
        let message = cb && cb.message
        return message !== undefined ? message : false
    }
    judgeTop(obj, val) {
        // 校验第一个规则
        const func = this.typeJudgeData[obj.type]
        return obj.type ? !(val && func(val)) : !val
    }
    judgeBootm(obj, val) {
        // 校验第二个规则
        const section = obj.min && obj.max
        const type = (val && val.constructor.name.toLowerCase()) || 'string'
        const len = this.judgeSectionFunc[type](val)
        const lenSection = (len > obj.min && len < obj.max)
        return section ? !lenSection : false
    }
    convertVerify() {
        if (!isObject(this.verify)) {
            return
        }
        let status = {
            stop: false,
            message: ''
        }
        for (let v of Object.keys(this.verify)) {
            const judge = { ...this.verify[v][0], ...this.verify[v][1] }
            const val = this.data[v]
            if (!!judge.validator) {
                status.message = judge.validator(val, this.validatorCallBack)
            } else if (judge.required) {
                status.stop = this.judgeTop(judge, val)
                status.stop = this.judgeBootm(judge, val)
            }
            if (status.stop || status.message) {
                alert(judge.message)
                alert(status.message)
                return
            }
        }
    }
    finish() {

    }
}
export default verify