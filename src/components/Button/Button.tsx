import { FC } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

// типизация функционального компонента - альтернатива нижнего
// тоесть мы вернули функциональный компонент вот с такими пропсами: <ButtonProps> - используем дженерик <>
export const ButtonAlt: FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  // FC - function component
  return (
    <button
      className={cn(styles['button'], styles['accent'], className)}
      {...props}
    >
      {children}
    </button>
  );
};

function Button({
  children,
  className,
  appearence = 'small',
  ...props
}: ButtonProps) {
  // типизируем пропсы, используя ButtonProps

  return (
    <button
      className={cn(styles['button'], styles['accent'], className, {
        [styles['small']]: appearence === 'small',
        [styles['big']]: appearence === 'big',
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
