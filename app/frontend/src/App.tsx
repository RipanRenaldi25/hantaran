import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import store from './states';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </Provider>
  );
}

export default App;
