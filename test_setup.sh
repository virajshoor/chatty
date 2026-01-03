#!/bin/bash

# Setup Test Script - Verify installation and configuration

echo "=================================="
echo "  Setup Verification Test"
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS=0
FAIL=0

# Test Python
echo -n "Checking Python installation... "
if command -v python3 &> /dev/null; then
    VERSION=$(python3 --version)
    echo -e "${GREEN}✓${NC} $VERSION"
    ((PASS++))
elif command -v python &> /dev/null; then
    VERSION=$(python --version)
    echo -e "${GREEN}✓${NC} $VERSION"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Python not found"
    ((FAIL++))
fi

# Test Node.js
echo -n "Checking Node.js installation... "
if command -v node &> /dev/null; then
    VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} $VERSION"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Node.js not found"
    ((FAIL++))
fi

# Test npm
echo -n "Checking npm installation... "
if command -v npm &> /dev/null; then
    VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} v$VERSION"
    ((PASS++))
else
    echo -e "${RED}✗${NC} npm not found"
    ((FAIL++))
fi

# Check backend files
echo -n "Checking backend files... "
if [ -f "backend/app.py" ] && [ -f "backend/requirements.txt" ]; then
    echo -e "${GREEN}✓${NC} Found"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Missing"
    ((FAIL++))
fi

# Check frontend files
echo -n "Checking frontend files... "
if [ -f "frontend/package.json" ] && [ -f "frontend/src/App.tsx" ]; then
    echo -e "${GREEN}✓${NC} Found"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Missing"
    ((FAIL++))
fi

# Check example files
echo -n "Checking example data files... "
if [ -f "examples/sample_health_data.csv" ] && [ -f "examples/sample_sensor_data.json" ]; then
    echo -e "${GREEN}✓${NC} Found"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Missing"
    ((FAIL++))
fi

# Test backend API (if running)
echo -n "Testing backend API (if running)... "
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Backend is running"
    ((PASS++))
else
    echo -e "${YELLOW}⚠${NC} Backend not running (run 'cd backend && python app.py')"
fi

# Test frontend (if running)
echo -n "Testing frontend (if running)... "
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Frontend is running"
    ((PASS++))
else
    echo -e "${YELLOW}⚠${NC} Frontend not running (run 'cd frontend && npm start')"
fi

echo ""
echo "=================================="
echo "  Test Results"
echo "=================================="
echo -e "${GREEN}Passed: $PASS${NC}"
if [ $FAIL -gt 0 ]; then
    echo -e "${RED}Failed: $FAIL${NC}"
fi
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Start the servers:"
    echo "   ./start.sh (or start.bat on Windows)"
    echo "2. Open browser to: http://localhost:3000"
    echo "3. Upload a file from examples/ folder"
else
    echo -e "${RED}✗ Some checks failed. Please install missing components.${NC}"
    echo ""
    echo "See SETUP_GUIDE.md for detailed instructions."
fi

echo "=================================="
