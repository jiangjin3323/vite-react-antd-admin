// 引入 legacy_createStore 用于创建 redux 中最为核心的 store 对象
// 注：createStore 已被弃用
import { legacy_createStore} from 'redux';

const initState = {
    userInfo: null,
    token: null,
}
const rendurFunc = (state:any = initState, action:{type:string,payload:any}) => {
    switch(action.type) {
        case 'SET_USER_INFO':
            return {
              ...state,
                userInfo: action.payload
            }
        case 'SET_TOKEN':
            return {
              ...state,
                token: action.payload
            }
        default:
            return state
    }
}
// 暴露 store
export default legacy_createStore(rendurFunc) 

