import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PlannerApp } from './components/planner/PlannerApp';
import './index.css';

function usePath(): string {
  const [path, setPath] = React.useState(window.location.pathname);
  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return path;
}

function Root() {
  const path = usePath();
  return path === '/planner' ? <PlannerApp /> : <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
