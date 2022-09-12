import getWindowInnerHeight from './index';

describe('getWindowInnerHeight', () => {
  let windowSpy = null;

  beforeAll(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterAll(() => {
    windowSpy.mockRestore();
  });

  it('should return window innerHeight value if given param is not number type', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 10,
    }));

    expect(getWindowInnerHeight(NaN)).toEqual(10);
    expect(getWindowInnerHeight(Infinity)).toEqual(10);
    expect(getWindowInnerHeight('abc')).toEqual(10);
    expect(getWindowInnerHeight(undefined)).toEqual(10);
    expect(getWindowInnerHeight(null)).toEqual(10);
    expect(getWindowInnerHeight([])).toEqual(10);
    expect(getWindowInnerHeight({})).toEqual(10);
  });

  it('should return window innerHeight value if given param is less than or equal to 0', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 200,
    }));

    expect(getWindowInnerHeight(0)).toEqual(200);
    expect(getWindowInnerHeight(-100)).toEqual(200);
  });

  it('should return correct value if window.innerHeight and offsetHeigh are floating points numbers', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 200.65,
    }));

    expect(getWindowInnerHeight(100.22)).toEqual(100.43);
  });

  it('should return the differences between window.innerHeight and offsetHeight', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 400,
    }));

    expect(getWindowInnerHeight(200)).toEqual(200);
  });

  it('should return window innerHeight value if given param is greater than window.innerHeight', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 400,
    }));

    expect(getWindowInnerHeight(401)).toEqual(400);
  });
});
