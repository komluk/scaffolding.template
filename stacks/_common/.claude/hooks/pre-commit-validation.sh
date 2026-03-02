#!/bin/bash
# Pre-Commit Hook: Run validation before git commit
#
# Ensures code passes validation checks before allowing commit
# Frontend: npm run validate
# Backend (Python): pytest
# Backend (.NET): dotnet build && dotnet test

set -e

echo ""
echo "Running pre-commit validation..."
echo ""

# Check if we're in frontend directory or changes affect frontend
if [ -d "frontend" ] && git diff --cached --name-only | grep -q "^frontend/"; then
    echo "Frontend changes detected - running validation..."
    cd frontend

    # Run validation (type-check + lint + build)
    if npm run validate; then
        echo "Frontend validation passed!"
    else
        echo "Frontend validation failed!"
        echo ""
        echo "Fix the errors above before committing."
        echo "Or run: npm run validate"
        exit 1
    fi

    cd ..
fi

# Check if we're in backend directory or changes affect backend (Python)
if [ -d "backend" ] && git diff --cached --name-only | grep -q "^backend/.*\.py$"; then
    echo "Python backend changes detected - running tests..."

    # Auto-detect Python virtual environment
    VENV_ACTIVATED=false
    for venv_dir in venv .venv venv_linux; do
        if [ -f "${venv_dir}/bin/activate" ]; then
            source "${venv_dir}/bin/activate"
            VENV_ACTIVATED=true
            break
        fi
    done

    if [ "$VENV_ACTIVATED" = true ]; then
        if pytest; then
            echo "Python backend tests passed!"
        else
            echo "Python backend tests failed!"
            echo ""
            echo "Fix the failing tests before committing."
            exit 1
        fi
    else
        echo "WARNING: No Python venv found (checked venv/, .venv/, venv_linux/), skipping Python backend tests"
    fi
fi

# Check if changes affect .NET backend
if git diff --cached --name-only | grep -qE "\.(cs|csproj|sln)$"; then
    echo ".NET backend changes detected - running build and tests..."

    # Check if dotnet CLI is available
    if command -v dotnet &> /dev/null; then
        if dotnet build; then
            echo ".NET build passed!"
        else
            echo ".NET build failed!"
            echo ""
            echo "Fix the build errors before committing."
            exit 1
        fi

        if dotnet test; then
            echo ".NET tests passed!"
        else
            echo ".NET tests failed!"
            echo ""
            echo "Fix the failing tests before committing."
            exit 1
        fi
    else
        echo "WARNING: dotnet CLI not found, skipping .NET validation"
    fi
fi

echo ""
echo "All validation checks passed!"
echo ""

exit 0
