import { Serie } from '@/api/get-stocks-history'

import {
  transformDataHistoryChartMock,
  transformDataHistoryChartResult,
} from './__mocks__/transformDataHistoryToChart.mock'
import { transformDataHistoryChart } from './transformDataHistoryToChart'

describe('transformDataHistoryChart', () => {
  it('should be able returns corretly values', () => {
    const result = transformDataHistoryChart(
      transformDataHistoryChartMock as {
        'Monthly Time Series': Serie
      },
    )

    expect(result).toEqual(transformDataHistoryChartResult)
  })
})
