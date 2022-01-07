import Header from "./components/UI/Header";
import Meal from "./components/Meals/Meal";
import Cart from "./components/Cart/Cart";
import {commerce} from './lib/Commerce';
import {useEffect,useState} from 'react';
import MealsLoading from "./components/Meals/MealsLoading";
import Checkout from "./components/Checkout/Checkout";
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom';

function App() {
  
  const [foods,setFoods]=useState([]);
  const [cart,setCart]=useState({total_items:0, line_items: [] });
  const [cartView,setcartView]=useState(false);
  const [order,setOrder] =useState({id:'test'});
  const [errorMessage, setErrorMessage] = useState('');
  //const [token,setToken]=useState({});
  
  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);
  
  const fetchProducts=async()=>{
    setFoods(await commerce.products.list());
    //console.log(await commerce.checkout.generateTokenFrom('cart', 'cart_RyWOwmPdNxlnEa'));
  }
  const fetchCart =async () =>{
    setCart(await commerce.cart.retrieve());
  }
  const addToCartHandler =async(productId, quantity) =>{
    const item= await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }
  console.log(cart);
  const closeCartHandler=()=>{
    setcartView(false);
  }
  const openCartHandler=()=>{
    setcartView(true);
  }
  const emptyCartHandler = async() =>{
    const response = await commerce.cart.empty();
    setCart(response.cart);
    setcartView(false);
  }
const updateCartHandler = async(productId, quantity) =>{
  const response = await commerce.cart.update(productId,{quantity});
  setCart(response.cart);
}
const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();

  setCart(newCart);
};
const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

    setOrder(incomingOrder);

    refreshCart();
  } catch (error) {
    setErrorMessage(error.data.error.message);
  }
};
const gotoCheckout =async (cartId) =>{
    //const token = await commerce.checkout.generateTokenFrom('cart', cartId)
    //setToken(token);
    //console.log(token);
    setcartView(false);
}

  return (
    <Router>
    <>
      {<Header cartItems={cart} onViewCart={openCartHandler}/>}
      {cartView && <Cart cart={cart} gotoCheckout={gotoCheckout} onUpdateCart={updateCartHandler} onEmptyCart={emptyCartHandler} onCloseCart={closeCartHandler}/>}

      <Routes>
        <Route exact path='/checkout' element={<Checkout 
        onCloseCart={closeCartHandler}
        cart={cart}
        order={order}
        onCaptureCheckout={handleCaptureCheckout} 
        error={errorMessage}
        />}/>
        <Route exact path='/' element={
        <main>
          {foods.length!==0 ?<Meal allMeals={foods.data} onAddToCart={addToCartHandler}/>:<MealsLoading/>}
          </main>}
          />
     </Routes>
      
    </>
    </Router>

  );
}

export default App;
