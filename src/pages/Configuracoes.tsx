import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Settings, Save } from "lucide-react"

export default function Configuracoes() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Configure as definições do sistema</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Configurações Financeiras</CardTitle>
            <CardDescription>Defina juros e multas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="juros">Taxa de Juros (%)</Label>
              <Input id="juros" type="number" placeholder="2.5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="multa">Taxa de Multa (%)</Label>
              <Input id="multa" type="number" placeholder="10.0" />
            </div>
            <Button className="bg-gradient-primary text-white">
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">WhatsApp API</CardTitle>
            <CardDescription>Configurações da Evolution API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-url">URL da API</Label>
              <Input id="api-url" placeholder="https://api.exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">Chave da API</Label>
              <Input id="api-key" type="password" placeholder="sua-chave-api" />
            </div>
            <Button className="bg-gradient-primary text-white">
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}