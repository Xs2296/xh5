
function clone(target, source, isDeep = true) {
    // 浅拷贝使用内置方法
    if (!isDeep) {
        return Object.assign(target, source);
    }

    // 递归遍历拷贝成员
    for (let item in source) {
        if (source[item] instanceof Object) {
            // 检测对象还是数组
            target[item] =
                Object.prototype.toString.call(source[item]) === '[object Array]' ? [] : {};
            clone(target[item], source[item], isDeep);
        } else {
            target[item] = source[item];
        }
    }

    return target;
}

function cloneWithSelf(target, source, isDeep = true) {
    // 先拷贝target自身
    const o = Object.clone({}, target, isDeep);
    return Object.clone(o, source, isDeep)
}

// 给原型对象扩展方法
Object.assign(Object, {
    clone,
    cloneWithSelf
})

export default {
    clone,
    cloneWithSelf
}
