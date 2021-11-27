import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { homeSharp, cashSharp, cartSharp, personCircleSharp, home, cash, cart, personCircle, pricetag, pricetags, homeOutline, pricetagsOutline, cartOutline, personCircleOutline } from "ionicons/icons";

// Page
import Home from './Home';
import productDetail from './HomeProductDetail';

import Sell from './Sell';
import InputSell from './InputSell';

import Cart from './Cart';
import Checkout from './Checkout';

import Profile from './Profile';
import EditProfile from './EditProfile';

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      {/* Router */}
      <IonRouterOutlet>
        <Redirect exact from="/tabs" to="/tabs/home" />

        <Route path="/tabs/home" component={Home} />
        <Route path="/tabs/productDetail" component={productDetail} />

        <Route exact path="/tabs/sell" component={Sell} />
        <Route exact path="/tabs/inputsell" component={InputSell} />

        <Route exact path="/tabs/cart" component={Cart} />
        <Route exact path="/tabs/checkout" component={Checkout} />

        <Route exact path="/tabs/profile" component={Profile} />
        <Route exact path="/tabs/editprofile" component={EditProfile} />
      </IonRouterOutlet>

      {/* Tabs */}
      <IonTabBar slot="bottom" className="tabs-css">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="sell" href="/tabs/sell">
          <IonIcon icon={pricetagsOutline} />
          <IonLabel>Sell</IonLabel>
        </IonTabButton>

        <IonTabButton tab="cart" href="/tabs/cart">
          <IonIcon icon={cartOutline} />
          <IonLabel>Cart</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
