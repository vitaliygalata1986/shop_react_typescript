import { forwardRef } from 'react';
import styles from './Input.module.css';
import { InputProps } from './Input.props';
import cn from 'classnames';

// forwardRef должен понимать - накакой элемент он будет применяться, используем дженерик <HTMLInputElement>
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, isValid = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(styles['input'], className, {
        [styles['invalid']]: isValid,
      })}
      {...props}
    />
  );
});

export default Input;
