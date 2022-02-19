import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';

import arrowDown from 'assets/images/select-arrow.svg';
import styles from './style.module.scss';

const Select = ({ options = [], value = '', placeholder = 'Label', onChange = () => {} }) => {
  const [open, setOpen] = useState(false);

  function changeOpen(v) {
    setOpen(v);
  }

  function clickOption(i) {
    onChange(i);
    changeOpen(false);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => changeOpen(false)}>
      <div className={styles['select__wrapper']}>
        <div className={styles['select__head']} onClick={() => changeOpen(true)}>
          <p>{value.title ?? placeholder}</p>
          <div>
            <img src={arrowDown} alt="arrow" />
          </div>
        </div>
        {options.length && open && (
          <>
            <div className={styles['select__context']}>
              {options.map(i => (
                <div
                  key={i.value}
                  className={styles['select__context__item']}
                  onClick={() => clickOption(i)}
                >
                  {i.title}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </OutsideClickHandler>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default Select;
