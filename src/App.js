import { BlogProvider } from './context/BlogContext';
import Header from './components/Header';
import BlogList from './components/BlogList';
const App = () => {
  return (
    <BlogProvider>
      <Header />
      <BlogList />
      <div id="modal-root"></div>
    </BlogProvider>
  );
};

export default App;
