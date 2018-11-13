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
    getType (val) {
        return (val && val.constructor.name.toLowerCase()) || 'string'
    }
    judgeDate (val) {
        return isArray(val) ? (isDate(val[0]) && isDate(val[1])) : isDate(val)
    }
    validatorCallBack (cb) {
        // 自定义校验
        let message = cb && cb.message
        return message !== undefined ? message : false
    }
    judgeTop (obj, val) {
        // 校验第一个规则
        const type = obj.type ? obj.type : this.getType(val)
        const func = this.typeJudgeData[type]
        return !(val && func(val))
    }
    judgeBottom (obj, val) {
        // 校验第二个规则
        const section = obj.min && obj.max
        const type = this.getType(val)
        const len = this.judgeSectionFunc[type](val)
        const lenSection = (len >= obj.min && len <= obj.max)
        return section ? !lenSection : false
    }
    convertVerify (verify) {
        if (!isObject(verify)) {
            return
        }
        let status = {
            top: false,
            bottom: false,
            message: '',
            key: ''
        }
        for (let v of Object.keys(verify)) {
            const judge = { ...this.verify[v][0], ...this.verify[v][1] }
            const val = this.data[v]
            if (!!judge.validator) {
                status.message = judge.validator(val, this.validatorCallBack)
            } else if (judge.required) {
                status.top = this.judgeTop(judge, val)
                status.bottom = this.judgeBottom(judge, val)
            } else if (!judge.required && judge.min && judge.max) {
                status.bottom = val && this.judgeBottom(judge, val)
            }
            if (status.top || status.bottom || status.message) {
                status.key = v
                alert(v)
                return status
            }
        }
        return status
    }
    validate () {
        const status = this.convertVerify(this.verify)
        console.log(status)
    }
    finish () {

    }
}
var app = document.createElement('div');
app.innerHTML = '<h1>Hello World h1</h1>';
document.body.appendChild(app);
export default verify