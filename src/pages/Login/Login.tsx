import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import { login } from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

function Login() {
  const [error, setError] = useState<string | null>(); // ошибка может быть, а может не
  const navigate = useNavigate();

  // хук, который делает dispatch на весь наш стейт
  const dispatch = useDispatch<AppDispath>(); // <> - применяем дженерик, чтобы сделать правильную типизацию
  const { jwt } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (event: FormEvent) => {
    // типизируем event
    event.preventDefault();
    setError(null);
    const target = event.target as typeof event.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
    /*
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        // здесь не нужно делать JSON.stringify
        email,
        password,
      });
      // console.log(data); // a@gmail.com  123
      //localStorage.setItem('jwt', data.access_token);
      dispatch(userActions.addJwt(data.access_token)); // принимает некий thunkAction, который может быть синхронный, асинхронный - в нашем случае это добавление jwt
      navigate('/');
      /*
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcwNzY3OTkzNH0.ksk6JULAzguZkXEbMtk1ux1yx3K2L7eeBJXGLr99XMs"
}
    
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setError(error.response?.data.message);
      }
    }
    */
  };

  return (
    <div className={styles['login']}>
      <Headling>Вход</Headling>
      {error && <div className={styles['error']}>{error}</div>}
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label htmlFor="email">Ваш email</label>
          <Input type="email" placeholder="email" id="email" name="email" />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            type="password"
            placeholder="Пароль"
            id="password"
            name="password"
          />
        </div>
        <Button type="submit" appearence="big">
          Вход
        </Button>
      </form>
      <div className={styles['links']}>
        <div>Нет аккаунта?</div>
        <div>
          <Link to="/auth/register">Зарегестрироваться</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
