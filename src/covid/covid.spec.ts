import 'jasmine';
import nock from 'nock';

import { Covid } from './covid';

describe('covid', () => {
  it('usDaily() should get US daily numbers', async () => {
    nock('https://api.covidtracking.com')
      .get('/v1/us/current.json')
      .reply(
        200,
        [
          {
            date: 20200819,
            states: 56,
            positive: 5502927,
            negative: 63441940,
            pending: 4374,
            hospitalizedCurrently: 43313,
            hospitalizedCumulative: 353270,
            inIcuCurrently: 8816,
            inIcuCumulative: 16377,
            onVentilatorCurrently: 2371,
            onVentilatorCumulative: 1705,
            recovered: 1925049,
            dateChecked: '2020-08-19T00:00:00Z',
            death: 165011,
            hospitalized: 353270,
            lastModified: '2020-08-19T00:00:00Z',
            total: 68949241,
            totalTestResults: 68944867,
            posNeg: 68944867,
            deathIncrease: 1416,
            hospitalizedIncrease: 2036,
            negativeIncrease: 635831,
            positiveIncrease: 45103,
            totalTestResultsIncrease: 680934,
            hash: '9024bc2f59199a950c965babefbfac6f6c8948eb',
          },
        ],
      );

    const usDailyNumbers = await Covid.usDaily();
    expect(usDailyNumbers).toBe('1416 Americans laid down their lives for Mike\'s tendies today.');
  });
});
