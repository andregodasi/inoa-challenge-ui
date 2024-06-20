import { Frown } from 'lucide-react'

import { Stock } from '@/api/get-stocks'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { chartColors } from '../hooks/dashboard-provider'
import { useDashboard } from '../hooks/use-dashboard'

export function StockListDetails() {
  const { stockDetails, setIsOpenStockHistory, setStockSelected } =
    useDashboard()

  return (
    <Card className="col-span-9 md:col-span-3">
      <CardHeader>
        <CardTitle>Ativos selecionados</CardTitle>
        <CardDescription>Veja os detalhes dos ativos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {stockDetails?.map((stock: Stock, i: number) => (
            <div
              className="flex items-center justify-between"
              key={stock.stock}
            >
              <div className="flex items-center">
                <Avatar className={`h-9 w-9 border-2 ${chartColors[i].avatar}`}>
                  <AvatarImage src={stock.logo} alt={stock.name} />
                  <AvatarFallback>{stock.stock}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {stock.stock}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stock.name} - {stock.type}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsOpenStockHistory(true)
                  setStockSelected({
                    symbol: stock.stock,
                    color: chartColors[i],
                  })
                }}
              >
                Veja o histórico
              </Button>
            </div>
          ))}
          {!stockDetails?.length && (
            <div className="flex h-[240px] w-full flex-col items-center justify-center gap-6">
              <Frown size={68} />
              <p className="text-md font-semibold">Nenhum ativo selecionado</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
