import { useContext, useState } from 'react';
import { 
    IonContent, 
    IonHeader, 
    IonItem, 
    IonLabel, 
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonInput,
    IonTextarea,
    IonButton,
    IonCol,
    IonGrid,
    IonRow
} from '@ionic/react';
import './styles.css';
import QuestionsContext from '../../data/questions-context';

const QuestionCreate: React.FC = () => {

    const questionContext = useContext(QuestionsContext);

    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton text={'Atras'} defaultHref="/"/>
                </IonButtons>
                <IonTitle>Stack Underflow</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
            <IonItem lines="full">
                <IonLabel class='question-title'> Formular una pregunta </IonLabel>
            </IonItem>
            
            <IonItem class='input-item'>
                <IonLabel position="stacked" class='create-labels'>Título</IonLabel>
                <IonInput placeholder='¿Cuál es tu pregunta?' value={title} onIonChange={e => setTitle(e.detail.value!)}> </IonInput>
            </IonItem>

            <IonItem class='input-item'>
                <IonLabel position="stacked" class='create-labels'>Descripción</IonLabel>
                <IonTextarea 
                    class='textarea-custom-style' 
                    autoGrow 
                    placeholder='Escribe detalladamente tu problema...' 
                    value={desc}
                    maxlength={1000}
                    onIonChange={e => setDesc(e.detail.value!)}
                ></IonTextarea>
            </IonItem>

            <IonGrid>
                <IonRow>
                    <IonCol size='6' class='ion-text-center'>
                        <IonButton class='question-create-buttons-width' routerLink={`/list`} onClick={() => {
                            questionContext.addQuestion(title, desc);
                            setTitle('');
                            setDesc('');
                        }}>
                            Publicar
                        </IonButton>
                    </IonCol>
                    <IonCol size='6' class='ion-text-center'>
                        <IonButton 
                            class='question-create-buttons-width' 
                            fill='outline' 
                            color='danger' 
                            routerLink={`/list`}
                        >
                            Cancelar
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>

        </IonContent>
      </IonPage>
    );
}
export default QuestionCreate;