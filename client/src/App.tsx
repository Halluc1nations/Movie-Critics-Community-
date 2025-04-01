import { Outlet } from 'react-router-dom';
import MovieApp from './components/Html';
import Navbar from './components/Navbar';

function App() {

  return (
    <div>
      <Navbar />
      <MovieApp />
      
      <main className='container pt-5'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
