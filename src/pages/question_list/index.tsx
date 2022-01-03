import { useContext } from 'react';
import { 
    IonContent, 
    IonPage, 
    IonItem,
    IonLabel,
    IonList,
    IonBadge,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonButton,
    IonIcon,
    IonCol
} from '@ionic/react';
import QuestionsContext from '../../data/questions-context';
import { arrowUpOutline, arrowDownOutline, chatboxOutline } from 'ionicons/icons';
import './styles.css';

const QuestionList: React.FC = () => {

    const questionContext = useContext(QuestionsContext);

    return (
    <IonPage>
        <IonContent>

            <IonCard class='card-header'>
                <IonCardHeader>
                    <IonCardTitle>Bienvenido a Stack Underflow</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    Un lugar donde podras encontrar la respuesta a cualquiera de tus dudas... o tal vez no.
                </IonCardContent>
            </IonCard>

            <IonGrid>
                <IonRow>
                    <IonButton class='add-question-button' routerLink={`/create`}>
                        Formular una pregunta
                    </IonButton>
                </IonRow>
            </IonGrid>

            <IonList lines='full'>
                { questionContext.questions.map(question => { return (
                    <IonItem class='pad-top-7' key={question.id} routerLink={`/detail/${question.id}`} detail>
                        <IonGrid>
                            <IonRow>
                                <IonLabel>
                                    {question.title}
                                </IonLabel>
                            </IonRow>
                            <IonRow>
                                <IonCol class='col-votes col-badge' size='1'>
                                    <IonBadge class='margin-right-badge' color="light">{question.votes}</IonBadge>
                                </IonCol>
                                <IonCol size='1' class='no-pad-bottom'>
                                    <IonButton class='votes-button-list' color='success' fill='clear' onClick={() => {
                                        questionContext.voteQuestion(1, question);
                                    }}>
                                        <IonIcon slot='icon-only' icon={arrowUpOutline}/>
                                    </IonButton>
                                </IonCol>
                                <IonCol size='4' class='no-pad-bottom'>
                                    <IonButton class='votes-button-list' color='danger' fill='clear' onClick={() => {
                                        questionContext.voteQuestion(-1, question);
                                    }}>
                                        <IonIcon slot='icon-only' icon={arrowDownOutline}/>
                                    </IonButton>
                                </IonCol>
                                <IonCol size='1' class='no-pad-bottom' >
                                    <IonButton color='medium' fill='clear'>
                                        {question.answers.length} <IonIcon slot='end' icon={chatboxOutline}/>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                )})}
            </IonList>
        </IonContent>
    </IonPage>
    );
}
export default QuestionList