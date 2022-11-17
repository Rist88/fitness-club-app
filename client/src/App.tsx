import React, { useEffect } from 'react';
import './App.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { selectPrograms, store } from './lib/store';

function FitnessClubApp() {
  const dispatch = useDispatch();
  const programs = useSelector(selectPrograms);

  useEffect(() => {
    // console.log(programs);
    dispatch({ type: 'PROGRAMS_FETCH_SUCCEEDED' });
  }, []);

  return (
    <>
      <div className='App'>
        {programs?.map(program => (
          <div key={program.id}>
            <h4>{program.name}</h4>
            <p>{program.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <FitnessClubApp />
    </Provider>
  );
}

export default App;

// default app template
// import logo from './logo.svg';
// <div className='App'>
//   <header className='App-header'>
//     <img src={logo} className='App-logo' alt='logo' />
//     <p>
//       Edit <code>src/App.tsx</code> and save to reload.
//     </p>
//     <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
//       Learn React
//     </a>
//   </header>
// </div>
