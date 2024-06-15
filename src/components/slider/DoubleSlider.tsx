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

export const DoubleSlider = ({ title, MIN, MAX }: DoubleSliderProbs) => {
  const resetMin = useCategoryStore((state) => state.resetMin);
  const resetMax = useCategoryStore((state) => state.resetMax);
  const setResetMin = useCategoryStore((state) => state.setResetMin);
  const setResetMax = useCategoryStore((state) => state.setResetMax);
  const sliderPriceValues = useCategoryStore((state) => state.sliderPriceValues);
  const setSliderPriceValues = useCategoryStore((state) => state.setSliderPriceValues);

  useEffect(() => {
    setSliderPriceValues([MIN, MAX]);
  }, []);

  useEffect(() => {
    setResetMin(sliderPriceValues[0] + '');
    setResetMax(sliderPriceValues[1] + '');
  }, [setResetMax, setResetMin, sliderPriceValues]);

  useEffect(() => {
    setSliderPriceValues([+resetMin, +resetMax]);
  }, [resetMin, resetMax, setSliderPriceValues]);

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>
        {title} <span>Range</span>
      </h3>
      <div className={styles.values}>
        <span style={{ fontSize: '1.8rem' }}>&cent;</span>
        <input
          className={styles.rangeValue}
          onChange={(event) => {
            const newValue = +event.target.value;
            setSliderPriceValues([newValue, sliderPriceValues[1]]);
          }}
          style={{ width: '30%', textAlign: 'end', borderRadius: '5px' }}
          type="text"
          name="minValue"
          value={sliderPriceValues[0]}
        />{' '}
        - <span style={{ fontSize: '1.8rem' }}>&cent;</span>
        <input
          className={styles.rangeValue}
          onChange={(event) => {
            const newValue = +event.target.value;
            setSliderPriceValues([sliderPriceValues[0], newValue]);
          }}
          style={{ width: '30%', textAlign: 'end', borderRadius: '5px' }}
          type="text"
          name="maxValue"
          value={sliderPriceValues[1]}
        />
      </div>
      <small>
        Current Range:
        {sliderPriceValues[1] - sliderPriceValues[0]}
        <span> USD Cents</span>
      </small>
      {<Slider className={'slider'} onChange={setSliderPriceValues} value={sliderPriceValues} min={MIN} max={MAX} />}
    </div>
  );
};
