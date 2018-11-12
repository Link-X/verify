export const isArray = (data) =>{
    return toString.call(data) === '[object Array]'
}

export const isNumber = (data) =>{
    return toString.call(data) === '[object Number]'
}

export const isString = (data) =>{
    return toString.call(data) === '[object String]'
}

export const isBoolean = (data) => {
    return toString.call(data) === '[object Boolean]'
}

export const isFunc = (data) =>{
    return toString.call(data) === '[object Function]'
}

export const isObject = (data) =>{
    return toString.call(data) === '[object Object]'
}

export const isNull = (data) =>{
    return toString.call(data) === '[object Null]'
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