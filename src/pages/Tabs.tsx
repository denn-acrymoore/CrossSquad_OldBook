import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { homeSharp, cashSharp, cartSharp, personCircleSharp } from "ionicons/icons";

// Page
import Home from './Cart';
import Sell from './Sell';
import Cart from './Cart';
import Profile from './Profile';

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      {/* Router */}
      <IonRouterOutlet>
        <Redirect exact from="/tabs" to="/tabs/home" />
        <Route path="/tabs/home" component={Home} />
        <Route exact path="/tabs/sell" component={Sell} />
        <Route exact path="/tabs/cart" component={Cart} />
        <Route exact path="/tabs/profile" component={Profile} />
      </IonRouterOutlet>

      {/* Tabs */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={homeSharp} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="sell" href="/tabs/sell">
          <IonIcon icon={cashSharp} />
          <IonLabel>Sell</IonLabel>
        </IonTabButton>

        <IonTabButton tab="cart" href="/tabs/cart">
          <IonIcon icon={cartSharp} />
          <IonLabel>Cart</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={personCircleSharp} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
