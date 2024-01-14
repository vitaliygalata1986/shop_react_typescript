import { useState, MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import Error from './pages/Error/Error';

function App() {
  const [counter, setCounter] = useState<number>(0);

  const addCounter = (e: MouseEvent) => {
    // MouseEvent - синтетическое событие, и вся типизация этих событий лежит напрямую в реакт
    console.log(e);
  };

  return (
    <>
      <Button appearence="big" className="btn" type="button">
        Кнопка
      </Button>
      <Button appearence="small" className="btn" type="button">
        Кнопка
      </Button>
      <Input type="text" placeholder="enter your text" />
      <div>
        <a href="/">Меню</a>
        <a href="/cart">Корзина</a>
      </div>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
