---
name: sync-docs
description: Update documentation files, commit changes, and push to GitHub
disable-model-invocation: true
allowed-tools: Bash(git *), Read, Edit, Write, Grep
---

# Sync Documentation Workflow

Update project documentation and sync to GitHub:

## Step 1: Analyze Current Session

Read all uncommitted/untracked files to understand what changed:
- Run `git status` and `git diff` to see changes
- Review modified files to understand the session's work

## Step 2: Update SESSION-NOTES.md

Read SESSION-NOTES.md and add a new session entry at the TOP (after the "Latest sessions appear at the top" line):

```markdown
## Session [N] - [Current Date]

### Overview
[Brief summary of what was accomplished this session]

### Accomplishments
- ✅ [Major items completed]
- ⚠️ [Items attempted but need follow-up]
- ❌ [Items blocked or failed]

### Key Decisions Made
[Any important technical or strategic decisions]

### Next Steps
- [ ] [Action items for next session]

### Notes
[Important context or observations]

---
```

Increment the session number based on the last session entry.

## Step 3: Check if CLAUDE.md Needs Updates

Review what changed and determine if CLAUDE.md needs updates:
- **New components added?** → Add to "Common Development Tasks" or component patterns
- **Tech stack changes?** → Update "Tech Stack" section
- **New development patterns?** → Update relevant sections
- **Project structure changes?** → Update "Project Structure" section

If CLAUDE.md needs updates, edit it. If not, skip this step.

## Step 4: Check if README.md Needs Updates

If README.md exists and changes warrant updates (new features, setup changes, etc.), update it.

## Step 5: Generate Commit Message

Based on all changes made (documentation updates + any code changes), create a concise commit message that:
- Starts with a verb (Add, Update, Fix, etc.)
- Summarizes the main changes
- Includes bullet points for multiple significant changes
- Follows the repository's commit message style

## Step 6: Commit and Push

Execute these commands:

```bash
# Add all documentation files
git add SESSION-NOTES.md CLAUDE.md README.md BUILDER-SPEC.md MONETIZATION-MODEL.md

# Add any other changed files
git add -A

# Create commit with generated message
git commit -m "$(cat <<'EOF'
[Your generated commit message here]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"

# Push to GitHub
git push origin main
```

## Step 7: Confirm Success

Show the user:
- ✅ Commit hash and message
- 📝 Files that were updated
- 🚀 Push status
- 📍 Link to GitHub repo

## Important Notes

- Be thorough when analyzing changes - read the actual file contents, don't just skim
- Session notes should capture the "why" behind decisions, not just "what" was done
- Only update CLAUDE.md if there are architectural or pattern changes worth documenting
- Always check git status before and after to ensure everything worked
- If push fails (e.g., SSH issues), inform the user and show them the error
