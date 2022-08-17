// 方法一
var uniq1 =function(xxx){return [...new Set(xxx)]}  
// 方法二
var uniq2 = function(xxx){
    var map =new Map()
    for(let i =0;i<xxx.length;i++){
        let number =xxx[i]
        if(number === undefined){continue}
        if(map.has(number)){
            continue
        }
        map.set(number,true)
    }
    return [...map.keys()]
}
// 测试代码
let 原数组 =[1,1,2,2,3,3]
let 新数组1 =uniq1(原数组)
let 新数组2 =uniq2(原数组)
console.log('新数组1',新数组1)
console.log('新数组2',新数组2)