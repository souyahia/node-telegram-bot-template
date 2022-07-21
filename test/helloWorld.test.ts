import { helloWorld } from '../src/helloWorld';
import { logger } from '../src/logger';

jest.mock('../src/logger');
const logSpy = jest.spyOn(logger, 'info');

describe('Hello World function', () => {
  it('should print hello world through the logger', () => {
    helloWorld();
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy.mock.calls[0][0]).toEqual('Hello World!');
  });
});
