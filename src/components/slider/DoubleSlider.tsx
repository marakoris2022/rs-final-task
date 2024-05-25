import { useState } from 'react';
import styles from './doubleSlider.module.scss';
import './slider.scss';
import Slider from 'react-slider';

const MIN = 2;
const MAX = 1000;

export const DoubleSlider = () => {
  const [values, setValues] = useState([MIN, MAX]);
  return (
    <div className={styles.box}>
      <h3 className={styles.title}>
        Price <span>Range</span>
      </h3>
      <div className={styles.values}>
        ${values[0]} - ${values[1]}
      </div>
      <small>Current Range: ${values[1] - values[0]}</small>
      <Slider className={'slider'} onChange={setValues} value={values} min={MIN} max={MAX} />
    </div>
  );
};
