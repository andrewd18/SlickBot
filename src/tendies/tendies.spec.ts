import 'jasmine';
import nock from 'nock';

import { Tendies } from './tendies';
import { Quote, Stock } from './tendies-types';

describe('tendies', () => {
  const quote: Quote = {
    c: 226.83,
    h: 229,
    l: 226.03,
    o: 227.44,
    pc: 228.68,
    t: 1597969605,
  };
  const stocks: Stock[] = [
    {
      currency: 'USD',
      description: 'VIRGIN GALACTIC HOLDINGS INC',
      displaySymbol: 'SPCE',
      symbol: 'SPCE',
      type: 'EQS',
    },
    {
      currency: 'USD',
      description: 'TESLA INC',
      displaySymbol: 'TSLA',
      symbol: 'TSLA',
      type: 'EQS',
    },
  ];
  const zeroQuote: Quote = {
    c: 0.0,
    h: 0.0,
    l: 0.0,
    o: 0.0,
    pc: 0.0,
    t: 1597969605,
  };

  it('calculateQuotePercentage() calculates percentage', () => {
    expect(Tendies.calculateQuotePercentage(quote)).toBeCloseTo(-0.81, 2);
    expect(Tendies.calculateQuotePercentage(zeroQuote)).toBeCloseTo(0.0, 2);
  });

  it('quote() should get most recent stock numbers', async () => {
    nock('https://finnhub.io')
      .get('/api/v1/quote')
      .query((query) => query.symbol === 'foo') // only care about the symbol parameter
      .reply(200, quote);

    const fooQuote = await Tendies.quote('foo');
    expect(fooQuote.c).toEqual(226.83);
  });

  it('randomStock() should get a random stock from the exchange', async () => {
    nock('https://finnhub.io')
      .get('/api/v1/stock/symbol')
      .query((query) => query.exchange === 'foo') // only care about the exchange parameter
      .reply(200, stocks);

    const fooStock = await Tendies.randomStock('foo');
    expect(fooStock).toMatch(/SPCE|TSLA/);
  });
});
