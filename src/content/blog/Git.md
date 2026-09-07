---
title: "Git Cheatsheet"
description: "A quick overview of Git"
pubDate: "2025-11-08"
heroImage: '../../assets/blog/logo_git.png'
heroSize: small
foldHeadings: true
noTableHead: true
---
> [!note] What is Git?
> Git is a **version control system** (**VCS**) that tracks changes and preserves the version history of all files in a project.


> [!tip] References
>
> [LearnThatStack -- Git Will Finally Make Sense After This](https://youtu.be/Ala6PHlYjmw)
>
> [Programming with Mosh -- What is Git? Explained in 2 Minutes!](https://youtu.be/2ReR1YJrNOM)
>
> [QuickRef.ME -- Git Command Cheat Sheet & Quick Reference](https://quickref.me/git)
>
> [GitHub Cheatsheets -- GitHub Git Cheat Sheet](https://training.github.com/downloads/github-git-cheat-sheet/)
>
> [cbeams -- How to Write a Git Commit Message](https://cbea.ms/git-commit/)


#### Git Interfaces

Git is primarily used via the **command line** *(Command Line Interface or CLI)*. Other interfaces are available, such as Git-gui, Visual Studio Code with the GitLens extension, GitKraken, built-in IDE tools, etc.


#### What is a commit?

> [!note] A **commit** is a complete snapshot of the project files
> 1. A pointer to the snapshot files
> 2. Metadata: id, author, date, commit message
> 3. A pointer to the parent commit

The first commit has no parent
![Git/image.png](/blog/git/linked.png)


A commit with two parents makes branches
![Branches](/blog/git/two_parents.png)

You can jump to any commit in history

![Move HEAD](/blog/git/head.png)

Commits have SHA checksums that serve as unique IDs.
![Commit + Metadata + Parent = Hash](/blog/git/hash.png)


#### Local History `.git`

![DAG](/blog/git/dag_graph.png)

A family tree of snapshots: a Directed Acyclic Graph.
The history is saved in the project's folder (`.git/`), which forms the **Git repository.** Git is decentralized: every **repository** contains full history from the beginning.
Nearly Every Operation Is Local
Git Generally Only Adds Data

#### Handle a Local Repository `git init / status / log / diff`
> [!note] 
> A **local repository** is where project files, versions, and full modification history are stored on your machine.

| Create a Git repository                            | `git init`                                                                                                 |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Check repository status                            | `git status`                                                                                               |
| Check repository status (short format)             | `git status (--short\|-s)`                                                                                 |
| View commit history                                | `git log [options]`<br>  `--color`<br>  `--graph`<br>  `--oneline`<br> `-1` : show only the latest commit  |
| View file changes                                  | `git diff`<br>    `--staged`/`—-cached`                                                                    |
| View commit summaries for current directory        | `git log <directory>`                                                                                      |

#### Handle the Staging Area `git add / restore / mv / rm`

> [!tip] Globbing / Wildcard `*`
> Wildcards like `*` can be used. `*.iml` matches all files ending with `.iml` (see file selection with globbing patterns).

> [!note] Staging Area / Index
> To save a version of files, you first add them to the staging area. Once staged, you can permanently record them with `git commit`.

| Stage files                                 | `git add <file1> <file2> …`             |
| ------------------------------------------- | --------------------------------------- |
| Untrack files from Git                      | `git rm --cached`                       |
| Move or rename files                        | `git mv`                                |
| Restore files to a previous version         | `git restore <files>`                   |
| Restore files at merge state                | `git restore --merge`                   |
| Unstage files                               | `git restore --staged <files>`          |
| Restore files using specific branch version | `git restore (--ours\|--theirs) <file>` |

#### Handle Versions `git commit / reset`

| Commit changes                               | `git commit`                                               |
| -------------------------------------------- | ---------------------------------------------------------- |
| Commit changes with a message                | `git commit -m "<message>"`                                |
| Amend commit message                         | `git commit --amend -m "Your new commit message"`          |
| Add a forgotten file to the last commit      | `git add <missingFile>;`<br>`git commit --amend --no-edit` |
| List commits                                 | `git log`                                                  |
| Hard reset to commit (discards file changes) | `git reset --hard <commit_id>`                             |
| Mixed reset (keeps file changes unstaged)    | `git reset --mixed <commit_id>`                            |
| Soft reset (keeps file changes staged)       | `git reset --soft <commit_id>`                             |
| Revert a commit by creating a new commit     | `git revert`                                               |

#### Handle a Remote Repository `git remote / clone / push / pull`

> [!note] 
> A **remote repository** is a hosted version of the local repository, located on the internet or a local network. It centralizes team collaboration on platforms like GitHub or GitLab.

| Link local repository to a remote repository                                            | `git remote add <repoName> <repoUrl>`       |
| --------------------------------------------------------------------------------------- | ------------------------------------------- |
| Upload commits to remote repository                                                     | `git push <repoName> [branch]`              |
| Clone a repository for the first time                                                   | `git clone <repoUrl>`                       |
| Clone a specific branch of a remote repo                                                | `git clone --branch <branchName> <repoUrl>` |
| Download without updating working tree                                                  | `git fetch`                                 |
| Update local repository with remote changes (equivalent to `git fetch` and `git merge`) | `git pull <repoName> [branch]`              |

#### Handle Branches `git branch / switch`

> [!note] 
> The default branch name on GitHub is `main` (formerly `master`). This can be changed in your Git `config`.

A branch is simply a pointer to a commit.
![branch](/blog/git/branch.png)
    
> [!tip] Other Commit Pointers
> `HEAD` points to the current commit,
> `HEAD^` refers to the parent commit,
> `HEAD~2` refers to two commits back,
> `HEAD~3` refers to three commits back,
> etc.

| List branches                                 | `git branch [--list]`                                  |
| --------------------------------------------- | ------------------------------------------------------ |
| Create a branch                               | `git branch <branch>`                                  |
| Rename a branch                               | `git branch --move <oldName> <newName>`                |
| Delete a merged branch                        | `git branch --delete <branch>`                         |
| Force delete an unmerged branch               | `git branch -D <branch>`<br>`[-D := --delete --force]` |
| Switch branches (overwrites uncommitted code) | `git switch <branch>`                                  |
| Switch branches with auto-stash               | `git switch --merge <branch>`                          |
| Merge branches (once checked out)             | `git merge <targetBranch>`                             |

#### Stash Temporary Changes `git stash`

> [!note] 
> Every time you run `git stash`, your uncommitted modifications are pushed onto a stack. Running `pop` removes and applies the top item from the stack.
    
- Stash changes: `git stash`
- List stashed changes: `git stash --list`
- Stack new changes: `git stash`
- Stash changes including untracked files: `git stash save -u`
##### Restoring Stashed Changes
- Apply and remove from stash: `git stash pop`
- Apply changes and keep in stash: `git stash apply` (requires `git stash drop` to clean up afterwards)
- Show stash contents summary: `git stash show`
- Show detailed stash diff: `git stash show -p`
- Clear all stashed entries: `git stash clear`

#### Rebasing `git rebase`

| Rebase a branch onto another branch                                                               | `git rebase <targetBranch>`                                             |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Edit, reorder, or combine commits interactively                                                   | Example for the last 3 commits:<br>`git rebase -i HEAD~3`               |

#### Move HEAD `git checkout`

`git checkout` has two main modes:
- Switch branches: `git checkout <branch>` 
- Restore a specific version of a file: `git checkout <commit> <filename>` or `git checkout <filename>` 

#### Configuration `git config`

The configuration file can be stored in three different locations. Each level overrides values in the previous level:

- `--system` option: **System** configuration file at `/etc/gitconfig` or `C:\ProgramData\Git\config` on Windows:

    Applies to all users on the system and all their repositories. Requires administrative or superuser privileges.
    
    This config file can only be modified with `git config -f <file>` as admin.
    
- `--global` option: **User** configuration file at `~/.gitconfig` or `~/.config/git/config`:

    Affects all repositories for the current user.
    
- `--local` option (Default): **Repository** configuration file at `.git/config`:

    Applies only to the specific repository.


| Show all settings across all levels | `git config --list --show-origin`                                                                                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Set user identity                  | `git config --global user.name "John Doe"`<br>`git config --global user.email johndoe@example.com`                                                                          |
| Set default editor                 | `git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"`<br>`git config --global core.editor "code --wait"` |
| Set default branch name            | `git config --global init.defaultBranch main`                                                                                                                               |


#### Ignoring Files `.gitignore`

The rules for `.gitignore` patterns are:
- Blank lines or lines starting with `#` are ignored.
- Standard glob patterns apply recursively throughout the entire working tree.
- Start patterns with a forward slash (`/`) to avoid recursive matching.
- End patterns with a forward slash (`/`) to specify a directory.
- Negate a pattern by starting it with an exclamation point (`!`).


#### Submodules

##### Config

| Always show submodules in `git status` | `git config --global status.submoduleSummary true` |
| --- | --- |
| Always show sub-commits in `git diff` of submodules | `git config --global diff.submodule log` |
| Fetch only initialized submodules | `git config --global fetch.recurseSubmodules on-demand` |

##### Register/Deregister
    
| Register a sub-repository as a submodule (in `.gitmodules`) | `git submodule add <child-repo> <destination-subfolder>` |
| --- | --- |
| Copy `.gitmodules` entries to `.git/config` | `git submodule init` |
| Deregister a submodule and convert to standard repository | `git submodule deinit <plugin>` |
| Delete a sub-repository | `git rm -rf <plugin>` |

##### Clone
        
| Clone/initialize configured submodule repository | `git submodule update` |
| --- | --- |
| Clone parent repository and all submodules | `git clone --recurse-submodules <url>` |

##### Fetch and Pull

| Fetch main repo and submodules                          | `git fetch`                                                     |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| Pull main repo and all submodules                       | `git pull --recurse-submodules`                                 |
| Pull main repo and checkout pinned submodule commits    | `git pull`<br>OR<br>`git submodule update [--init --recursive]` |
| Pull and rebase a specific submodule                    | `git submodule update --remote --rebase -- <plugin>`            |

##### Push

| Push main repository and submodules | `git push --recurse-submodules=on-demand` |
| ----------------------------------- | ----------------------------------------- |
