import { useState, useReducer } from 'react';

const initFormValues = {
  email: '',
  password: '',
  repeatPassword: '',
  feedback: '',
  hideFormSuccess: false,
  loginResultObj: {},
};

function registerReducer(state, action) {
  switch (action.type) {
    case 'loginResultObj':
      return {
        ...state,
        loginResultObj: action.payload,
      };
    case 'hideFormSuccess':
      return {
        ...state,
        hideFormSuccess: action.payload,
      };
    case 'feedback':
      return {
        ...state,
        feedback: action.payload,
      };
    case 'email':
      return {
        ...state,
        email: action.payload,
      };
    case 'password':
      return {
        ...state,
        password: action.payload,
      };
    case 'repeatPassword':
      return {
        ...state,
        repeatPassword: action.payload,
      };
    default:
      console.warn('tokio tipo nera');
      return initFormValues;
  }
}

async function sendData(dataToSend, url = 'https://reqres.in/api/register') {
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
    return resp.json();
  } catch (err) {
    console.warn('klaida sendData', err);
  }
}

function RegisterForm(props) {
  const [state, dispatch] = useReducer(registerReducer, initFormValues);
  const arePasswordsEqual = state.password === state.repeatPassword;

  const handleLogin = async (newLoginObj) => {
    const loginResultObj = await sendData(newLoginObj);
    dispatch({ type: 'loginResultObj', payload: loginResultObj });

    console.log('loginResultObj ===', loginResultObj);

    if (loginResultObj) {
      dispatch({ type: 'hideFormSuccess', payload: true });
    } else {
      console.log('login fail', loginResultObj.error);
    }
  };

  // prisideti state pakartotiniam slaptazodziui

  const submitHandler = (e) => {
    // padaryti kad forma neperkrautu psl
    e.preventDefault();
    // patikrinti ar sutampa slaptazodziai

    if (arePasswordsEqual) {
      dispatch({ type: 'feedback', payload: 'Passwords match' });
      handleLogin({ email: state.email, password: state.password });
    } else {
      dispatch({ type: 'feedback', payload: 'Passwords do not match' });
    }

    // pranesti vartotojui ar sutampa ar ne su tekstu virs formos
  };

  return (
    <div>
      {!state.hideFormSuccess && (
        <>
          <h2>Register here</h2>
          <form onSubmit={submitHandler} className='card'>
            <input
              onChange={(e) =>
                dispatch({ type: 'email', payload: e.target.value })
              }
              value={state.email}
              type='text'
              placeholder='email'
            />
            <p>{state.feedback}</p>
            <input
              onChange={(e) =>
                dispatch({ type: 'password', payload: e.target.value })
              }
              value={state.password}
              type='password'
              placeholder='password'
            />
            <input
              onChange={(e) =>
                dispatch({ type: 'repeatPassword', payload: e.target.value })
              }
              value={state.repeatPassword}
              type='password'
              placeholder='repeat password'
            />
            <button type='submit'>Login</button>
          </form>
          <hr />
          <h3>Debug values</h3>
          <p>Email: {state.email}</p>
          <p>Password: {state.password}</p>
          <p>Repeat Password: {state.repeatPassword}</p>
          <p>Are equal: {arePasswordsEqual.toString()}</p>
        </>
      )}
      {state.hideFormSuccess && (
        <>
          <div className='card'>
            <h2>{state.loginResultObj.token}</h2>
            <p>{state.loginResultObj.id}</p>
            <p>{state.loginResultObj.error}</p>
          </div>
        </>
      )}
    </div>
  );
}
export default RegisterForm;
