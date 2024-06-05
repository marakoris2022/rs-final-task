import { useEffect, useState } from 'react';
import styles from './doubleSlider.module.scss';
import './slider.scss';
import Slider from 'react-slider';
import { useCategoryStore } from '../../store/useCategoryStore';

type DoubleSliderProbs = {
  title: string;
  MIN: number;
  MAX: number;
  signs?: string;
};

export const DoubleSliderCallbacks = ({ title, MIN, MAX, signs }: DoubleSliderProbs) => {
  const resetMinCalls = useCategoryStore((state) => state.resetMinCalls);
  const resetMaxCalls = useCategoryStore((state) => state.resetMaxCalls);
  const setResetMinCalls = useCategoryStore((state) => state.setResetMinCalls);
  const setResetMaxCalls = useCategoryStore((state) => state.setResetMaxCalls);

  const [values, setValues] = useState([MIN, MAX]);

  useEffect(() => {
    setResetMinCalls(values[0] + '');
    setResetMaxCalls(values[1] + '');
  }, [setResetMaxCalls, setResetMinCalls, values]);

  useEffect(() => {
    setValues([+resetMinCalls, +resetMaxCalls]);
  }, [resetMinCalls, resetMaxCalls]);

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>
        {title} <span>Range</span>
      </h3>
      <div className={styles.values}>
        {signs}
        <input
          className={styles.rangeValue}
          onChange={(event) => {
            const newValue = +event.target.value;
            setValues((prev) => {
              const arr = [...prev];
              arr[0] = newValue;
              return arr;
            });
          }}
          style={{ width: '30%', textAlign: 'end', borderRadius: '5px' }}
          type="text"
          name="minValue"
          value={values[0]}
        />{' '}
        - {signs}
        <input
          className={styles.rangeValue}
          onChange={(event) => {
            const newValue = +event.target.value;
            setValues((prev) => {
              const arr = [...prev];
              arr[1] = newValue;
              return arr;
            });
          }}
          style={{ width: '30%', textAlign: 'end', borderRadius: '5px' }}
          type="text"
          name="maxValue"
          value={values[1]}
        />
      </div>
      <small>
        Current Range: {signs}
        {values[1] - values[0]}
      </small>
      <Slider className={'slider'} onChange={setValues} value={values} min={MIN} max={MAX} />
    </div>
  );
};
