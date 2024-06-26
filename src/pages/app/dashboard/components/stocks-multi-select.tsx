import { toast } from 'sonner'

import { Stock } from '@/api/get-stocks'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-selector'

import { useDashboard } from '../hooks/use-dashboard'

export function StocksMultiSelect() {
  const { stocksSelected, setStocksSelected, stocks, isLoadingStocks } =
    useDashboard()

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <span className="text-2xl font-bold tracking-tight">
        Selecione um ativo ou mais para visualizar os dados
      </span>
      <MultiSelector
        values={stocksSelected}
        onValuesChange={(data) => {
          if (data.length > 5) {
            toast.warning('Você pode selecionar no máximo 5 ativos')
            return
          }
          setStocksSelected(data)
        }}
        loop
        className="w-full max-w-lg"
      >
        <MultiSelectorTrigger>
          <MultiSelectorInput
            placeholder={`${isLoadingStocks ? 'Carregando...' : 'Selecione um ativo aqui!'}`}
          />
        </MultiSelectorTrigger>

        <MultiSelectorContent>
          <MultiSelectorList>
            {stocks?.map((stock: Stock) => (
              <MultiSelectorItem key={stock.stock} value={stock.stock}>
                {stock.stock} - {stock.name}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
    </div>
  )
}
