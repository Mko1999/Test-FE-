import {BookCollections, BookModal, BookSelect, Header} from './components';

function App() {
  return (
    <div>
      <Header />
      <BookSelect />
      <BookCollections />
      {/*<EditBookModal />*/}
    </div>
  );
}

export default App;
