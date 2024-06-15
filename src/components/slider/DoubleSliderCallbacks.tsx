import { useEffect } from 'react';
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
  const sliderCBValues = useCategoryStore((state) => state.sliderCBValues);
  const setSliderCBValues = useCategoryStore((state) => state.setSliderCBValues);

  useEffect(() => {
    setSliderCBValues([MIN, MAX]);
  }, []);

  useEffect(() => {
    setResetMinCalls(sliderCBValues[0] + '');
    setResetMaxCalls(sliderCBValues[1] + '');
  }, [setResetMaxCalls, setResetMinCalls, sliderCBValues]);

  useEffect(() => {
    setSliderCBValues([+resetMinCalls, +resetMaxCalls]);
  }, [resetMinCalls, resetMaxCalls, setSliderCBValues]);

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
            setSliderCBValues([newValue, sliderCBValues[1]]);
          }}
          style={{ width: '30%', textAlign: 'end', borderRadius: '5px' }}
          type="text"
          name="minValue"
          value={sliderCBValues[0]}
        />{' '}
        - {signs}
        <input
          className={styles.rangeValue}
          onChange={(event) => {
            const newValue = +event.target.value;
            setSliderCBValues([sliderCBValues[1], newValue]);
          }}
          style={{ width: '30%', textAlign: 'end', borderRadius: '5px' }}
          type="text"
          name="maxValue"
          value={sliderCBValues[1]}
        />
      </div>
      <small>
        Current Range: {signs}
        {sliderCBValues[1] - sliderCBValues[0]}
      </small>
      <Slider className={'slider'} onChange={setSliderCBValues} value={sliderCBValues} min={MIN} max={MAX} />
    </div>
  );
};
