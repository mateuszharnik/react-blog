/* eslint-disable no-console */
describe('Props validation', () => {
  it('should throw error about required prop', () => {
    const errors = ['Warning: Failed %s type: %s', 'prop', 'The prop `name` is marked as required in `Component`, but its value is `undefined`.'];
    const throwError = () => console.error(...errors);

    expect(throwError).toThrowError('Warning: Failed prop type: The prop `name` is marked as required in `Component`, but its value is `undefined`.');
  });

  it('should throw error about invalid prop type', () => {
    const errors = ['Warning: Failed %s type: %s', 'prop', 'Invalid prop `width` of type `boolean` supplied to `Component`, expected `number`.'];
    const throwError = () => console.error(...errors);

    expect(throwError).toThrowError('Warning: Failed prop type: Invalid prop `width` of type `boolean` supplied to `Component`, expected `number`.');
  });

  it('should not throw any error', () => {
    const throwError = () => console.error([]);

    expect(throwError).not.toThrowError('Warning: Failed prop type: The prop `name` is marked as required in `Component`, but its value is `undefined`.');
    expect(throwError).not.toThrowError('Warning: Failed prop type: Invalid prop `width` of type `boolean` supplied to `Component`, expected `number`.');
  });
});
