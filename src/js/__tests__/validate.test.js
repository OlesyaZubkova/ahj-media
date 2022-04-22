/* eslint no-unused-expressions:0 */ // --> OFF

import validate from '../validate';

test('should validate coordinates without [] correctly', () => {
  expect(validate('54.38290131, -110.13028737')).toBeTruthy;
});

test('should validate coordinates with [] correctly', () => {
  expect(validate('[73.65103874, -40.52091237]')).toBeTruthy;
});

test('should validate coordinates without space correctly', () => {
  expect(validate('32.47921004,100.80721263')).toBeTruthy;
});

test('should check number correctly', () => {
  expect(validate('123456789')).toBeFalsy;
});

test('should check string correctly', () => {
  expect(validate('Lorem Ipsum')).toBeFalsy;
});
