// 方法一，不支持 Date,正则,undefined,函数等数据，不支持环状结构
// let a = {user:{profile:{name:'deibo'}}} 
// let b = JSON.parse(JSON.stringify(a))
// console.log(a.user===b.user)

// 方法二

const deepClone=function(xxx,cache){
    if(!cache){
        // 创建缓存用来储存拷贝的记录，避免对环式结构（自己引用自己）无限拷贝
        cache = new Map()
    }
    let result 
    // 判断是复杂类型object,为什么不用 typeof 呢？自己试试就知道了
    if(xxx instanceof Object){
        if(cache.get(xxx)){
            return cache.get(xxx)
        }
        // 判断是函数
        if(typeof xxx === 'function'){
            // 判断是普通函数还是箭头函数
            if(xxx.prototype){
                result = function(params){return xxx.apply(this,params)}
            }else{
                result =(...params)=>{return xxx.call(undefined,...params)}
            }
        }else if(xxx instanceof Array){
            result =[]
        }else if(xxx instanceof Date){
            result=new Date(xxx-0)
        }else if(xxx instanceof RegExp){
            result = new RegExp(xxx.source,a.flags)
        }else{
            result = {}
        }
        cache.set(xxx,result)
        // 拷贝所有属性
        for(let key in xxx){
            // 只拷贝自身的属性，不拷贝继承的
            if(a.hasOwnProperty(key)){
                result[key]=deepClone(a[key],cache)
            }
        }
    }else{
        // 不是对象
        return xxx
    }
    return result
}
// 测试代码
let a = {
    number:1, bool:false, str: 'hi', empty1: undefined, empty2: null,
    array: [
    {name: 'frank', age: 18},
    {name: 'jacky', age: 19}
    ],
    date: new Date(2000,0,1,20,30,0),
    regex: /\.(j|t)sx/i,
    obj: { name:'frank', age: 18},
    f1: (a, b) => a + b,
    f2: function(a, b) { return a + b }
}
a.self=a
const b =deepClone(a)
console.log('b',b)
