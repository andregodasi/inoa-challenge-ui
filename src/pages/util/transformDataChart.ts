import { UseQueryResult } from '@tanstack/react-query'
import { format } from 'date-fns'

import { StockRangeResponse } from '@/api/get-stock-range'

export interface TransformedData {
  date: string
  [key: string]: string | number | undefined
}

export function transformDataChart(
  queryResults: UseQueryResult<StockRangeResponse, Error>[],
): TransformedData[] {
  const transformed: TransformedData[] = []

  // Assuming all stocks have the same dates and data length
  if (
    queryResults &&
    queryResults.length > 0 &&
    queryResults[0].data &&
    queryResults[0].data?.results?.[0]?.historicalDataPrice?.length > 0
  ) {
    // Iterate over the historicalDataPrice arrays (assuming they all have the same length)
    for (
      let i = 0;
      i < queryResults?.[0]?.data?.results?.[0]?.historicalDataPrice.length;
      i++
    ) {
      const date =
        queryResults?.[0].data.results?.[0].historicalDataPrice[i].date
      const entry: TransformedData = {
        date: format(new Date(date * 1000), 'dd/MM'),
      }

      // Populate each stock's price at this date
      for (let j = 0; j < queryResults.length; j++) {
        const stockName: string =
          queryResults?.[j]?.data?.results?.[0]?.symbol || ''
        const price =
          queryResults?.[j]?.data?.results?.[0].historicalDataPrice[i].close // Adjust as needed
        entry[stockName] = price
      }

      transformed.push(entry)
    }
  }

  return transformed
}
