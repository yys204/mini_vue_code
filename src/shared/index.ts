export const extend = Object.assign;
// 判断是否为对象
export const isObject = (val) => {
  return val !== null && typeof val === "object";
};
// 判断两个值是否相等-对象判断值的是同一地址
export const hasChanged = (val, newValue) => {
  return !Object.is(val, newValue);
};
// 判断对象是否存在某个属性
export const hasOwn = (val, key) => {
  return Object.prototype.hasOwnProperty.call(val, key);
};

export const camelize = (str:string) =>{
  return str.replace(/-(\w)/g,(_,c)=>c?c.toUpperCase():'')
}
export const capitalize = (str:string) =>{
 return str.charAt(0).toUpperCase() + str.slice(1)
}
export const toHandlerkey = (str:string)=>{
  return str?"on"+capitalize(str):""
}