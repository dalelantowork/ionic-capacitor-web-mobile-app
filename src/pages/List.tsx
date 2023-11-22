import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { addOutline, trashBinOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import './List.css';

const List: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [showAlert] = useIonAlert();
    const [showToast] = useIonToast();
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const cardModal = useRef<HTMLIonModalElement>(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const page = useRef(null);

    const [activeSegment, setActiveSegment] = useState<any>('details');

    useEffect(() => {
        setPresentingElement(page.current);
    }, []);

    useIonViewWillEnter(async () => {
        const users = await getUsers();
        console.log('users', users);
        setUsers(users);
        setLoading(false);
    });

    const getUsers = async () => {
        const data = await fetch('https://randomuser.me/api?results=10');
        const users = await data.json();

        // setUsers(users.results);
        return users.results;
    };

    const clearList = () => {
        showAlert({
            header: 'Confirm',
            message: 'Are you sure you want to delete all users?',
            buttons: [
                { text: 'Cancel', role: 'cancel' },
                {
                    text: 'Delete',
                    handler: () => {
                        setUsers([]);
                        showToast({
                            message: 'All users deleted',
                            duration: 2000,
                            color: 'danger',
                        });
                    },
                },
            ],
        })
    };

    const doRefresh = async (event: any) => {
        const data = await getUsers();
        setUsers(data);
        event.detail.complete();
    };

    return (
        <IonPage ref={page}>
            <IonHeader>
                <IonToolbar color={"primary"}>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={clearList}>
                            <IonIcon slot="icon-only" icon={trashBinOutline} color={'light'} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>

                <IonToolbar color={"primary"}>
                    <IonSearchbar />
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                <IonRefresher slot="fixed" onIonRefresh={(event) => doRefresh(event)}>
                    <IonRefresherContent />
                </IonRefresher>

                {loading && (
                    [...Array(10)].map((_, index) => (
                        <IonCard key={index}>
                            <IonCardContent className="ion-no-padding">
                                <IonItem lines="none">
                                    <IonAvatar slot="start">
                                        <IonSkeletonText animated />
                                    </IonAvatar>
                                    <IonLabel>
                                        <IonSkeletonText animated style={{ width: '150px' }} />
                                        <p><IonSkeletonText animated /></p>
                                    </IonLabel>
                                    <IonChip slot="end" color={'primary'}>
                                    </IonChip>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    ))
                )}

                {users.map((user, index) => (
                    <IonCard key={index} onClick={() => setSelectedUser(user)}>
                        {/* <IonCardHeader>
                            <IonCardTitle>Test</IonCardTitle>
                        </IonCardHeader> */}
                        <IonCardContent className="ion-no-padding">
                            <IonItem lines="none">
                                <IonAvatar slot="start">
                                    <IonImg src={user.picture.thumbnail} />
                                </IonAvatar>
                                <IonLabel>
                                    {user.name.first} {user.name.last}
                                    <p>{user.email}</p>
                                </IonLabel>
                                <IonChip slot="end" color={'primary'}>
                                    {user.nat}
                                </IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal
                    breakpoints={[0, 0.5, 0.8]}
                    initialBreakpoint={0.6}
                    ref={modal}
                    isOpen={selectedUser !== null}
                    onIonModalDidDismiss={() => setSelectedUser(null)}
                >
                    <IonHeader>
                        <IonToolbar color={'light'}>
                            <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>
                                {selectedUser?.name.first} {selectedUser?.name.last}
                            </IonTitle>
                        </IonToolbar>

                        <IonToolbar color={'light'}>
                            <IonSegment value={activeSegment} onIonChange={(event) => setActiveSegment(event.detail.value!)}>
                                <IonSegmentButton value="details">Details</IonSegmentButton>
                                <IonSegmentButton value="calendar">Calendar</IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent className="ion-padding">
                        {activeSegment === 'details' && (
                            <IonCard>
                                <IonAvatar slot="start">
                                    <IonImg src={selectedUser?.picture.large} />
                                </IonAvatar>
                                <IonCardContent className="ion-no-padding">
                                    <IonItem lines="none">
                                        <IonLabel class="ion-text-wrap">
                                            {selectedUser?.name.first} {selectedUser?.name.last}
                                            <p>{selectedUser?.email}</p>
                                        </IonLabel>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        )}
                        {activeSegment === 'calendar' && <IonDatetime />}
                    </IonContent>
                </IonModal>
            </IonContent>

            <IonModal ref={cardModal} trigger="card-modal" presentingElement={presentingElement!}>
                <IonHeader>
                    <IonToolbar color={'primary'}>
                        <IonButtons slot="start">
                            <IonButton onClick={() => cardModal.current?.dismiss()}>Close</IonButton>
                        </IonButtons>
                        <IonTitle>
                            Card Modal
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-text-center">
                    <p>Sample Card Modal</p>
                </IonContent>
            </IonModal>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton id="card-modal">
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default List;