---
title: "Git Cheatsheet"
description: "A quick overview of Git"
pubDate: "2025-11-08"
heroImage: '../../assets/blog/logo_git.png'
heroSize: small
foldHeadings: true
---
> [!note] Qu'est-ce que Git ?
> Git est un **logiciel de gestion de versions** (**VCS** *version control system)* qui permet de conserver un historique des versions de tous les fichiers.


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


#### Interfaces de Git

Git est utilisé en **lignes de commande** *(via un terminal de commande ou CLI: Command Line Interface).* D’autres interfaces sont disponibles comme Git-gui, Visual Studio Code avec l’extension GitLens, GitKraken, intégré dans un IDE…


#### Qu’est-ce qu’un commit ?

> [!note] A **commit** is a complete snapshot of the project files
> 1. A pointer to the snapshot files
> 2. Metadata: id, who, when, commit message
> 3. A pointer to the parent commit

The first commit has no parent
![Git/image.png](/blog/git/linked.png)


A commit with two parents makes branches
![Branches](/blog/git/two_parents.png)

You can jump to any commit in history

![Move HEAD](/blog/git/head.png)

Les commits ont des checksums SHA, qui servent d'id.
![Commit + Metadata + Parent = Hash](/blog/git/hash.png)


#### Historique local `.git`

![DAG](/blog/git/dag_graph.png)

A family tree of snapshots: a Directed Acyclic Graph
L’historique est conservé dans le dossier du projet (`.git/`) qui constitue alors un **dépôt Git.** git est décentralisé, chaque **dépôt** contient toutes les modifications depuis le début.
Nearly Every Operation Is Local
Git Generally Only Adds Data

#### Gérer un dépôt local `git init / status / log / diff`

> [!note] 
> Un **dépôt local** est l’endroit où l’on stocke, sur sa machine, une copie d’un projet, ses différentes versions et l’historique des modifications.

| Créer un dépôt Git                                  | `git init`                                                                                                 |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Voir l’état du dépôt                                | `git status`                                                                                               |
| Voir l'état du dépôt (court)                        | `git status (--short\|-s)`                                                                                 |
| Voir l'historique des versions                      | `git log [options]`<br>  `--color`<br>  `--graph`<br>  `--oneline`<br> `-1` :  seulement le dernier commit |
| Voir les modifications                              | `git diff`<br>    `--staged`/`—-cached`                                                                    |
| Afficher les résumés des commits du dossier courant | `git log <dossier>`                                                                                        |

#### Gérer l'index `git add / restore / mv / rm`

> [!tip] Globbish, Wildcard `*`
> La wildcard `*` peut être utilisé. `*.iml` désigne tous les fichiers qui finissent en `.iml` (cf. sélectionner des fichiers avec le globbish)

> [!note] Staging area / Index
> Pour enregistrer une version de nos fichiers, on les sélectionne d'abord en les indexant. Une fois un fichier indexé (staged), on peut les sauvegarder avec `git commit`

| Travailler avec l'index                      | Cmds                            |
| -------------------------------------------- | ------------------------------- |
| Indexer des fichiers                         | `git add <file1> <file2> …`     |
| Supprimer de l'index                         | `git rm --cached`               |
| Déplacer des fichiers                        | `git mv`                        |
| Restaurer un fichier à la version antérieure | `git restore <file>`            |
| Déselectionner des fichiers                  | `git restore --staged`          |
| Restaurer                                    | `git restore --merge`           |
| Restaurer                                    | `git restore --ours/--theirs .` |

#### Gérer une version `git commit / reset`

| Travailler avec les versions                      | Cmds                                                           |
| ------------------------------------------------- | -------------------------------------------------------------- |
| Enregistrer une version                           | `git commit`                                                   |
| Enregistrer une version avec un message           | `git commit -m "<message>"`                                    |
| Modifier le message                               | `git commit --amend -m "Votre nouveau message de commit"`      |
| Ajouter un fichier manquant dans un commit        | `git add <fichierManquant>;`<br>`git commit --amend --no-edit` |
| Lister les commit                                 | `git log`                                                      |
| Reset total au commit voulu (fichiers écrasés)    | `git reset --hard <commit_id>`                                 |
| Reset le commit et l'index (fichiers inchangés)   | `git reset --mixed <commit_id>`                                |
| Reset le commit <br>(index et fichiers inchangés) | `git reset --soft <commit_id>`                                 |
| Annuler un commit en créant un nouveau commit     | `git revert`                                                   |

#### Gérer un dépôt distant `git remote / clone / push / pull`

> [!note] 
> Un **dépôt distant** est une version dématérialisée du dépôt local, que ce soit sur Internet ou sur un réseau. Il permet de centraliser le travail des développeurs dans un projet collectif comme un *cloud* cf. **les plateformes GitHub, GitLab…**

> [!tip] `git pull`  équivaut à `git fetch` puis `git merge`

| Relier le dépôt local au dépôt distant       | `git remote add <nomDépôt> <urlDépôt>` |
| -------------------------------------------- | -------------------------------------- |
| Téléverser des commits vers le dépôt distant | `git push <nomDépôt> [branch]`         |
| Télécharger pour la 1ère fois un dépôt       | `git clone <urlDépôt>`                 |
| Télécharger une branche d’un dépôt distant:  | `git clone -b <branchname> <urlDépôt>` |
| Télécharger le dépôt sans mettre à jour      | `git fetch`                            |
| Mettre à jour un dépôt local                 | `git pull <nomDépôt> [branch]`         |

