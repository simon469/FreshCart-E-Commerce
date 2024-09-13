import { createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './Context/AuthContext'
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductsDetails from './Components/ProductsDetails/ProductsDetails'
import CartContextProvider from './Context/CartContext'
import Payment from './Components/Payment/Payment'
import AllOrders from './Components/AllOrders/AllOrders'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import ResetCode from './Components/ResetCode/ResetCode'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import Wishlist from './Components/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContext'

function App() {
  const z = new QueryClient
  const router = createHashRouter([
    {path : '' , element: <AuthContextProvider>
      <Layout/>
    </AuthContextProvider>
      , children:[
      {index: true, element: <ProtectedRoute> <Products/> </ProtectedRoute> },
      {path: '/login', element: <Login/>},
      {path: '/resetpassword' , element:<ResetPassword/>},
      {path: '/forgetpassword' , element:<ForgetPassword/>},
      {path: '/resetCode' , element:<ResetCode/>},
      {path: '/register', element: <Register/>},
      {path: '/cart', element:  <ProtectedRoute> <Cart/> </ProtectedRoute>},
      {path: '/wishlist', element:  <ProtectedRoute> <Wishlist/> </ProtectedRoute>},
      {path: '/categories', element: <ProtectedRoute>  <Categories/> </ProtectedRoute>},
      {path: '/brands', element:  <ProtectedRoute> <Brands/> </ProtectedRoute>},
      {path: '/productsDetails/:id', element:  <ProtectedRoute> <ProductsDetails/> </ProtectedRoute>},
      {path: '/payment', element: <ProtectedRoute> <Payment/> </ProtectedRoute>},
      {path: '/allorders', element: <ProtectedRoute> <AllOrders/> </ProtectedRoute>},
      {path: '*', element: <NotFound/>},

    ]}
  ]);
  return (
    <QueryClientProvider client={z}>
      <AuthContextProvider>
        <CartContextProvider>
        <WishlistContextProvider>
        <Toaster/>
        <RouterProvider router={router}></RouterProvider>
        </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>

  );
}

export default App
