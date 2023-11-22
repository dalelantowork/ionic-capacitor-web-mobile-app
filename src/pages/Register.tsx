import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { checkmarkDoneOutline } from 'ionicons/icons';
import React from 'react';

const Register: React.FC = () => {
    const router = useIonRouter();

    const doRegister = (event:any) => {
        event.preventDefault();
        console.log('doRegister');
        router.goBack();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent scrollY={false} className="ion-padding">
            <IonGrid fixed>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                            <IonCard>
                                <IonCardContent>
                                    <form onSubmit={doRegister}>
                                        <IonInput 
                                            fill="outline" 
                                            labelPlacement="floating" 
                                            label="Email" 
                                            type='email' 
                                            placeholder="dalelanto.work@gmail.com"
                                        ></IonInput>
                                        <IonInput 
                                            className="ion-margin-top"
                                            fill="outline" 
                                            labelPlacement="floating" 
                                            label="Password" 
                                            type='password' 
                                            placeholder="dalelanto.work@gmail.com"
                                        ></IonInput>
                                        <IonButton 
                                            className="ion-margin-top"
                                            type='submit'
                                            expand='block'
                                        >Create My Account
                                        <IonIcon icon={checkmarkDoneOutline} slot="end"/>
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
             </IonGrid>

               
            </IonContent>
        </IonPage>
    );
};

export default Register;