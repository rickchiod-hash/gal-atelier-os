param(
  [string]$ProjectRoot = "K:\dev\repos\gal-atelier-os"
)

$ErrorActionPreference = "Stop"
Set-Location $ProjectRoot

$latest = Get-ChildItem "_archive" -Directory -Filter "repo-cleanup-*" -ErrorAction SilentlyContinue |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if (-not $latest) {
  Write-Host "[WARN] Nenhuma quarentena repo-cleanup-* encontrada."
  exit 0
}

Write-Host "[INFO] Última quarentena: $($latest.FullName)"
$answer = Read-Host "Digite RESTAURAR para mover os arquivos de volta"
if ($answer -ne "RESTAURAR") {
  Write-Host "[WARN] Cancelado."
  exit 0
}

$files = Get-ChildItem $latest.FullName -Recurse -File
foreach ($f in $files) {
  $rel = $f.FullName.Substring($latest.FullName.Length).TrimStart("\","/")
  $dest = Join-Path $ProjectRoot $rel
  $destDir = Split-Path $dest -Parent
  New-Item -ItemType Directory -Force -Path $destDir | Out-Null
  Move-Item -Force $f.FullName $dest
  Write-Host "[OK] Restaurado: $rel"
}

Write-Host "[OK] Restauração concluída. Rode git status."
