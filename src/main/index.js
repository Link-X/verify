import {
    objectLen,
    isObject,
    isArray,
    isDate,
    typeOfS,
    getTypeLen,
    getType
} from '@/utils/index.js'
class verify {
    constructor() {
        this.data = null
        this.verify = {}
        this.message = ""
    }
    init(data, verify) {
        // 开发模式
        if (!data || !objectLen(verify)) {
            console.log('设置的校验数据或规则错误')
        }
        this.data = data
        this.verify = verify
    }
    judgeDate (val) {
        return isArray(val) ? (isDate(val[0]) && isDate(val[1])) : isDate(val)
    }
    validatorCallBack (cb) {
        // 自定义校验
        let message = cb && cb.message
        return message
    }
    judgeTop (obj, val) {
        // 校验第一个规则
        const type = obj.type ? obj.type : getType(val)
        const func = typeOfS[type]
        return !(val && func(val))
    }
    judgeBottom (obj, val) {
        // 校验第二个规则
        const section = obj.min && obj.max && obj.type !== 'date'
        if (!section) return false
        const type = getType(val)
        const len = getTypeLen[type](val)
        const lenSection = (len >= obj.min && len <= obj.max)
        return !lenSection
    }
    convertVerify (verify) {
        if (!isObject(verify)) {
            return
        }
        let status = {
            topStatus: false,
            bottomStatus: false,
            message: '',
            key: ''
        }
        for (let v of Object.keys(verify)) {
            const judge = { ...this.verify[v][0], ...this.verify[v][1] }
            const val = this.data[v]
            if (!!judge.validator) {
                status.message = judge.validator(val, this.validatorCallBack)
            } else if (judge.required) {
                status.topStatus = this.judgeTop(judge, val)
                status.bottomStatus = this.judgeBottom(judge, val)
            } else if (!judge.required && judge.min && judge.max) {
                status.bottomStatus = val && this.judgeBottom(judge, val)
            }
            if (status.topStatus || status.bottomStatus || status.message) {
                status.key = v
                return status
            }
        }
        return status
    }
    validate (cb) {
        const status = this.convertVerify(this.verify)
        const result = !(status.topStatus && status.bottomStatus && status.message)
        cb({
            result: result,
            key: status.key || undefined,
            message: status.message || undefined
        })
    }
    finish () {

    }
}
export default verify