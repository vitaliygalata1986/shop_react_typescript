import { useState, MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

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
    </>
  );
}

export default App;
