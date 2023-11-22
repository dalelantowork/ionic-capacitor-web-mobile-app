import { IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { homeOutline, logOutOutline, newspaperOutline } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Settings from './Settings';

const Menu: React.FC = () => {
    const paths = [
        { name: "Home", url: "/app/list", icon: homeOutline },
        { name: "Settings", url: "/app/settings", icon: newspaperOutline },
    ];
    console.log('menu');
    return (
        <IonPage>
            <IonSplitPane contentId='main'>
                <IonMenu contentId='main'>
                    <IonHeader>
                        <IonToolbar color={'tertiary'}>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {paths.map((item, index) => (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem detail={false} routerLink={item.url} routerDirection="none">
                                    <IonIcon slot="start" icon={item.icon} />
                                    {item.name}
                                </IonItem>
                            </IonMenuToggle>

                        ))}

                        <IonMenuToggle autoHide={false}>
                            <IonItem detail={false} routerLink="/" routerDirection="none">
                                <IonIcon slot="start" icon={logOutOutline} />
                                Logout
                            </IonItem>
                        </IonMenuToggle>
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id='main'>
                    <Route exact path="/app/list" component={List} />
                    <Route path="/app/settings" component={Settings} />
                    <Route exact path="/app" >
                        <Redirect to="/app/list" />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
};

export default Menu;