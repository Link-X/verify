import verifyFunc from '@/main/index.js'
let obj = {
    a: 51,
    b: '122223',
    c: [1, 2, 5, 3],
    d: [],
    k: {
        a: 1
    },
    j: {
        a: 1,
        b: 2,
        c: 2
    }
};
let ver = {
    b: [{
            required: true,
            message: '输入b',
            type: 'string',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 8,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
        }
    ],
    a: [{
        required: true,
        type: 'number',
        min: 10,
        max: 200,
        message: 'number'
    }],
    c: [{
        required: true,
        type: "array",
        min: 1,
        max: 6,
        message: 'array',
        validator: (val, cb) => {
            cb(123)
        }
    }],
    j: [{
        required: false,
        min: 1,
        max: 5,
        message: '12'
    }],
    k: [{
        required: true,
        message: '输入k',
        validator: (val, cb) => {
            console.log(val);
            cb(new Error("111"))
        },
        trigger: 'blur'
    }]
};
const main = new verifyFunc(obj, ver)
main.validate((status) => {
    console.log(JSON.stringify(status))
    console.log(status)
})
