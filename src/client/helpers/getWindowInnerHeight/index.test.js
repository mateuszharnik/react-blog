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

    expect(getWindowInnerHeight(NaN)).toStrictEqual(10);
    expect(getWindowInnerHeight(Infinity)).toStrictEqual(10);
    expect(getWindowInnerHeight('abc')).toStrictEqual(10);
    expect(getWindowInnerHeight(undefined)).toStrictEqual(10);
    expect(getWindowInnerHeight(null)).toStrictEqual(10);
    expect(getWindowInnerHeight([])).toStrictEqual(10);
    expect(getWindowInnerHeight({})).toStrictEqual(10);
  });

  it('should return window innerHeight value if given param is less than or equal to 0', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 200,
    }));

    expect(getWindowInnerHeight(0)).toStrictEqual(200);
    expect(getWindowInnerHeight(-100)).toStrictEqual(200);
  });

  it('should return correct value if window.innerHeight and offsetHeigh are floating points numbers', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 200.65,
    }));

    expect(getWindowInnerHeight(100.22)).toStrictEqual(100.43);
  });

  it('should return the differences between window.innerHeight and offsetHeight', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 400,
    }));

    expect(getWindowInnerHeight(200)).toStrictEqual(200);
  });

  it('should return window innerHeight value if given param is greater than window.innerHeight', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 400,
    }));

    expect(getWindowInnerHeight(401)).toStrictEqual(400);
  });
});
