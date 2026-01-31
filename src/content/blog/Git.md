---
title: "Git Cheatsheet"
description: "A quick overview of Git"
pubDate: "08 Nov 2025"
heroImage: '../../assets/blog/logo_git.png'
heroSize: small
---

# Introduction

> **Git** est un **logiciel de gestion de versions** (**VCS** _version control system)_ qui permet de conserver un historique des modifications et des versions de tous leurs fichiers.


> [!📙] This is a callout  
> **Git** est utilisé en **lignes de commande** _(via un terminal de commande ou CLI: Command Line Interface)._ D’autres interfaces sont disponibles comme Git-gui, Visual Studio Code avec l’extension GitLens, GitKraken, intégré dans un IDE…

L’historique est conservé dans le dossier du projet (`.git/`) qui constitue alors un **dépôt Git.** Il est essentiel pour travailler en équipe ou collaborer à un projet open source. **Git** est décentralisé, chaque **dépôt** contient toutes les modifications depuis le début.


<details>
  <summary>Toggle me!</summary>

  This is the detailed content

  ```js
  console.log("Markdown features including the code block are available");
  ```

  You can use Markdown here including **bold** and _italic_ text, and [inline link](https://docusaurus.io)
  <details>
    <summary>Nested toggle! Some surprise inside...</summary>

    😲😲😲😲😲
  </details>
</details>


[What is Git? Explained in 2 Minutes!](https://youtu.be/2ReR1YJrNOM?si=RhKYXfO7BEsIM-kA)

[Git Command Cheat Sheet & Quick Reference](https://quickref.me/git)

[GitHub Git Cheat Sheet](https://training.github.com/downloads/github-git-cheat-sheet/)

[How to Write a Git Commit Message](https://cbea.ms/git-commit/)

## Gérer un dépôt local `git init / status / log`

> [!Info]  
> Un **dépôt local** est l’endroit où l’on stocke, sur sa machine, une copie d’un projet, ses différentes versions et l’historique des modifications.

-   Créer un dépôt Git : `git init`
-   Voir l’état du dépôt : `git status`
-   Voir les versions du dépôt : `git log`
    `--color` : ajouter des couleurs
    `--graph` : voir l’historique des branches
    `--oneline` : voir l’historique en version réduite
    Afficher le résumé du dernier commit : `-1`
    Afficher les résumés des commits du dossier courant : `git log .`

## Gérer un dépôt distant `git remote / clone / push / pull`

> [!📙]  
> Un **dépôt distant** est une version dématérialisée du dépôt local, que ce soit sur Internet ou sur un réseau. Il permet de centraliser le travail des développeurs dans un projet collectif comme un _cloud_ cf. **les plateformes GitHub, GitLab…**

> [!💡] URL autorisés:  
> - `ssh://[user@]host.xz[:port]/path/to/repo.git/`
> - `git://host.xz[:port]/path/to/repo.git/`
> - `http[s]://host.xz[:port]/path/to/repo.git/`
> - `ftp[s]://host.xz[:port]/path/to/repo.git/`


-   Relier le dépôt local au dépôt distant : `git remote add <nomDépôt> <urlDépôt>`
-   Téléverser des commits vers le dépôt distant : `git push <nomDépôt> [branch]`
-   Télécharger pour la 1ère fois un dépôt `git clone <urlDépôt>`
-   Télécharger une branche d’un dépôt distant: `git clone -b <branchname> <urlDépôt>`
-   Mettre à jour un dépôt local `git pull <nomDépôt> [branch]`
-   Mettre à jour sans changer le dépôt : `git fetch`

> [!📙]  
> `git pull` équivaut à `git fetch` puis `git merge`

## Gérer une branche `git branch`

> [!📙]    
> La branche par défaut est `main` sur github (anciennement `master`). C’est configurable dans les `config`.

-   Lister les branches : `git branch`
-   Créer une branche : `git branch <branch>`
-   Renommer la branche : `git branch -m <ancienNom> <nouveauNom>  [ou --move]`
-   Supprimer une branche vide : `git branch -d <branch> [-d ou --delete]`
-   Supprimer une branche et son contenu :
    `git branch -D <branch> [-D ou --delete --force]`
-   Basculer de branche (supprime le code non commité) : `git checkout <branch>`
-   Fusionner des branches (une fois checkout) : `git merge <targetBranch>`

## Gérer une version `git commit`

> [!💡]  
> La wildcard `*` peut être utilisé. `*.iml` désigne tous les fichiers qui finissent en `.iml`


-   Indexer des fichiers : `git add <fichier1> <fichier2> …`
-   Sauvegarder une version : `git commit -m "message"`
-   Changer le message : `git commit --amend -m "Votre nouveau message de commit"`
-   Ajouter un fichier manquant dans un commit :
    `git add <fichierManquant>`
    `git commit --amend --no-edit`
-   Lister les versions : `git log commit`
-   Revenir à une version : `git reset --hard 8_premiers_chiffres_de_l'id_de_la_version`
    `HEAD^` désigne la dernière version, `HEAD~2` désigne l’avant dernière version, `HEAD~3` la troisième, etc.

## Remiser les modifications temporaires `git stash`

-   Remiser les modifications: `git stash`
-   Cumuler les modifications

    > [!📙]  
    > À chaque fois que vous appellez `git stash`, les modifications sont mises de côté dans une pile, au dessus des autres modifications remisées.
    > À chaque fois que vous appelez `pop`, on dépile.


-   Remiser les modifications et les créations: `git stash save -u`
-   **Reprendre les modifications remisées**
    -   Soit en sortant les fichiers du "stash" : `git stash pop`
    -   Soit en récupérant et laissant les fichiers dans le "stash" : `git stash apply` (nécessite un `git stash drop` pour nettoyer le stash ensuite)
-   Afficher le contenu de la remise : `git stash show`
    Pour avoir le détail (afficher le diff) `git stash show -p`
-   Supprimer les remises : `git stash clear`

## Recombinaison `git rebase`

-   Rebase une branche sur une autre
-   Changer les messages des soumissions, leur ordre ou leur nombre,
    on peut utiliser le mode interactif (-i). Par exemple sur les trois
    derniers commits :
        `git rebase -i HEAD~3`

## Reset `git reset`

> [!⚠️] Note  
> `git revert` annule les changements en créant un nouveau commit.

> [!⚠️]  
> `git reset`  annule les changements sans créer un nouveau commit. Il existe plusieurs niveaux de reset:
> -   `--soft` : ne touche pas à l'index ni au répertoire de travail. Les fichiers en reset retournent juste de la liste des commités à celle à commiter.
> -   `--mixed` : celui par défaut, mélange des deux précédents. Il laisse les fichiers du répertoire de travail, mais annule l'index.
> -   `--hard` : efface l'index et le répertoire de travail. Cette option équivaut à un reset + clean.
