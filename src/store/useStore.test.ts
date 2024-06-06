import { useStore } from './useStore';

describe('Store', () => {
  beforeEach(() => {
    useStore.setState({
      isLogged: false,
      isToken: false,
    });

    localStorage.clear();
  });

  it('should set and get isLogged', () => {
    useStore.getState().setLogged(true);

    const isLogged = useStore.getState().isLogged;

    expect(isLogged).toBe(true);
  });

  it('should set and get isToken', () => {
    useStore.getState().setIsToken(true);

    const isToken = useStore.getState().isToken;

    expect(isToken).toBe(true);
  });
});
