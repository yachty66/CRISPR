import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Products, Cart, Checkout, Toggle } from './components';
import { commerce } from './lib/commerce';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [visible, setVisible] = useState(true);  // visibility state
  //const [hideStartRendering, setHideStartRendering] = useState(false);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

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

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  /*return(
    <Router>
      <div style={{ display: 'flex'}} class="ignore-css">
        <Route exact path="/">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
        </Route>
        <CssBaseline />
        <Switch>
          <Route exact path="/cart">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route path="/checkout" exact>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
        </Switch>
      </div>
    </Router>
  )*/

  
  return (
    <Router>
        {visible && 
        //landing page
        <>
          <div class="container_landing_page">
            <div class="container_landing_page_left">
              <div class="container_headline_landing_page">
                <div class="box_landing_page">
                  <div></div>
                  <div></div>
                  <div class="container_headline_landing_page_CRISPR"><a>CRISPR</a> <br /> <a>EDUCATION KIT</a></div>
                  <div></div>
                </div>
              </div>
              <div class="container_bullet_points_landing_page">
                <div class="container_bullet_points_landing_page_2">
                  <ul>
                    <li><a class="underlineH">Nuts and bolts CRISPR - Cas9</a></li>
                    <li><a class="underlineH">Scientific identity and promotion for STEM interest</a></li>
                    <li><a class="underlineH">Create your own bio systems</a></li>
                  </ul>
                </div>
              </div>
              <div class="container_order_button_landing_page">
                <div class="container_order_button_landing_page_2">
                  <button class="button" onClick={() => { setShowCheckout(true); setVisible(false); } }>
                    order now
                  </button>
                </div>
              </div>
            </div>
            <div class="container_landing_page_right">
              <div class="container_image_landing_page">
                <img src={'/assets/dna.png'} alt="Logo" class="landing_page_image" />
              </div>
            </div>
          </div>

          <div class="container_middle_page">
            <img src={'/assets/microscope.png'} alt="Logo" class="landing_page_image_2" />
            <div class="container_middle_page_up">
              <div class="container_middle_page_text">
                The class has 1 lecture and experiment. You will use CRISPR to manipulate the phenotype of the flower daisy. This text can be longer and filled with more information "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
              </div>
            </div>
            <div class="container_middle_page_down">
              <div class="container_middle_page_icons_text">
                <div class="container_middle_page_icons_text_2">
                <div class="container_middle_page_text_small"><img class="container_middle_page_icon" src={"/assets/language.png"}/>Language<br/>English</div>
                <div class="container_middle_page_text_small"><img class="container_middle_page_icon" src={"/assets/time.png"}/>Time<br/>2 months</div>
                <div class="container_middle_page_text_small"><img class="container_middle_page_icon" src={"/assets/level.png"}/>Level<br/>Beginner</div>
                  <div></div>
                  <div></div>

                </div>

              </div>

            </div>
          </div>
          
          
          
          </>



        
        
        
        
        }
          {showCheckout && (
            <div style={{ display: 'flex' }} class="ignore-css">
              <Route exact path="/">
                  <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
              </Route>
              <CssBaseline />
              <Switch>
                <Route exact path="/cart">
                  <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
                </Route>
                <Route path="/checkout" exact>
                  <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
                </Route>
              </Switch>
            </div>) 
          }
    </Router>
  );
};

export default App;
