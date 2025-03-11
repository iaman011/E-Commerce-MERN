import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./App.css"
import { Navbar } from "./components/navbar";
import { AuthPage } from './pages/auth';
import { ShopPage } from './pages/shop';
import { CheckoutPage } from './pages/checkout';
import { PurchasedItemsPage } from './pages/purchased-items';

// import { Router } from 'express';

function App() {
 

  return (
    <>
     <div>
      <div className="App">
        <Router>
          <Navbar />  
          {/* using Navbar above all beacause utilizing it in Routes */}
          <Routes>
            <Route path ="/" 
            element = {
              <ShopPage />
            }
            />

            <Route path ="/auth" 
            element = {
              <AuthPage />
            }
            />

            <Route path ="/checkout" 
            element = {
              <CheckoutPage />
            }
            />
            
            <Route path ="/purchased-items" 
            element = {
              <PurchasedItemsPage />
            }
            />
          </Routes>
        </Router>
      </div>
     </div>
    </>
  )
}

export default App
