// 系统类的方法扩展
import math from './class/math';

import date from './class/date';

import array from './class/array';

import clone from './class/object';

import random from './class/string';

// 载入防抖和节流的方法
import debounce from './funcs/debounce';
import throttle from './funcs/throttle';


import validate from './vendor/validate';

// 文件上传处理方法
import upload from './vendor/upload';

// 通用的一些方法
import common from './vendor/common';

// webpack 全局加载的模块 以`export`而非`export default`导出，
// 她类似于module.exports或者exports的规则
export default {
    ...math, // omit, ,,, 
    ...date,
    ...array,
    ...clone,
    ...random,
    debounce,
    throttle,
    validate,
    upload,
    ...common
}