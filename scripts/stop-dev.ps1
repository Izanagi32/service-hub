param(
  [int]$Port = 3000
)

$connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue

if (-not $connections) {
  Write-Output "No process is listening on port $Port."
  exit 0
}

$processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique

foreach ($pid in $processIds) {
  try {
    Stop-Process -Id $pid -Force -ErrorAction Stop
    Write-Output "Stopped process $pid on port $Port."
  } catch {
    Write-Output "Failed to stop process $pid on port ${Port}: $($_.Exception.Message)"
    exit 1
  }
}
