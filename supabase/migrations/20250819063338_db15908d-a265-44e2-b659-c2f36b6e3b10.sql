-- Fix security definer views by recreating them without SECURITY DEFINER
-- Drop existing views
DROP VIEW IF EXISTS public.view_ocupacao_excursoes;
DROP VIEW IF EXISTS public.view_relatorio_financeiro;

-- Recreate view_ocupacao_excursoes without SECURITY DEFINER
CREATE VIEW public.view_ocupacao_excursoes AS
SELECT 
    e.id,
    e.destino,
    e.data_partida,
    e.capacidade,
    COUNT(p.id) as reservas,
    CASE 
        WHEN e.capacidade > 0 THEN ROUND((COUNT(p.id)::numeric / e.capacidade::numeric) * 100, 2)
        ELSE 0
    END as taxa_ocupacao
FROM public.excursoes e
LEFT JOIN public.passageiros p ON e.id = p.excursao_id
GROUP BY e.id, e.destino, e.data_partida, e.capacidade;

-- Recreate view_relatorio_financeiro without SECURITY DEFINER
CREATE VIEW public.view_relatorio_financeiro AS
SELECT 
    DATE_TRUNC('month', t.data_transacao) as mes,
    t.tipo,
    SUM(t.valor) as total_valor,
    COUNT(*) as quantidade_transacoes
FROM public.transacoes_financeiras t
GROUP BY DATE_TRUNC('month', t.data_transacao), t.tipo
ORDER BY mes DESC, t.tipo;