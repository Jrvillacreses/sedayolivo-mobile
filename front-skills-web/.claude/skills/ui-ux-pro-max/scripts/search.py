#!/usr/bin/env python3
"""
UI/UX Pro Max - Design Intelligence Search Tool
Searches design databases for styles, colors, typography, and UX guidelines.
"""

import argparse
import csv
import os
import sys
from pathlib import Path
from typing import List, Dict, Optional
from concurrent.futures import ThreadPoolExecutor, as_completed

# Get the base directory (skills/ui-ux-pro-max)
SCRIPT_DIR = Path(__file__).parent
BASE_DIR = SCRIPT_DIR.parent
DATA_DIR = BASE_DIR / "data"

# Domain to CSV file mapping
DOMAIN_FILES = {
    "style": "ui-styles.csv",
    "color": "ui-colors.csv",
    "typography": "ui-typography.csv",
    "chart": "ui-charts.csv",
    "ux": "ui-ux.csv",
    "landing": "ui-landing.csv",
    "product": "ui-products.csv",
    "prompt": "ui-prompts.csv",
    "react": "stack-react.csv",
    "web": "stack-web.csv",
}

STACK_FILES = {
    "html-tailwind": "stack-html-tailwind.csv",
    "react": "stack-react.csv",
    "nextjs": "stack-nextjs.csv",
    "vue": "stack-vue.csv",
    "svelte": "stack-svelte.csv",
    "swiftui": "stack-swiftui.csv",
    "react-native": "stack-react-native.csv",
    "flutter": "stack-flutter.csv",
    "shadcn": "stack-shadcn.csv",
}


def load_csv(filename: str) -> List[Dict]:
    """Load a CSV file and return list of dictionaries."""
    filepath = DATA_DIR / filename
    if not filepath.exists():
        return []
    
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return list(reader)


def search_domain(domain: str, keywords: List[str], max_results: int = 10) -> List[Dict]:
    """Search a specific domain for matching entries."""
    filename = DOMAIN_FILES.get(domain)
    if not filename:
        return []
    
    data = load_csv(filename)
    results = []
    
    for row in data:
        # Search across all columns
        text = ' '.join(str(v).lower() for v in row.values())
        score = sum(1 for kw in keywords if kw.lower() in text)
        if score > 0:
            row['_score'] = score
            results.append(row)
    
    # Sort by score descending
    results.sort(key=lambda x: x.get('_score', 0), reverse=True)
    return results[:max_results]


def search_stack(stack: str, keywords: List[str], max_results: int = 10) -> List[Dict]:
    """Search stack-specific guidelines."""
    filename = STACK_FILES.get(stack)
    if not filename:
        return []
    
    data = load_csv(filename)
    results = []
    
    for row in data:
        text = ' '.join(str(v).lower() for v in row.values())
        score = sum(1 for kw in keywords if kw.lower() in text)
        if score > 0:
            row['_score'] = score
            results.append(row)
    
    results.sort(key=lambda x: x.get('_score', 0), reverse=True)
    return results[:max_results]


def generate_design_system(keywords: List[str], project_name: str = "", format_type: str = "ascii") -> str:
    """Generate a complete design system based on keywords."""
    # Search multiple domains in parallel
    domains_to_search = ["product", "style", "color", "typography", "landing"]
    all_results = {}
    
    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_domain = {
            executor.submit(search_domain, domain, keywords, 5): domain
            for domain in domains_to_search
        }
        for future in as_completed(future_to_domain):
            domain = future_to_domain[future]
            try:
                all_results[domain] = future.result()
            except Exception:
                all_results[domain] = []
    
    # Also get UX guidelines
    all_results["ux"] = search_domain("ux", ["animation", "accessibility", "loading"], 5)
    
    # Build design system output
    if format_type == "markdown":
        return format_design_system_markdown(all_results, project_name, keywords)
    else:
        return format_design_system_ascii(all_results, project_name, keywords)


