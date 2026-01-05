#!/bin/bash

# Tailwind CSS v4 Migration Build Test Script

echo "🚀 Starting Tailwind CSS v4 migration build test..."
echo ""

# Check for package manager
if command -v pnpm &> /dev/null; then
    PKG_MANAGER="pnpm"
    echo "✓ Using pnpm"
elif command -v npm &> /dev/null; then
    PKG_MANAGER="npm"
    echo "✓ Using npm"
elif command -v yarn &> /dev/null; then
    PKG_MANAGER="yarn"
    echo "✓ Using yarn"
else
    echo "❌ No package manager found. Please install Node.js and npm/pnpm/yarn."
    exit 1
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
$PKG_MANAGER install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Run build
echo "🔨 Building project..."
$PKG_MANAGER run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful! Tailwind CSS v4 migration appears to be working."
    echo ""
    echo "Next steps:"
    echo "  1. Run '${PKG_MANAGER} run dev' to start the development server"
    echo "  2. Check that all pages render correctly"
    echo "  3. Verify shadcn/ui components display properly"
    echo "  4. Test custom theme colors and animations"
else
    echo ""
    echo "❌ Build failed. Please check the error messages above."
    echo "Common issues:"
    echo "  - Missing Tailwind v4 dependencies"
    echo "  - @theme syntax errors"
    echo "  - Content path issues"
    exit 1
fi

