import { VoidFunctionComponent, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { SelectOption } from 'common/interfaces';
import arrowDown from 'assets/images/select-arrow.svg';
import styles from './style.module.scss';

interface SelectProps {
  options: SelectOption[];
  value: SelectOption | string;
  placeholder: string;
  onChange: (selectOption: SelectOption) => void;
}

const Select: VoidFunctionComponent<SelectProps> = ({ options, value, placeholder, onChange }) => {
  const [open, setOpen] = useState<boolean>(false);

  const changeOpen = (value: boolean): void => setOpen(value);

  const clickOption = (selectOption: SelectOption): void => {
    onChange(selectOption);
    changeOpen(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => changeOpen(false)}>
      <div className={styles['select__wrapper']}>
        <div className={styles['select__head']} onClick={() => changeOpen(true)}>
          <p>{value instanceof Object ? value.title : placeholder}</p>
          <div>
            <img src={arrowDown} alt="arrow" />
          </div>
        </div>
        {options.length && open && (
          <>
            <div className={styles['select__context']}>
              {options.map(option => (
                <div
                  key={option.value}
                  className={styles['select__context__item']}
                  onClick={() => clickOption(option)}
                >
                  {option.title}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default Select;
