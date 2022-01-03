import { useContext, useState } from 'react';
import { 
    IonButton,
    IonCol,
    IonContent, 
    IonGrid, 
    IonHeader, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    IonTextarea,
    IonBadge,
    IonBackButton,
    IonButtons
} from '@ionic/react';
import QuestionsContext from '../../data/questions-context';
import './styles.css';
import { RouteComponentProps } from 'react-router';
import { arrowUpOutline, arrowDownOutline } from 'ionicons/icons';

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> {}

const QuestionDetail: React.FC<UserDetailPageProps> = ({ match }) => {

    // Obtenemos la pregunta del context
    const questionContext = useContext(QuestionsContext);
    const question = questionContext.questions.find((q) => q.id === match.params.id)!!;

    const [text, setText] = useState<string>('');

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
                <IonLabel class='question-title'> {question.title} </IonLabel>
            </IonItem>

            <IonGrid>
                <IonRow>
                    <IonCol size='1'>
                        <IonRow>
                            <IonButton class='votes-button-detail' color='success' fill='clear' onClick={() => {
                                questionContext.voteQuestion(1, question);
                            }}>
                                <IonIcon slot='icon-only' icon={arrowUpOutline}/>
                            </IonButton>
                        </IonRow>
                        <IonRow>
                            <IonLabel class='pad-label-votes' color='medium'>{question.votes}</IonLabel>
                        </IonRow>
                        <IonRow>
                            <IonButton class='votes-button-detail' color='danger' fill='clear' onClick={() => {
                                questionContext.voteQuestion(-1, question);
                            }}>
                                <IonIcon slot='icon-only' icon={arrowDownOutline}/>
                            </IonButton>
                        </IonRow>
                    </IonCol>
                    <IonCol size='11'>
                        <IonItem lines="full">
                            <IonLabel className="ion-text-wrap"> {question.description} </IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
            
            <IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonTextarea 
                                placeholder="Escribe tu respuesta aquí..." 
                                value={text} 
                                onIonChange={e => setText(e.detail.value!)}
                                class='textarea-style'
                                autoGrow
                                maxlength={1000}
                            ></IonTextarea>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton class="publish-button-custom-size" onClick={() => {
                                questionContext.addAnswer(text, question.id);
                                setText('');
                            }}>
                                Publicar
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonItem>

            { question.answers.map(answer => { return (
                <IonItem class='pad-top-7' key={answer.id}>
                    <IonGrid>
                        <IonRow>
                            <IonLabel className="ion-text-wrap">
                                {answer.text}
                            </IonLabel>
                        </IonRow>
                        <IonRow>
                            <IonCol class='col-votes col-badge' size='1'>
                                <IonBadge class='margin-right-badge' color="light">{answer.votes}</IonBadge>
                            </IonCol>
                            <IonCol size='1' class='no-pad-bottom'>
                                <IonButton class='votes-button-list' color='success' fill='clear' onClick={() => {
                                    questionContext.voteAnswer(1, answer, question.id);
                                }}>
                                    <IonIcon slot='icon-only' icon={arrowUpOutline}/>
                                </IonButton>
                            </IonCol>
                            <IonCol size='4' class='no-pad-bottom'>
                                <IonButton class='votes-button-list' color='danger' fill='clear' onClick={() => {
                                    questionContext.voteAnswer(-1, answer, question.id);
                                }}>
                                    <IonIcon slot='icon-only' icon={arrowDownOutline}/>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>
            )})}

        </IonContent>
      </IonPage>
    );
}
export default QuestionDetail;