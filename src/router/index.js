import SingleCategory from '../components/Categories/SingleCategory'
import SingleProduct from '../components/Products/SingleProduct'
import Profile from '../components/User/Profile'
import Home  from '../pages/Home'


export const router = [
    {path: '/', component: Home},
    {path: '/categories/:id', component: SingleCategory},
    {path: '/products/:id', component: SingleProduct},
    {path: '/profile', component: Profile},

] 