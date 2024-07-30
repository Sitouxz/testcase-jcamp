import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { NavigationProvider } from './context/NavigationContext';

function App() {
  return (
    <NavigationProvider>
      <RouterProvider router={router} />
    </NavigationProvider>
  );
}

export default App;
