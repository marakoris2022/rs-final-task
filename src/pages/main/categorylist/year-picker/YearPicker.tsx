import styles from './yearPicker.module.scss';

const years = [
  1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
  2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
];

export const YearPicker = () => {
  return (
    <>
      <legend
        style={{
          color: '#fff',
        }}
      >
        Year of release:
      </legend>
      <select className={styles.yearSelect} name="year-select" multiple>
        {years.map((year) => (
          <option className={styles.yearOption} key={year} id={`release_${year}`} value={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
};
