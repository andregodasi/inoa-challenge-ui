import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TransformedData } from '@/pages/util/transformDataChart'

interface StocksHeaderChartProps {
  setPeriod: (period: number) => void
  dataResults: TransformedData[]
}

export function StocksHeaderChart({
  setPeriod,
  dataResults,
}: StocksHeaderChartProps) {
  return (
    <CardHeader className="flex-col items-center justify-between pb-8 md:flex-row">
      <div className="space-y-1">
        <CardTitle className="text-base font-medium">Ativos</CardTitle>
        <CardDescription>
          Veja as comparações dos ativos dos últimos 3 meses
        </CardDescription>
      </div>
      <div className="flex items-center gap-3">
        <Label>Período</Label>
        <Select
          disabled={!dataResults.length}
          onValueChange={(data: string) => setPeriod(Number(data))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione um período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10 dias</SelectItem>
              <SelectItem value="20">1 mês</SelectItem>
              <SelectItem value="40">2 meses</SelectItem>
              <SelectItem value="0">3 meses</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </CardHeader>
  )
}
