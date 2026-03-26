---
title: "Obsidian Markdown Cheatsheet"
description: "Match Markdown to HTML tags"
pubDate: "2026-03-07"
heroImage: '../../assets/blog/logo_markdown.svg'
heroSize: small
---
## Inline text

|                                         | Markdown                                                                                     | Alternative    | HTML tags                                        | LaTeX                               |
| --------------------------------------- | -------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------ | ----------------------------------- |
| Links<br>                               | `[[url\|text]]`<br><br>`[text](url)`<br><br>`http://...`<br>`<http://...>`<br><br>`**@**.**` |                | `<a href="...">...</a>`                          | `\href{...url}{...text}`            |
| Paragraphs                              | `...␣␣\n...`<br>`...\n\n...`                                                                 |                | `<p>...`<br>`<p>...`                             | `...\\...`<br>`...\newline...`      |
| *italic*                                | `*...*`<br><br>`_..._`                                                                       | No `_..._`     | `<em>...`<br>`<i>...`                            | `\textit{...}`<br>`\emph{...}`      |
| **bold**                                | `**...**`<br><br>`__...__`                                                                   | No `__...__`   | `<strong>...`<br>`<b>`                           | `\textbf{...}`                      |
| ***bold & italic***                     | `***...***`<br><br>`___...___`                                                               | No `___...___` | `<strong><em>...`                                | `\textbf{\textit{...}}`             |
| ~~strikthrough~~                        | `~~...~~`                                                                                    |                | `<s>...`                                         | `\sout (ulem pkg)`                  |
| `code`                                  | `` `...` ``                                                                                  |                | `<code>...`                                      | `\texttt{...}`                      |
| $x \in \mathbb R$                       | `$...$`                                                                                      |                | Katex, MathJax or `<math>`                       |                                     |
| ==Highlight==                           | `==...==`<br><br>`=={red}...==`                                                              |                | `<mark>...`<br>`[style="background-color: red"]` | `\highlightx{...} (ulem pkg)`       |
| <u>underline</u>                        |                                                                                              | `__...__`      | `<u>...`                                         | `\underline{...}`                   |
| <sup>superscript</sup>                  |                                                                                              | `^{...}`       | `<sup>`                                          |                                     |
| <sub>subscript</sub>                    |                                                                                              | `_{...}`       | `<sub>`                                          |                                     |
| <span style="color: red">colored</span> |                                                                                              | `#red{...} `   |                                                  | `\textcolor{red}{...} (xcolor pkg)` |
| 😄                                      |                                                                                              | `:joy:`        |                                                  |                                     |


## Text content

|                    | Obsidian Markdown                                                                                           | Alternative           | HTML tags                                                                      | LaTeX                                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headings           | `# Heading1`<br>`## Heading2`<br>`### Heading3`<br>`#### Heading4`<br>`##### Heading5`<br>`###### Heading6` |                       | `<h1>...`<br>`<h2>...`<br>`<h3>...`<br>`<h4>...`<br>`<h5>...`<br>`<h6>...`<br> | `\part{part}`<br>`\chapter{chapter}`<br>`\section{section}`<br>`\subsection{subsection}`<br>`\subsubsection{subsubsection}`<br>`\paragraph{paragraph}`<br>`\subparagraph{subparagraph}` |
| Line Feed          | `␣␣` or `\n`                                                                                                |                       | `<br>`                                                                         | `\\` or `\newline`                                                                                                                                                                      |
| <hr>               | `***`<br>`---`<br>`___` (underscores)                                                                       | No `***`              | `<hr>`                                                                         | `\hrule`                                                                                                                                                                                |
| Unordered Lists    | `- a`<br>`* b`                                                                                              |                       | `<ul><li>...`                                                                  | `\begin{itemize}`<br>`\item ...`                                                                                                                                                        |
| Ordered Lists      | `1. a`<br>`1. b`                                                                                            |                       | `<ol><li>...`                                                                  | `\begin{enumerate}`<br>`\item ...`                                                                                                                                                      |
| Task Lists         | `- [ ] text`<br>`- [x] text`                                                                                |                       | `<input type="checkbox" checked /><label>...`                                  |                                                                                                                                                                                         |
| Blockquote         | `> Blockquote`                                                                                              |                       | `<blockquote><p>...`                                                           |                                                                                                                                                                                         |
| Callouts           | `> [!info] title`<br>`> content`                                                                            | `> [!:custom emoji:]` |                                                                                |                                                                                                                                                                                         |
| Fenced Code Blocks | `` ```lang ``<br>`` ~~~lang ``<br>`\t...`                                                                   | No indent             | `<pre class="..."><code>...`                                                   | `\begin{minted}{python}`                                                                                                                                                                |
| Equation Block     | `$$...$$`                                                                                                   |                       | `<math>`                                                                       | `$$...$$`<br>`\[...\]`                                                                                                                                                                  |
| Footnotes          | `[^1]`                                                                                                      |                       |                                                                                |                                                                                                                                                                                         |

## Interactive elements
|          | Obsidian Markdown | Alternative                            | HTML tags                        |
| -------- | ----------------- | -------------------------------------- | -------------------------------- |
| Disclose |                   | `:::summary`<br>`details`<br>`:::`<br> | `<details><summary>...`<br>`...` |
| Popover  |                   |                                        | Popover API                      |
| Forms    |                   |                                        | `<form>` Form API                |

## Image and multimedia
|         | Obsidian Markdown | HTML tags                            | LaTeX                   |
| ------- | ----------------- | ------------------------------------ | ----------------------- |
| Images  | `![alt](src)`     | `<img src="..." alt="..."/>`         | `\includegraphics{...}` |
| Videos  | `![](src)`        | `<video><source src="..." />`        |                         |
| Audio   |                   | `<audio controls src="..."></audio>` |                         |
| Figures |                   | `<figure>{media}<figcaption>...`     |                         |
| Files   | `![[file link]]`  | `<iframe>`                           |                         |

## Simple Tables
| Example                                                                                                                       | Obsidian Markdown                                              | HTML tags                                                     | LaTeX                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| <table><thead><tr><th>foo</th><th>bar</th></tr></thead><tbody><tr><td>baz</td><td align="right">bim</td></tr></tbody></table> | `\| foo \| bar \|`<br>`\| --- \| --: \|`<br>`\| baz \| bim \|` | `<table>`<br>  `<thead><tr><th>...`<br>  `<tbody><tr><td>...` | `\begin{tabular}{c r}`<br>`foo & bar \\`<br>`\hline`<br>`baz & bim`<br>`\end{tabular}` |

## Demarcating edits
|                                | Obsidian Markdown                                                                                           | Alternative                            | HTML tags                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------ |
| <ins>Insertion</ins>           |                                                                                                             | `{++...++}`                            | `<ins>`                                                                        |
| Deletion                       |                                                                                                             | `{--...--}`                            | `<del>`                                                                        |