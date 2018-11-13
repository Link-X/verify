export const isArray = (data) =>{
    return Object.prototype.toString.call(data) === '[object Array]'
}

export const isNumber = (data) =>{
    return Object.prototype.toString.call(data) === '[object Number]'
}

export const isString = (data) =>{
    return Object.prototype.toString.call(data) === '[object String]'
}

export const isBoolean = (data) => {
    return Object.prototype.toString.call(data) === '[object Boolean]'
}

export const isFunc = (data) =>{
    return Object.prototype.toString.call(data) === '[object Function]'
}

export const isObject = (data) =>{
    return Object.prototype.toString.call(data) === '[object Object]'
}

export const isNull = (data) =>{
    return Object.prototype.toString.call(data) === '[object Null]'
}

export const arrayLen = (data) => {
    return isArray(data) && data.length
}

export const objectLen = (data) => {
    return isObject(data) && Object.keys(data).length
}

export const isDate = (data) =>{
    return !!data && new Date(data).toString() !== 'Invalid Date'
}