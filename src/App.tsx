import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import QuestionList from './pages/question_list';
import QuestionDetail from './pages/question_detail';
import QuestionsContextProvider from './data/QuestionsContextProvider';
import QuestionCreate from './pages/question_create';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <QuestionsContextProvider>
        <IonRouterOutlet>
          <Route exact path="/list" component={QuestionList}/>
          <Route path="/detail/:id" component={QuestionDetail}/>
          <Route path="/create" component={QuestionCreate}/>
          <Redirect to="/list" exact path="/"/>
        </IonRouterOutlet>
      </QuestionsContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
