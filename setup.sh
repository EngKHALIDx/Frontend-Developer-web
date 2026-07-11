#!/bin/bash
# ============================================================
# MonoVerse Project Setup Script
# سكربت إعداد مشروع مونو فيرس من الصفر
# ============================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════╗"
echo "║     MonoVerse Project Setup Script         ║"
echo "║     إعداد مشروع مونو فيرس                  ║"
echo "╚════════════════════════════════════════════╝"
echo -e "${NC}"

# Check Node.js
echo -e "${YELLOW}[1/6] فحص Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js مثبت: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js غير مثبت. يرجى تثبيته من https://nodejs.org/${NC}"
    exit 1
fi

# Check npm
echo -e "${YELLOW}[2/6] فحص npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm مثبت: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm غير مثبت${NC}"
    exit 1
fi

# Check Git
echo -e "${YELLOW}[3/6] فحص Git...${NC}"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓ Git مثبت: $GIT_VERSION${NC}"
else
    echo -e "${RED}✗ Git غير مثبت${NC}"
    exit 1
fi

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Install Frontend dependencies
echo -e "${YELLOW}[4/6] تثبيت حزم الواجهة الأمامية (Frontend)...${NC}"
if [ -d "Frontend Developer" ]; then
    cd "Frontend Developer"
    if [ -f "package.json" ]; then
        npm install
        echo -e "${GREEN}✓ تم تثبيت حزم الواجهة الأمامية${NC}"
    else
        echo -e "${RED}✗ ملف package.json غير موجود في Frontend Developer/${NC}"
        exit 1
    fi
    cd "$SCRIPT_DIR"
else
    echo -e "${RED}✗ مجلد Frontend Developer غير موجود${NC}"
    exit 1
fi

# Install Backend dependencies
echo -e "${YELLOW}[5/6] تثبيت حزم الخادم الخلفي (Backend)...${NC}"
if [ -d "Backend" ]; then
    cd "Backend"
    if [ -f "package.json" ]; then
        npm install
        echo -e "${GREEN}✓ تم تثبيت حزم الخادم الخلفي${NC}"
    else
        echo -e "${YELLOW}! ملف package.json غير موجود في Backend/${NC}"
    fi
    cd "$SCRIPT_DIR"
else
    echo -e "${YELLOW}! مجلد Backend غير موجود (اختياري)${NC}"
fi

# Final check
echo -e "${YELLOW}[6/6] فحص نهائي...${NC}"
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✅ تم الإعداد بنجاح!                   ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}🚀 لتشغيل الواجهة الأمامية:${NC}"
echo "   cd \"Frontend Developer\" && npm run dev"
echo "   ثم افتح: http://localhost:3000"
echo ""
echo -e "${BLUE}🔧 لتشغيل الخادم الخلفي:${NC}"
echo "   cd Backend && npm run dev"
echo "   ثم افتح: http://localhost:3001/health"
echo ""
echo -e "${BLUE}📚 للاطلاع على الدليل الكامل:${NC}"
echo "   افتح ملف SETUP.md"
echo ""
