#!/usr/bin/env python3
"""
Generate GitHub issues from ISSUES_TO_CREATE.csv
Creates markdown files in .github/ISSUES/ that can be used to create issues via GitHub API
"""

import csv
import os
from datetime import datetime

# Read the CSV file
csv_path = 'ISSUES_TO_CREATE.csv'
output_dir = '.github/ISSUES'

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# Labels mapping (GitHub labels don't support / separator)
label_mapping = {
    'enhancement, data, geospatial': ['enhancement', 'data', 'geospatial'],
    'design, frontend, geospatial': ['design', 'frontend', 'geospatial'],
    'frontend, geospatial': ['frontend', 'geospatial'],
    'frontend, backend, geospatial': ['frontend', 'backend', 'geospatial'],
    'backend, frontend, policy': ['backend', 'frontend', 'policy'],
    'backend, frontend': ['backend', 'frontend'],
    'frontend, UX': ['frontend', 'UX'],
    'frontend, AI': ['frontend', 'AI'],
    'ci, infra': ['ci', 'infra'],
    'docs, ci': ['docs', 'ci'],
    'infra, ci': ['infra', 'ci'],
    'data, geospatial': ['data', 'geospatial'],
    'frontend, design': ['frontend', 'design'],
}

# Priority mapping
priority_mapping = {
    'P1': 'P1 - High Priority',
    'P2': 'P2 - Medium Priority',
}

def generate_issue_files():
    """Read CSV and generate issue markdown files"""
    issues_created = []

    with open(csv_path, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for i, row in enumerate(reader, start=1):
            title = row['Title'].strip() if row.get('Title') else ''
            body = row['Body'].strip() if row.get('Body') else ''
            labels_str = row['Labels'].strip() if row.get('Labels') else ''
            priority = row['Priority'].strip() if row.get('Priority') else 'P2'
            area = row.get('Area', '').strip() if row.get('Area') else ''

            # Generate safe filename
            safe_title = title.replace('[', '').replace(']', '').replace(':', '-').replace(' ', '_').replace('/', '-')
            filename = f"{i:03d}_{safe_title}.md"
            filepath = os.path.join(output_dir, filename)

            # Parse labels
            labels = label_mapping.get(labels_str, [labels_str])

            # Add priority label
            priority_label = priority_mapping.get(priority, priority)
            if priority_label not in labels:
                labels.append(priority_label)

            # Add area labels
            if area:
                area_labels = [a.strip() for a in area.split(',')]
                for al in area_labels:
                    if al not in labels:
                        labels.append(al)

            # Generate markdown content
            issue_content = f"""---
title: {title}
labels: {', '.join(labels)}
---

{body}

---
*Generated from ISSUES_TO_CREATE.csv on {datetime.now().strftime('%Y-%m-%d')}*
*Priority: {priority}*
*Area: {area}*
"""

            # Write file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(issue_content)

            issues_created.append({
                'number': i,
                'title': title,
                'file': filepath,
                'labels': labels,
                'priority': priority,
                'area': area
            })

            print(f"Created: {filepath}")

    return issues_created

def print_summary(issues):
    """Print summary of created issues"""
    print("\n" + "="*80)
    print("SUMMARY: GitHub Issues Generated")
    print("="*80)
    print(f"\nTotal issues: {len(issues)}")
    print("\nBreakdown by Priority:")

    p1_count = sum(1 for i in issues if i['priority'] == 'P1')
    p2_count = sum(1 for i in issues if i['priority'] == 'P2')
    print(f"  P1 (High): {p1_count}")
    print(f"  P2 (Medium): {p2_count}")

    print("\nBreakdown by Area:")
    areas = {}
    for issue in issues:
        for area in issue['area'].split(','):
            area = area.strip()
            areas[area] = areas.get(area, 0) + 1

    for area, count in sorted(areas.items(), key=lambda x: x[1], reverse=True):
        print(f"  {area}: {count}")

    print("\nAll issue files created in:", os.path.abspath(output_dir))
    print("\nTo create these issues in GitHub, you can:")
    print("1. Manually copy-paste each file content to GitHub issues")
    print("2. Use GitHub API to bulk create issues from these files")
    print("3. Use a tool like 'gh issue create' from GitHub CLI")
    print("\n" + "="*80)

if __name__ == '__main__':
    print("Generating GitHub issues from ISSUES_TO_CREATE.csv...")
    issues = generate_issue_files()
    print_summary(issues)
