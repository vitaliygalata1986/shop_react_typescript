import { ButtonHTMLAttributes, ReactNode } from 'react';

// экспортируем интерфейс, который описывает те props, которые нужно передать в button
// ReactNode - это может быть строка, число, react элемент, JSX элемент конструктор, ReactPortal, undefined и т.д.

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // наш интерфейс наследуется от html атрибутов от HTMLButtonElement
  // <> это дженерик
  // ButtonHTMLAttributes интерфейс, в котором типизированны различные атрибуты для кнопки
  // Интерфейс HTMLButtonElement предоставляет свойства и методы для управления элементами <button>
  children: ReactNode;
  appearence?: 'big' | 'small'; // union тип - опциональный, применяем ?
}