def format_design_system_ascii(results: Dict, project_name: str, keywords: List[str]) -> str:
    """Format design system as ASCII box."""
    width = 70
    border = "+" + "-" * (width - 2) + "+"
    
    lines = [border]
    title = f" DESIGN SYSTEM: {project_name or 'Untitled'} "
    lines.append(f"|{title:^{width-2}}|")
    lines.append(f"|{' Keywords: ' + ', '.join(keywords):^{width-2}}|")
    lines.append(border)
    
    # Product Pattern
    if results.get("product"):
        lines.append(f"| {'PATTERN':<15} | {results['product'][0].get('pattern', 'N/A'):<{width-22}}|")
    
    # Style
    if results.get("style"):
        style = results['style'][0]
        lines.append(f"| {'STYLE':<15} | {style.get('name', 'N/A'):<{width-22}}|")
        if style.get('description'):
            desc = style.get('description', '')[:width-22]
            lines.append(f"| {'':<15} | {desc:<{width-22}}|")
    
    # Colors
    if results.get("color"):
        color = results['color'][0]
        lines.append(border)
        lines.append(f"| {'COLORS':<{width-3}}|")
        lines.append(f"|   Primary: {color.get('primary', 'N/A'):<{width-15}}|")
        lines.append(f"|   Secondary: {color.get('secondary', 'N/A'):<{width-17}}|")
        lines.append(f"|   Accent: {color.get('accent', 'N/A'):<{width-14}}|")
    
    # Typography
    if results.get("typography"):
        typo = results['typography'][0]
        lines.append(border)
        lines.append(f"| {'TYPOGRAPHY':<{width-3}}|")
        lines.append(f"|   Heading: {typo.get('heading_font', 'N/A'):<{width-15}}|")
        lines.append(f"|   Body: {typo.get('body_font', 'N/A'):<{width-12}}|")
    
    # Landing Pattern
    if results.get("landing"):
        landing = results['landing'][0]
        lines.append(border)
        lines.append(f"| {'LANDING STRUCTURE':<{width-3}}|")
        lines.append(f"|   Pattern: {landing.get('pattern', 'N/A'):<{width-15}}|")
    
    # UX Guidelines
    if results.get("ux"):
        lines.append(border)
        lines.append(f"| {'UX GUIDELINES':<{width-3}}|")
        for ux in results['ux'][:3]:
            rule = ux.get('rule', 'N/A')[:width-6]
            lines.append(f"|   - {rule:<{width-7}}|")
    
    lines.append(border)
    return '\n'.join(lines)


def format_design_system_markdown(results: Dict, project_name: str, keywords: List[str]) -> str:
    """Format design system as Markdown."""
    lines = [
        f"# Design System: {project_name or 'Untitled'}",
        f"**Keywords:** {', '.join(keywords)}",
        ""
    ]
    
    if results.get("product"):
        product = results['product'][0]
        lines.extend([
            "## Pattern",
            f"- **Type:** {product.get('pattern', 'N/A')}",
            f"- **Description:** {product.get('description', 'N/A')}",
            ""
        ])
    
    if results.get("style"):
        style = results['style'][0]
        lines.extend([
            "## Style",
            f"- **Name:** {style.get('name', 'N/A')}",
            f"- **Description:** {style.get('description', 'N/A')}",
            f"- **CSS Keywords:** {style.get('css_keywords', 'N/A')}",
            ""
        ])
    
    if results.get("color"):
        color = results['color'][0]
        lines.extend([
            "## Color Palette",
            f"- **Primary:** {color.get('primary', 'N/A')}",
            f"- **Secondary:** {color.get('secondary', 'N/A')}",
            f"- **Accent:** {color.get('accent', 'N/A')}",
            f"- **Background:** {color.get('background', 'N/A')}",
            ""
        ])
    
    if results.get("typography"):
        typo = results['typography'][0]
        lines.extend([
            "## Typography",
            f"- **Heading Font:** {typo.get('heading_font', 'N/A')}",
            f"- **Body Font:** {typo.get('body_font', 'N/A')}",
            f"- **Mood:** {typo.get('mood', 'N/A')}",
            ""
        ])
    
    if results.get("landing"):
        landing = results['landing'][0]
        lines.extend([
            "## Landing Structure",
            f"- **Pattern:** {landing.get('pattern', 'N/A')}",
            f"- **Sections:** {landing.get('sections', 'N/A')}",
            ""
        ])
    
    if results.get("ux"):
        lines.append("## UX Guidelines")
        for ux in results['ux'][:5]:
            lines.append(f"- **{ux.get('category', 'General')}:** {ux.get('rule', 'N/A')}")
        lines.append("")
    
    return '\n'.join(lines)


