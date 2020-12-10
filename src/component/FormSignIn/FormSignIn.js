import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { requestSingIn } from '../../redux/auth/authOperations';
import walletIcon from '../../images/Authentication/walletIcon.png';
import iPhoneIMG from '../../images/Authentication/iPhone-login-desktop.png';
import style from './SignIn.module.css';

const SignIn = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  const onSubmit = () => {
    dispatch(requestSingIn({ email, password }));
  };

  return (
    <div className={style.modal}>
      <div className={style.iPhoneContainer}>
        <img src={iPhoneIMG} alt="iPhone" className={style.iPhoneIMG}></img>
        <p className={style.financeApp}>Finance App</p>
      </div>
      <div className={style.formContainer}>
        <div className={style.authenticationLogoContainer}>
          <img
            src={walletIcon}
            alt="Wallet"
            className={style.authenticationLogo}
          />
          <h1 className={style.authenticationLogoName}>Wallet</h1>
        </div>

        <form
          className={style.authenticationForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          {
            <label className={style.label}>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={event => setEmail(event.target.value)}
                className={`${style.authenticationEmail} ${style.inputValidation}`}
                value={email}
                ref={register({ required: true })}
              />
              {errors.email && (
                <p className={style.authenticationError}>Enter E-mail.</p>
              )}
            </label>
          }
          <label className={style.label}>
            <input
              value={password}
              type="password"
              name="password"
              placeholder="Password"
              onChange={event => setPassword(event.target.value)}
              className={style.authenticationPassword}
              ref={register({ required: true })}
            />
            {errors.password && (
              <p className={style.authenticationError}>Enter password.</p>
            )}
          </label>
          <button type="submit" className={style.authenticationButton}>
            Sign In
          </button>
        </form>
        <Link to="/registration" className={style.link}>
          <p className={style.linkSignUp}>Sing Up</p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