#### Gérer une branche `git branch / switch`

> [!note] 
> La branche par défaut est `main` sur github (anciennement `master`). C’est configurable dans les `config`.

Un pointeur sur un commit
![branch](/blog/git/branch.png)
    
Autres pointeurs sur commit
	`HEAD`  pointe le commit actuel,
	`HEAD^`  désigne le dernier commit
	`HEAD~2` désigne l’avant dernier commit
	`HEAD~3` la troisième,
	etc.

| Lister les branches                                | `git branch [--list]`                                 |
| -------------------------------------------------- | ----------------------------------------------------- |
| Créer une branche                                  | `git branch <branch>`                                 |
| Renommer la branche                                | `git branch -m <ancienNom> <nouveauNom>  [ou --move]` |
| Supprimer une branche vide                         | `git branch -d <branch> [-d ou --delete]`             |
| Supprimer une branche et son contenu               | `git branch -D <branch> [-D ou --delete --force]`     |
| Basculer de branche (supprime le code non commité) | `git switch <branch>`                                 |
| Basculer de branche (autostash)                    | `git switch --merge <branch>`                         |
| Fusionner des branches (une fois checkout)         | `git merge <targetBranch>`                            |

#### Enregistrer les modifications temporaires dans la remise `git stash`

> [!note] 
> À chaque fois que vous appelez `git stash`, les modifications sont mises de côté dans une pile, au dessus des autres modifications remisées. 
> À chaque fois que vous appelez `pop`, on dépile.
    
- Remiser les modifications: `git stash`
- Lister les modifications: `git stash --list`
- Cumuler les modifications: `git stash` encore
- Remiser les modifications et les untracked: `git stash save -u`
##### Reprendre les modifications remisées
- Soit en sortant les fichiers du "stash" : `git stash pop`
- Soit en récupérant et laissant les fichiers dans le "stash" : `git stash apply` (nécessite un `git stash drop` pour nettoyer le stash ensuite)    
- Afficher le contenu de la remise : `git stash show`    
- Pour avoir le détail (afficher le diff) `git stash show -p`
- Supprimer les remises : `git stash clear`*

#### Recombinaison `git rebase`

| Rebase une branche sur une autre                                                                          | `git rebase <brancheCible>`                                            |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Changer les messages des commit, leur ordre ou leur nombre, <br>on peut utiliser le mode interactif (-i). | Par exemple sur les trois derniers commits :<br>`git rebase -i HEAD~3` |

#### Move HEAD `git checkout`

`git checkout` has two main modes:
- Switch branches, with `git checkout <branch>` 
- Restore a different version of a file, for example with `git checkout <commit> <filename>` or `git checkout <filename>` 

#### Configuration `git config`

The configuration file can be stored in three different places. Each level overrides values in the previous level.

- System configuration file at `[path]/etc/gitconfig` with  `--system` option:
    
    Apply to all user on the system and all their repositories. Needs administrative or superuser privilege to make changes.
    
    `C:\ProgramData\Git\config` on Windows. This config file can only be changed by `git config -f <file>` as an admin.
    
- User configuration file at `~/.gitconfig` or `~/.config/git/config` with `--global` option:
    
    This affects all of the repositories you work with on your system.
    
- (Default) Repository configuration file at `.git/config` with `--local` option :
    
    Unsurprisingly, you need to be located somewhere in a Git repository for this option to work properly.
    

| Show all settings on all level | `git config --list --show-origin`                                                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Set identity                   | `git config --global user.name "John Doe"`<br>`git config --global user.email johndoe@example.com`                                                                          |
| Set editor                     | `git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"`<br>`git config --global core.editor "code --wait"` |
| Set default branch name        | `git config --global init.defaultBranch main`                                                                                                                               |


#### Ignorer `.gitignore`

The rules for the patterns you can put in the .gitignore file are as follows:
- Blank lines or lines starting with # are ignored.
- Standard glob patterns work, and will be applied recursively throughout the entire working tree.
- You can start patterns with a forward slash (/) to avoid recursivity.
- You can end patterns with a forward slash (/) to specify a directory.
- You can negate a pattern by starting it with an exclamation point (!).


#### Submodule

##### Config

| Always show submodules in `git status` | `git config --global status.submoduleSummary true` |
| --- | --- |
| Always show sub-commits when `git diff` of submodules | `git config --global diff.submodule log` |
| Fetch only init submodules | `git config --global fetch.recurseSubmodules on-demand` |

##### Register/Deregister
    
| Register a child repo as submodule (in`.gitmodules`) | `git submodule add <child-repo> <destination-subfolder>` |
| --- | --- |
| Add `.gitmodules` to `.git/config`  | `git submodule init` |
| Deregister submodule and turn into classic repo | `git submodule deinit <plugin>` |
| Delete sub repo | `git rm -rf <plugin>` |

##### Clone
        
| Clone the submodule repository | `git submodule update` |
| --- | --- |
| Clone repo and all submodules | `git clone --recurse-submodules <url>` |

##### Fetch and pull

| Fetch repo and submodules                               | `git fetch`                                                     |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| Pull main repo and all submodules                       | `git pull --recurse-submodules`                                 |
| Pull main repo and checkout to submodule frozen commits | `git pull`<br>OR<br>`git submodule update [--init --recursive]` |
| Pull rebase for a specific submodule                    | `git submodule update --remote --rebase -- <plugin>`            |

##### Push

| **Push** | `git push --recurse-submodules=on-demand` |
| --- | --- |
