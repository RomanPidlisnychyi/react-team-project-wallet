import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestSingUp } from '../../redux/auth/authOperations';
import { useForm } from 'react-hook-form';
import PasswordStrengthMeter from '../PasswordMeter/PasswordStrengthMeter';
import walletIcon from '../../images/Authentication/walletIcon.png';
import iPhoneIMG from '../../images/Authentication/iPhone-registration-desktop.png';
import style from './SignUp.module.css';

const SignUp = props => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUserName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const confirmPasswordError = () =>
    password !== confirmPassword ? true : false;
  const onSubmit = () => {
    if (password === confirmPassword) {
      dispatch(requestSingUp({ email, password, name })).then(response => {
        if (response) {
          setTimeout(() => {
            props.history.push('/login');
          }, 1000);
        }
      });
    }
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
            alt="wallet"
            className={style.authenticationLogo}
          />
          <h1 className={style.authenticationLogoName}>Wallet</h1>
        </div>
        <form
          className={style.authenticationForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={style.label}>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="E-mail"
              ref={register({ required: true })}
              className={`${style.authenticationEmail} ${style.inputValidation}`}
              onChange={event => setEmail(event.target.value)}
            />
            {errors.email && (
              <p className={style.authenticationError}>Enter E-mail.</p>
            )}
          </label>
          <label className={style.label}>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              ref={register({ required: true })}
              autoComplete="off"
              className={style.authenticationPassword}
              onChange={event => setPassword(event.target.value)}
            />
            {errors.password && (
              <p className={style.authenticationError}>Enter password.</p>
            )}
          </label>
          <PasswordStrengthMeter password={password} />
          <label className={style.label}>
            <input
              type="password"
              name="passwordConfirm"
              value={confirmPassword}
              ref={register({ required: true })}
              placeholder="Password confirm"
              autoComplete="off"
              className={style.authenticationPassword}
              onChange={event => setConfirmPassword(event.target.value)}
            />
            {confirmPasswordError() && confirmPassword !== '' && (
              <p className={style.authenticationError}>Pasword don't match.</p>
            )}
          </label>
          <label className={style.label}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter your name"
              ref={register({ required: true })}
              className={style.authenticationName}
              onChange={event => setUserName(event.target.value)}
            />
            {errors.name && (
              <p className={style.authenticationError}>Enter name</p>
            )}
          </label>
          <button className={style.authenticationButton}>Sign Up</button>
        </form>
        <Link to="/login" className={style.link}>
          <p type="button" className={style.linkSignIn}>
            Sign In
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
