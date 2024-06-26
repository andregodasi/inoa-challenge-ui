import { UseQueryResult } from '@tanstack/react-query'

import { StockRangeResponse } from '@/api/get-stock-range'

import {
  transformDataChartMock,
  transformDataChartResult,
} from './__mocks__/transformDataChart.mock'
import { transformDataChart } from './transformDataChart'

describe('transformDataChart', () => {
  it('should be able returns corretly values', () => {
    const result = transformDataChart(
      transformDataChartMock as UseQueryResult<StockRangeResponse, Error>[],
    )

    expect(result).toEqual(transformDataChartResult)
  })
})
