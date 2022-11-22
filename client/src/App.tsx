import React, { useEffect } from 'react';
import './App.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store';
import { selectPrograms } from './selectors';
import { actionTypes } from './actions/actionTypes';

function FitnessClubApp() {
  const dispatch = useDispatch();
  const programs = useSelector(selectPrograms);

  useEffect(() => {
    // console.log(programs);
    dispatch({ type: actionTypes.PROGRAMS_FETCH_SUCCEEDED });
  }, []);

  return (
    <>
      <div className='programs'>
        {programs?.map(program => (
          <div className='program-container' key={program.id}>
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
