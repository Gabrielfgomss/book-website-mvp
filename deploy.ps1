# Script de Deploy - Book Website MVP
# Execute este script no PowerShell para preparar e fazer deploy

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Book Website MVP - Deploy Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar status do Git
Write-Host "[1/5] Verificando status do Git..." -ForegroundColor Yellow
git status

Write-Host ""
$continuar = Read-Host "Deseja continuar com o commit? (S/N)"
if ($continuar -ne "S" -and $continuar -ne "s") {
    Write-Host "Deploy cancelado pelo usuario." -ForegroundColor Red
    exit
}

# 2. Adicionar todos os arquivos
Write-Host ""
Write-Host "[2/5] Adicionando arquivos..." -ForegroundColor Yellow
git add .

# 3. Commit
Write-Host ""
$mensagemCommit = Read-Host "Digite a mensagem do commit (ou pressione Enter para usar padrão)"
if ([string]::IsNullOrWhiteSpace($mensagemCommit)) {
    $mensagemCommit = "feat: preparar projeto para deploy na Vercel"
}
git commit -m "$mensagemCommit"

# 4. Push para GitHub
Write-Host ""
Write-Host "[3/5] Fazendo push para o GitHub..." -ForegroundColor Yellow
$branch = git branch --show-current
Write-Host "Branch atual: $branch" -ForegroundColor Cyan
git push origin $branch

# 5. Testar build local
Write-Host ""
Write-Host "[4/5] Testando build local..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Build realizado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "[5/5] Próximos passos:" -ForegroundColor Yellow
    Write-Host "  1. Acesse: https://vercel.com" -ForegroundColor White
    Write-Host "  2. Clique em 'Add New Project'" -ForegroundColor White
    Write-Host "  3. Importe o repositório do GitHub" -ForegroundColor White
    Write-Host "  4. Configure:" -ForegroundColor White
    Write-Host "     - Framework: Vite" -ForegroundColor Gray
    Write-Host "     - Build Command: npm run build" -ForegroundColor Gray
    Write-Host "     - Output Directory: dist" -ForegroundColor Gray
    Write-Host "  5. Clique em 'Deploy'" -ForegroundColor White
    Write-Host ""
    Write-Host "🚀 Seu projeto estará no ar em poucos minutos!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📖 Para mais detalhes, consulte: DEPLOY.md" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Erro no build!" -ForegroundColor Red
    Write-Host "Por favor, corrija os erros antes de fazer deploy." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
