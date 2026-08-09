$ErrorActionPreference = "Stop"

$cssPath = Join-Path $PSScriptRoot "..\_site\assets\css\main.css"

if (-not (Test-Path -LiteralPath $cssPath)) {
  Write-Error "Compiled CSS was not found at _site/assets/css/main.css. Run the Jekyll build before deploying."
}

$css = Get-Content -LiteralPath $cssPath -Raw

if ([string]::IsNullOrWhiteSpace($css)) {
  Write-Error "Compiled CSS is empty at _site/assets/css/main.css."
}

if ($css -match "@(use|import)\b") {
  Write-Error "Raw Sass directive found in _site/assets/css/main.css. Production would serve broken CSS. Keep assets/css/main.scss and _assets/site.scss on Jekyll-compatible @import syntax."
}

if ($css -notmatch ":root" -or $css -notmatch "\.site-footer" -or $css.Length -lt 1000) {
  Write-Error "Compiled CSS does not look complete. Expected core styles were not found in _site/assets/css/main.css."
}

Write-Host "CSS output check passed: _site/assets/css/main.css is compiled."
