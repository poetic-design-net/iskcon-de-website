#\!/bin/bash

# Get all component files
components=$(find src/lib/components -name "*.svelte" -type f)

# Check each component
echo "=== UNUSED COMPONENTS ==="
echo ""

for component_file in $components; do
    component_name=$(basename "$component_file" .svelte)
    component_dir=$(dirname "$component_file")
    
    # Search for imports of this component (excluding the file itself and index files)
    import_count=$(rg -l "import.*${component_name}.*from" src --type svelte --type ts --type js 2>/dev/null  < /dev/null |  grep -v "$component_file" | grep -v "index.ts" | wc -l)
    
    # Also check for direct usage in templates (for global components)
    usage_count=$(rg -l "<${component_name}[ />]" src --type svelte 2>/dev/null | grep -v "$component_file" | wc -l)
    
    total_usage=$((import_count + usage_count))
    
    if [ $total_usage -eq 0 ]; then
        echo "❌ $component_file"
    fi
done

echo ""
echo "=== DELETED COMPONENTS STILL REFERENCED ==="
echo ""

# Check for deleted components from git status
deleted_components=(
    "PageCtaSection"
    "PageFaqSection"
    "PageGridSection"
    "PageHeroSection"
    "PageMediaSection"
    "PageQuoteSection"
    "__MegaMenuTrigger_"
)

for comp in "${deleted_components[@]}"; do
    refs=$(rg -l "$comp" src --type svelte --type ts --type js 2>/dev/null || true)
    if [ \! -z "$refs" ]; then
        echo "⚠️  $comp is still referenced in:"
        echo "$refs" | sed 's/^/   - /'
    fi
done

echo ""
echo "=== DEBUG/TEMPORARY FILES ==="
echo ""

# Find debug and temporary files
debug_files=$(find . -name "debug-*.js" -o -name "debug-*.mjs" -o -name "test-*.js" -o -name "*.log" 2>/dev/null | grep -v node_modules | grep -v .git)
if [ \! -z "$debug_files" ]; then
    echo "$debug_files"
fi

