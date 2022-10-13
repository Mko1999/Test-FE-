import './App.css';
import {BookCollections, BookModal, BookSelect, Header} from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <BookSelect />
      <BookCollections />
      {/*<BookModal />*/}
    </div>
  );
}

export default App;
