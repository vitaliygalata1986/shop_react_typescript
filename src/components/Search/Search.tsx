import { forwardRef } from 'react';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';

// forwardRef должен понимать - накакой элемент он будет применяться, используем дженерик <HTMLInputElement>
const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { className, isValid = false, ...props },
  ref
) {
  return (
    <div className={styles['input-wrapper']}>
      <img className={styles['icon']} src="search-icon.svg" alt="search" />

      <input
        ref={ref}
        className={cn(styles['input'], className, {
          [styles['invalid']]: isValid,
        })}
        {...props}
      />
    </div>
  );
});

export default Search;
