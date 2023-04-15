import SingleProduct from '../components/Products/SingleProduct'
import Home  from '../pages/Home'


export const router = [
    {path: '/', component: Home},
    {path: '/categories/:id', component: Home},
    {path: '/products/:id', component: SingleProduct},

] 