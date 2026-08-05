#!/usr/bin/env bash

set -u

SITE="https://convertgeine.com"
API="https://convertgeine-compressor.onrender.com"

PASS=0
WARN=0
FAIL=0

green='\033[0;32m'
yellow='\033[0;33m'
red='\033[0;31m'
bold='\033[1m'
reset='\033[0m'

pass() {
  printf "${green}✓ PASS${reset}  %s\n" "$1"
  PASS=$((PASS + 1))
}

warn() {
  printf "${yellow}! WARN${reset}  %s\n" "$1"
  WARN=$((WARN + 1))
}

fail() {
  printf "${red}✗ FAIL${reset}  %s\n" "$1"
  FAIL=$((FAIL + 1))
}

status_code() {
  curl -L -sS \
    --connect-timeout 20 \
    --max-time 90 \
    -o /dev/null \
    -w "%{http_code}" \
    "$1" 2>/dev/null || printf "000"
}

check_page() {
  local label="$1"
  local url="$2"
  local code

  code="$(status_code "$url")"

  if [[ "$code" == "200" ]]; then
    pass "$label returned HTTP 200"
  elif [[ "$code" =~ ^30[1278]$ ]]; then
    warn "$label returned redirect HTTP $code"
  else
    fail "$label returned HTTP $code"
  fi
}

printf "\n${bold}ConvertGeine Health Check${reset}\n"
printf "Checked: %s\n\n" "$(date)"

printf "${bold}1. Public website pages${reset}\n"

check_page "Homepage" "$SITE/"
check_page "Compress PDF" "$SITE/compress-pdf"
check_page "Merge PDF" "$SITE/merge-pdf"
check_page "Sitemap" "$SITE/sitemap.xml"
check_page "robots.txt" "$SITE/robots.txt"

printf "\n${bold}2. Render backend${reset}\n"

HEALTH="$(curl -L -sS \
  --connect-timeout 20 \
  --max-time 90 \
  "$API/health" 2>/dev/null || true)"

if printf '%s' "$HEALTH" | grep -qi '"status"[[:space:]]*:[[:space:]]*"healthy"'; then
  pass "Render health endpoint reports healthy"
else
  fail "Render health endpoint did not report healthy"
  printf "       Response: %s\n" "${HEALTH:-No response}"
fi

OPENAPI_FILE="$(mktemp)"

if curl -L -sS \
  --connect-timeout 20 \
  --max-time 90 \
  "$API/openapi.json" \
  -o "$OPENAPI_FILE" 2>/dev/null; then
  pass "OpenAPI document is reachable"

  if grep -q '"/compress"' "$OPENAPI_FILE"; then
    pass "POST /compress exists"
  else
    fail "POST /compress is missing"
  fi

  if grep -q '"/merge"' "$OPENAPI_FILE"; then
    pass "POST /merge exists"
  else
    fail "POST /merge is missing"
  fi
else
  fail "Could not download OpenAPI document"
fi

rm -f "$OPENAPI_FILE"

printf "\n${bold}3. SEO and mobile-page basics${reset}\n"

HOME_FILE="$(mktemp)"

if curl -L -sS \
  --connect-timeout 20 \
  --max-time 90 \
  "$SITE/" \
  -o "$HOME_FILE" 2>/dev/null; then

  if grep -Eqi '<title[^>]*>[^<]+' "$HOME_FILE"; then
    pass "Homepage contains a title"
  else
    fail "Homepage title is missing"
  fi

  if grep -Eqi '<meta[^>]+name=["'\'']description["'\'']' "$HOME_FILE"; then
    pass "Homepage contains a meta description"
  else
    warn "Homepage meta description was not detected"
  fi

  if grep -Eqi '<meta[^>]+name=["'\'']viewport["'\'']' "$HOME_FILE"; then
    pass "Mobile viewport metadata exists"
  else
    fail "Mobile viewport metadata is missing"
  fi

  if grep -Eqi '<link[^>]+rel=["'\'']canonical["'\'']' "$HOME_FILE"; then
    pass "Canonical URL exists"
  else
    warn "Canonical URL was not detected"
  fi

  if grep -Eqi '<meta[^>]+property=["'\'']og:' "$HOME_FILE"; then
    pass "Open Graph metadata exists"
  else
    warn "Open Graph metadata was not detected"
  fi
else
  fail "Could not download homepage HTML"
fi

rm -f "$HOME_FILE"

printf "\n${bold}4. Security and HTTPS${reset}\n"

HEADERS_FILE="$(mktemp)"

if curl -L -sS -I \
  --connect-timeout 20 \
  --max-time 90 \
  "$SITE/" \
  -o "$HEADERS_FILE" 2>/dev/null; then

  pass "HTTPS connection succeeded"

  if grep -qi '^strict-transport-security:' "$HEADERS_FILE"; then
    pass "HSTS security header exists"
  else
    warn "HSTS security header was not detected"
  fi

  if grep -qi '^x-content-type-options:' "$HEADERS_FILE"; then
    pass "X-Content-Type-Options header exists"
  else
    warn "X-Content-Type-Options header was not detected"
  fi

  if grep -qi '^content-security-policy:' "$HEADERS_FILE"; then
    pass "Content Security Policy exists"
  else
    warn "Content Security Policy was not detected"
  fi
else
  fail "Could not retrieve website headers"
fi

rm -f "$HEADERS_FILE"

printf "\n${bold}5. API CORS for the live website${reset}\n"

CORS_HEADERS="$(mktemp)"

curl -sS -D "$CORS_HEADERS" -o /dev/null \
  --connect-timeout 20 \
  --max-time 90 \
  -X OPTIONS \
  -H "Origin: $SITE" \
  -H "Access-Control-Request-Method: POST" \
  "$API/compress" 2>/dev/null || true

if grep -qi '^access-control-allow-origin: https://convertgeine.com' "$CORS_HEADERS"; then
  pass "Compress API permits requests from convertgeine.com"
else
  warn "Could not confirm Compress API CORS permission"
fi

rm -f "$CORS_HEADERS"

TOTAL=$((PASS + WARN + FAIL))

printf "\n${bold}Result${reset}\n"
printf "${green}Passed: %d${reset}\n" "$PASS"
printf "${yellow}Warnings: %d${reset}\n" "$WARN"
printf "${red}Failed: %d${reset}\n" "$FAIL"
printf "Total checks: %d\n" "$TOTAL"

if [[ "$FAIL" -eq 0 ]]; then
  printf "\n${green}${bold}ConvertGeine passed all essential automated checks.${reset}\n"
  exit 0
else
  printf "\n${red}${bold}Some essential checks failed. Review the failed lines above.${reset}\n"
  exit 1
fi
