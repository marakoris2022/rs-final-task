import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

const customRender = (ui: React.ReactElement) => render(ui, { wrapper: BrowserRouter });

export * from '@testing-library/react';
export { renderWithRouter as render, customRender };