def format_results(results: List[Dict], format_type: str = "ascii") -> str:
    """Format search results for display."""
    if not results:
        return "No results found."
    
    if format_type == "markdown":
        lines = ["| Field | Value |", "|-------|-------|"]
        for result in results:
            for key, value in result.items():
                if key != '_score':
                    lines.append(f"| {key} | {value} |")
            lines.append("|-------|-------|")
        return '\n'.join(lines)
    else:
        lines = []
        for i, result in enumerate(results, 1):
            lines.append(f"\n--- Result {i} ---")
            for key, value in result.items():
                if key != '_score':
                    lines.append(f"  {key}: {value}")
        return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="UI/UX Pro Max - Design Intelligence Search Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate complete design system
  python search.py "beauty spa wellness" --design-system -p "Serenity Spa"
  
  # Search specific domain
  python search.py "glassmorphism dark" --domain style
  
  # Get stack guidelines
  python search.py "animation performance" --stack react
  
  # Search with markdown output
  python search.py "fintech crypto" --design-system -f markdown
        """
    )
    
    parser.add_argument("keywords", nargs="*", help="Keywords to search for")
    parser.add_argument("--domain", "-d", choices=list(DOMAIN_FILES.keys()),
                        help="Search a specific domain")
    parser.add_argument("--stack", "-s", choices=list(STACK_FILES.keys()),
                        help="Get stack-specific guidelines")
    parser.add_argument("--design-system", "-ds", action="store_true",
                        help="Generate complete design system")
    parser.add_argument("--project", "-p", default="",
                        help="Project name for design system")
    parser.add_argument("--format", "-f", choices=["ascii", "markdown"],
                        default="ascii", help="Output format")
    parser.add_argument("--max-results", "-n", type=int, default=10,
                        help="Maximum number of results")
    parser.add_argument("--list-domains", action="store_true",
                        help="List available domains")
    parser.add_argument("--list-stacks", action="store_true",
                        help="List available stacks")
    
    args = parser.parse_args()
    
    if args.list_domains:
        print("Available domains:")
        for domain in DOMAIN_FILES.keys():
            print(f"  - {domain}")
        return
    
    if args.list_stacks:
        print("Available stacks:")
        for stack in STACK_FILES.keys():
            print(f"  - {stack}")
        return
    
    # Parse keywords (can be space or comma separated)
    keywords = []
    for kw in args.keywords:
        keywords.extend(kw.replace(",", " ").split())
    
    if not keywords and not args.list_domains and not args.list_stacks:
        parser.print_help()
        return
    
    if args.design_system:
        output = generate_design_system(keywords, args.project, args.format)
        print(output)
    elif args.domain:
        results = search_domain(args.domain, keywords, args.max_results)
        print(f"Searching domain '{args.domain}' for: {', '.join(keywords)}")
        print(format_results(results, args.format))
    elif args.stack:
        results = search_stack(args.stack, keywords, args.max_results)
        print(f"Searching stack '{args.stack}' for: {', '.join(keywords)}")
        print(format_results(results, args.format))
    else:
        # Default: search all domains
        print(f"Searching all domains for: {', '.join(keywords)}")
        for domain in DOMAIN_FILES.keys():
            results = search_domain(domain, keywords, 3)
            if results:
                print(f"\n=== {domain.upper()} ===")
                print(format_results(results, args.format))


if __name__ == "__main__":
    main()
