import json

# Read the tasks.json file
with open('.taskmaster/tasks/tasks.json', 'r') as f:
    data = json.load(f)

tasks = data['master']['tasks']

# Categorize tasks by status and priority
pending_tasks = [t for t in tasks if t['status'] == 'pending']
completed_tasks = [t for t in tasks if t['status'] in ['done', 'completed']]

# Group pending tasks by priority
high_priority = [t for t in pending_tasks if t['priority'] == 'high']
medium_priority = [t for t in pending_tasks if t['priority'] == 'medium']
low_priority = [t for t in pending_tasks if t['priority'] == 'low']

print("# LinkedIn Writing Assistant - Task Priority Analysis")
print(f"\nTotal Tasks: {len(tasks)}")
print(f"Completed: {len(completed_tasks)}")
print(f"Pending: {len(pending_tasks)}")
print(f"Completion Rate: {len(completed_tasks) / len(tasks) * 100:.1f}%")

print("\n## HIGH PRIORITY TASKS (Ready to Start)")
for task in high_priority:
    deps_met = all(dep <= 5 for dep in task.get('dependencies', []))
    status = "✅ Dependencies Met" if deps_met else "⏳ Waiting on dependencies"
    print(f"- Task {task['id']}: {task['title']} - {status}")
    if task['id'] in [26, 27]:  # New LinkedIn tasks
        print(f"  → NEW LinkedIn-specific feature")

print("\n## MEDIUM PRIORITY TASKS")
for task in medium_priority:
    deps_met = all(dep <= 5 for dep in task.get('dependencies', []))
    status = "✅ Ready" if deps_met else "⏳ Blocked"
    print(f"- Task {task['id']}: {task['title']} - {status}")

print("\n## LOW PRIORITY TASKS")
for task in low_priority:
    print(f"- Task {task['id']}: {task['title']}")

print("\n## RECOMMENDED EXECUTION ORDER")
print("Based on dependencies and LinkedIn pivot priorities:")
print("\n### Phase 1: Core LinkedIn Features (Week 1-2)")
print("1. Task 19: Real-time document saving (HIGH)")
print("2. Task 26: LinkedIn Content Templates (HIGH, NEW)")
print("3. Task 6: LinkedIn Hook Optimizer (MEDIUM)")

print("\n### Phase 2: Optimization Features (Week 3-4)")
print("4. Task 27: LinkedIn Engagement Predictor (HIGH, NEW)")
print("5. Task 7: LinkedIn Optimization Panel (MEDIUM)")
print("6. Task 23: Auto-hook generation (MEDIUM)")

print("\n### Phase 3: Polish & Analytics (Week 5-6)")
print("7. Task 8: LinkedIn Export Functionality (MEDIUM)")
print("8. Task 30: LinkedIn Analytics Dashboard (MEDIUM)")
print("9. Task 28: Voice Profile System (MEDIUM)")

print("\n### Phase 4: Nice-to-Haves")
print("10. Task 18: Suggestion tabs UX (MEDIUM)")
print("11. Task 21: Sidebar visual feedback (MEDIUM)")
print("12. Task 24: Settings page (LOW)")
print("13. Task 25: Help page (LOW)")
print("14. Task 29: Chrome Extension Planning (LOW)")

print("\n## KEY INSIGHTS")
print("- 30% of tasks are completed")
print("- 5 new LinkedIn-specific tasks added (26-30)")
print("- Most high-priority tasks have dependencies met")
print("- Focus should be on LinkedIn-specific features first")