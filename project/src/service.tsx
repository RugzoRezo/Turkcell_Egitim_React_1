import axios from "axios";
import { IOrder } from "./models/IOrder";
import { IProduct } from "./models/IProduct";
import { ITodo, Todo } from "./models/ITodo";
import { IUserLogin } from "./models/IUserLogin";
import { control } from "./util";
const baseUrl = process.env.REACT_APP_BASE_URL
const dummyJsonBaseUrl = process.env.REACT_APP_JSON_BASE_URL

const config = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    params: { ref: 'd1becef32825e5c8b0fc1b096230400b' },
    //headers: { 'turkcell_id': '12312312312' }
})

// 
const dummyJsonConfig = axios.create({
    baseURL: dummyJsonBaseUrl,
    timeout: 25000,
})


// user login
export const userLoginService = ( email: string, password: string ) => {
    const sendParams = {
        userEmail: email,
        userPass: password,
        face: 'no'
    }
    return config.get<IUserLogin>('userLogin.php', { params: sendParams })
}

// product List
export const productList = () => {
   const sendParams = {
    start: 0
   } 
   return  config.get<IProduct>('product.php', { params: sendParams })
}

// add order
export const addOrder = (productId: string) => {
    const sendParams = {
        customerId: control()?.userId,
        productId: productId,
        html: productId
    }
    return config.get('orderForm.php', { params: sendParams })
}


// list order
export const listOrder = () => {
    const sendParams = {
        musterilerID: control()?.userId,
        random: Math.random()
    }
    return config.get<IOrder>('orderList.php', { params: sendParams })
}

//  Get todos
export const getTodos = () => {
    return dummyJsonConfig.get<ITodo>('todos')
}

// Add todo
export const addTodo = (item:Todo) => {
    return dummyJsonConfig.post<Todo>('todos/add', item)
}