
import Registration from './components/Registration/Registration';
import logoHospital from './img/logohospital.png'
import './App.scss';

const App = () => {
  const flagHeader = 'registration';

  return (
    <div className="App">
      <header>
        <img src={logoHospital} alt="LogoHospital" />
        {flagHeader === 'registration' && (
          <div className='headerTitle'>Зарегистрироваться в системе</div>
        )}
      </header>
      <Registration />
    </div>
  );
}

export default App;
