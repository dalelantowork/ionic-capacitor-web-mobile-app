import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import MyLogo from '../assets/logo.png'
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences'

const INTRO_KEY = 'intro_seen';

const Login: React.FC = () => {
    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(false);
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY });
            console.log('seen', seen);
            setIntroSeen(seen.value === 'true');
        };
        checkStorage();
    }, []);

    const doLogin = async (event: any) => {
        event.preventDefault();
        console.log('login clicked');
        await present('Logging in...');
        setTimeout(async () => {
            dismiss();
            router.push('/app', 'root');
        }, 2000);
    };

    const finishIntro = async () => {
        console.log('Finish Intro');
        setIntroSeen(true);
        Preferences.set({ key: INTRO_KEY, value: 'true' });
    };

    const seeIntroAgain = () => {
        setIntroSeen(false);
        Preferences.remove({ key: INTRO_KEY });
    };

    return (
        <>
            {!introSeen ? (
                <Intro onFinish={finishIntro} />
            ) : (
                <IonPage>
                    <IonHeader>
                        <IonToolbar color={'primary'}>
                            <IonTitle>Dale's Ionic App</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent scrollY={false} className="ion-padding">
                        <IonGrid fixed>
                            <IonRow class="ion-justify-content-center">
                                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                    <div className="ion-text-center ion-padding">
                                        <img src={MyLogo} alt="Logo" width={'40%'} />
                                    </div>
                                </IonCol>
                            </IonRow>

                            <IonRow class="ion-justify-content-center">
                                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                    <div>
                                        <IonCard>
                                            <IonCardContent>
                                                <form onSubmit={doLogin}>
                                                    <IonInput
                                                        mode="md"
                                                        fill="outline"
                                                        labelPlacement="floating"
                                                        label="Email"
                                                        type='email'
                                                        placeholder="dalelanto.work@gmail.com"
                                                    ></IonInput>
                                                    <IonInput
                                                        mode="md"
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
                                                    >Login
                                                        <IonIcon icon={logInOutline} slot="end" />
                                                    </IonButton>

                                                    <IonButton
                                                        className="ion-margin-top"
                                                        color={'secondary'}
                                                        routerLink='/register'
                                                        expand='block'
                                                    >Create Account
                                                        <IonIcon icon={personCircleOutline} slot="end" />
                                                    </IonButton>

                                                    <IonButton
                                                        className="ion-margin-top"
                                                        fill='clear'
                                                        size='small'
                                                        color={'medium'}
                                                        expand='block'
                                                        onClick={seeIntroAgain}
                                                    >Watch Intro Again
                                                        <IonIcon icon={personCircleOutline} slot="end" />
                                                    </IonButton>
                                                </form>
                                            </IonCardContent>
                                        </IonCard>
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>


                    </IonContent>

                    {/* <IonFooter>
                <IonToolbar>
                    footer here
                </IonToolbar>
            </IonFooter> */}
                </IonPage>
            )}
        </>
    );
};

export default Login;