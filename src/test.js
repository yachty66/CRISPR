import React, { useState, useEffect } from 'react';
import { CssBaseline, IconButton} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, Cart, Checkout, Toggle } from './components';
//import { commerce } from './lib/commerce';
import { Link } from 'react-router-dom';

import Commerce from '@chec/commerce.js';

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
 
const App = ({item}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [visible, setVisible] = useState(true);  // visibility state

  function test(){
    commerce.cart.add('prod_mOVKl4G9z35prR', 1).then((response) => console.log(response));
    //commerce.cart.refresh().then((response) => console.log(response));
    

    /*console.log(array);
    console.log("test");*/
    //check if array is empty if true add product else not
    /*if (array[0] === undefined || array.length == 0) {}
      console.log("test2");*/

      //commerce.cart.add('prod_mOVKl4G9z35prR', 1).then((response) => console.log(response));
      // array empty or does not exist
  
  


    //commerce.cart.empty().then((response) => console.log(response));
    //commerce.cart.contents().then((items) => console.log(items));
    //commerce.cart.add('prod_mOVKl4G9z35prR', 1).then((response) => console.log(response));
    
  }

  function setClicked(v){
    if(v == true){
      //commerce.cart.add('prod_mOVKl4G9z35prR', 1).then((response) => console.log(response));
    }
   
  }



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
    test();
    //
    //commerce.cart.empty().then((response) => console.log(response));
    //commerce.cart.add('prod_mOVKl4G9z35prR', 1).then((response) => console.log(response));
    //commerce.cart.empty().then((response) => console.log(response));
  }, []);

  /*
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
                  <div class="container_headline_landing_page_CRISPR"><a>CRISPR</a> <br/> <a>EDUCATION KIT</a></div>
                  <div></div>
                </div>
              </div>
              <div class="container_bullet_points_landing_page">
                <div class="container_bullet_points_landing_page_2">
                  <ul>
                    <li><a class="underlineH">Nuts and bolts CRISPR - Cas9</a></li>
                    <br/>
                    <li><a class="underlineH">Scientific identity for STEM interest</a></li>
                    <br/>
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
                <a>The class has 1 lecture and experiment. You will use CRISPR to manipulate the phenotype of the flower daisy. This text can be longer and filled with more information "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</a>
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

          <div class="container_end_page">
            <div class="container_end_page_left_right">
            <div class="container_end_page_left">
              <div class="container_headline_end_page"><a>What you will learn</a></div>
              <div class="container_end_page_text">
                <div class="container_end_page_text_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <img src={'/assets/checkmark.svg'} alt="Logo" class="container_end_page_text_icon"/>
              </div>
              <div class="container_end_page_text">
                <div class="container_end_page_text_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <img src={'/assets/checkmark.svg'} alt="Logo" class="container_end_page_text_icon"/>
              </div>
              <div class="container_end_page_text">
                <div class="container_end_page_text_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <img src={'/assets/checkmark.svg'} alt="Logo" class="container_end_page_text_icon"/>
              </div>
              <div class="container_end_page_text">
                <div class="container_end_page_text_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <img src={'/assets/checkmark.svg'} alt="Logo" class="container_end_page_text_icon"/>
              </div>
            </div>
            <div class="container_end_page_right"></div>
            </div>
            <div class="container_end_page_footer">
              <div class="container_end_page_footer_icons_text_row">
                <div class="container_end_page_footer_icons_text">
                  <div class="container_end_page_footer_icon"><img src={'/assets/question.svg'} alt="Logo" /></div>
                  <div class="container_end_page_footer_text"><a class="underlineH2">Contact</a></div>
                </div>
                <div class="container_end_page_footer_icons_text">
                  <div class="container_end_page_footer_icon"><img src={'/assets/pay.svg'} alt="Logo" /></div>
                  <div class="container_end_page_footer_stripe"><img src={'/assets/payment.svg'} alt="Logo"/></div>
                </div>
                <div class="container_end_page_footer_icons_text">
                  <div class="container_end_page_footer_icon"><img src={'/assets/delivery.svg'} alt="Logo" /></div>
                  <div class="container_end_page_footer_text"><a class="underlineH2">Free delivery</a></div>
                </div>
              </div>
              <div class="container_end_page_footer_end">
                <div class="container_end_page_privacy"><a class="underlineH2">Privacy</a></div>
                <div class="container_end_page_imprint"><a class="underlineH2">Imprint</a></div>
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
};*/

  
  return (
    <Router>
       <CssBaseline />
      <Switch>
        <Route exact path="/">
        {visible && 
        //landing page
        <>
          <div class="container_landing_page">
            <div class="container_landing_page_left">
              <div class="container_headline_landing_page">
                <div class="box_landing_page">
                  <div></div>
                  <div></div>
                  <div class="container_headline_landing_page_CRISPR"><a>CRISPR</a> <br/> <a>EDUCATION KIT</a></div>
                  <div></div>
                </div>
              </div>
              <div class="container_bullet_points_landing_page">
                <div class="container_bullet_points_landing_page_2">
                  <ul>
                    <li><a class="underlineH">Nuts and bolts CRISPR - Cas9</a></li>
                    <br/>
                    <li><a class="underlineH">Scientific identity for STEM interest</a></li>
                    <br/>
                    <li><a class="underlineH">Create your own bio systems</a></li>
                  </ul>
                </div>
              </div>
              <div class="container_order_button_landing_page">
                <div class="container_order_button_landing_page_2">
                  <IconButton class="button" component={Link} to="/cart" onClick={() => { setShowCheckout(true); setClicked(true) } }>
                    order now
                  </IconButton>
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
                <a>The class has 1 lecture and experiment. You will use CRISPR to manipulate the phenotype of the flower daisy. This text can be longer and filled with more information "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</a>
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

          <div class="container_end_page">
            <div class="container_end_page_left_right">
            <div class="container_end_page_left">
              <div class="container_headline_end_page"><a>What you will learn</a></div>
              <div class="container_end_page_text">
                <div class="container_end_page_text_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <img src={'/assets/checkmark.svg'} alt="Logo" class="container_end_page_text_icon"/>
              </div>
              <div class="container_end_page_text">
                <div class="container_end_page_text_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <img src={'/assets/checkmark.svg'} alt="Logo" class="container_end_page_text_icon"/>
              </div>
              <div class="container_end_page_text">
                <div class="container_end_page_text_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <img src={'/assets/checkmark.svg'} alt="Logo" class="container_end_page_text_icon"/>
              </div>
              <div class="container_end_page_text">
                <div class="container_end_page_text_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <img src={'/assets/checkmark.svg'} alt="Logo" class="container_end_page_text_icon"/>
              </div>
            </div>
            <div class="container_end_page_right"></div>
            </div>
            <div class="container_end_page_footer">
              <div class="container_end_page_footer_icons_text_row">
                <div class="container_end_page_footer_icons_text">
                  <div class="container_end_page_footer_icon"><img src={'/assets/question.svg'} alt="Logo" /></div>
                  <div class="container_end_page_footer_text"><a class="underlineH2">Contact</a></div>
                </div>
                <div class="container_end_page_footer_icons_text">
                  <div class="container_end_page_footer_icon"><img src={'/assets/pay.svg'} alt="Logo" /></div>
                  <div class="container_end_page_footer_stripe"><img src={'/assets/payment.svg'} alt="Logo"/></div>
                </div>
                <div class="container_end_page_footer_icons_text">
                  <div class="container_end_page_footer_icon"><img src={'/assets/delivery.svg'} alt="Logo" /></div>
                  <div class="container_end_page_footer_text"><a class="underlineH2">Free delivery</a></div>
                </div>
              </div>
              <div class="container_end_page_footer_end">
                <div class="container_end_page_privacy"><a class="underlineH2">Privacy</a></div>
                <div class="container_end_page_imprint"><a class="underlineH2">Imprint</a></div>
              </div>
            </div>
          </div>
          </>
        }
        </Route>
        <div style={{ display: 'flex' }} >
        <Route exact path="/cart">
          <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
        </Route>
        <Route path="/checkout" exact>
          <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
        </Route>
        </div>  
        </Switch>
    </Router>
  );
};

export default App;
