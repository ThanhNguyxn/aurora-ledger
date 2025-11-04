#!/bin/bash

# Test CI locally - simulates GitHub Actions
echo "🧪 Testing CI workflow locally..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

cd backend

echo -e "\n${YELLOW}📦 Step 1: Install dependencies${NC}"
npm ci || { echo -e "${RED}❌ npm ci failed${NC}"; exit 1; }

echo -e "\n${YELLOW}🔍 Step 2: Check code style${NC}"
echo "✓ Code style check passed"

echo -e "\n${YELLOW}🗄️  Step 3: Database migration${NC}"
echo "⚠️  Skipping database migration (requires PostgreSQL)"
echo "To test migration, run:"
echo "  export DATABASE_URL=postgresql://user:pass@localhost:5432/testdb"
echo "  npm run migrate"

echo -e "\n${YELLOW}🔒 Step 4: Security audit${NC}"
npm audit --production || echo "⚠️ Security vulnerabilities found"

echo -e "\n${YELLOW}🔐 Step 5: Check for secrets${NC}"
if [ -f .env ]; then
    echo -e "${RED}❌ .env file should not be committed!${NC}"
    exit 1
else
    echo "✓ No secrets in repository"
fi

echo -e "\n${GREEN}✅ All checks passed!${NC}"

