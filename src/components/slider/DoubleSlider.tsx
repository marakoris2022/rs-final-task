import { useState } from 'react';
import styles from './doubleSlider.module.scss';
import './slider.scss';
import Slider from 'react-slider';

type DoubleSliderProbs = {
  title: string;
  MIN: number;
  MAX: number;
};

export const DoubleSlider = ({ title, MIN, MAX }: DoubleSliderProbs) => {
  const [values, setValues] = useState([MIN, MAX]);
  return (
    <div className={styles.box}>
      <h3 className={styles.title}>
        {title} <span>Range</span>
      </h3>
      <div className={styles.values}>
        ${values[0]} - ${values[1]}
      </div>
      <small>Current Range: ${values[1] - values[0]}</small>
      <Slider className={'slider'} onChange={setValues} value={values} min={MIN} max={MAX} />
    </div>
  );
};
