---
title: Markdown Cheatsheet
description: Match Markdown to HTML tags
pubDate: 2026-03-07
heroImage: ../../assets/blog/logo_markdown.svg
heroSize: small

---
## Inline text

|                                         | Markdown                     | HTML tags                                        | LaTeX                               |
| --------------------------------------- | ---------------------------- | ------------------------------------------------ | ----------------------------------- |
| Links<br>                               | `[text](url)`                | `<a href="...">...</a>`                          | `\href{...url}{...text}`            |
| Paragraphs                              | `...␣␣\n...`<br>`...\n\n...` | `<p>...`<br>`<p>...`                             | `...\\...`<br>`...\newline...`      |
| *italic*                                | `*...*`                      | `<em>...`<br>`<i>...`                            | `\textit{...}`<br>`\emph{...}`      |
| **bold**                                | `**...**`                    | `<strong>...`<br>`<b>...`                        | `\textbf{...}`                      |
| ***bold & italic***                     | `***...***`                  | `<strong><em>...`                                | `\textbf{\textit{...}}`             |
| ~~strikthrough~~                        | `~~...~~` (GFM)              | `<s>...`                                         | `\sout (ulem pkg)`                  |
| `code`                                  | `` `...` ``                  | `<code>...`                                      | `\texttt{...}`                      |
| $x \in \mathbb R$                       | `$...$` (GitLab)             | Katex, MathJax or `<math>`                       |                                     |
| ==Highlight==                           | `==...==` (Obsidian)         | `<mark>...`<br>`[style="background-color: red"]` | `\highlightx{...} (ulem pkg)`       |
| <u>underline</u>                        |                              | `<u>...`                                         | `\underline{...}`                   |
| <sup>superscript</sup>                  | `^...^`                      | `<sup>`                                          |                                     |
| <sub>subscript</sub>                    | `~...~`                      | `<sub>`                                          |                                     |
| <span style="color: red">colored</span> |                              |                                                  | `\textcolor{red}{...} (xcolor pkg)` |
| 😄                                     | `:joy:` (GFM)                |                                                  |                                     |


## Text content

|                    | Markdown                                                                                                    | HTML tags                                                                      | LaTeX                                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headings           | `# Heading1`<br>`## Heading2`<br>`### Heading3`<br>`#### Heading4`<br>`##### Heading5`<br>`###### Heading6` | `<h1>...`<br>`<h2>...`<br>`<h3>...`<br>`<h4>...`<br>`<h5>...`<br>`<h6>...`<br> | `\part{part}`<br>`\chapter{chapter}`<br>`\section{section}`<br>`\subsection{subsection}`<br>`\subsubsection{subsubsection}`<br>`\paragraph{paragraph}`<br>`\subparagraph{subparagraph}` |
| Line Feed          | `␣␣` or `\n`                                                                                                | `<br>`                                                                         | `\\` or `\newline`                                                                                                                                                                      |
| <hr>               | `***`<br>`---`<br>`___` (underscores)                                                                       | `<hr>`                                                                         | `\hrule`                                                                                                                                                                                |
| Unordered Lists    | `- a`<br>`* b`                                                                                              | `<ul><li>...`                                                                  | `\begin{itemize}`<br>`\item ...`                                                                                                                                                        |
| Ordered Lists      | `1. a`<br>`1. b`                                                                                            | `<ol><li>...`                                                                  | `\begin{enumerate}`<br>`\item ...`                                                                                                                                                      |
| Task Lists         | `- [ ] text`<br>`- [x] text`                                                                                | `<input type="checkbox" checked /><label>...`                                  |                                                                                                                                                                                         |
| Blockquote         | `> Blockquote`                                                                                              | `<blockquote><p>...`                                                           |                                                                                                                                                                                         |
| Callouts           | `> [!info] title`<br>`> content`                                                                            |                                                                                |                                                                                                                                                                                         |
| Fenced Code Blocks | `` ```lang ... ``` ``                                                                                       | `<pre class="..."><code>...`                                                   | `\begin{minted}{python}`                                                                                                                                                                | |                                                                                |                                                                                                                                                                                         
| Equation Block     | `$$...$$`                                                                                                   | `<math>`                                                                       | `$$...$$`<br>`\[...\]`                                                                                                                                                                  |
| Footnotes          | `[^1]`                                                                                                      |                                                                                |                                                                                                                                                                                         |

## Interactive elements
|          | Markdown | HTML tags                        |
| -------- | -------- | -------------------------------- |
| Disclose |          | `<details><summary>...`<br>`...` |
| Popover  |          | Popover API                      |
| Forms    |          | `<form>` Form API                |
| Badge    |`![](https://img.shields.io/...)`| `<img src="https://img.shields.io" />`|

## Image and multimedia
|         | Markdown                                                              | HTML tags                            | LaTeX                   |
| ------- | --------------------------------------------------------------------- | ------------------------------------ | ----------------------- |
| Images  | `![alt](src)`                                                         | `<img src="..." alt="..."/>`         | `\includegraphics{...}` |
| Videos  | `![](src)`                                                            | `<video><source src="..." />`        |                         |
| Audio   |                                                                       | `<audio controls src="..."></audio>` |                         |
| Figures |                                                                       | `<figure>{media}<figcaption>...`     |                         |
| Files   | `![[file link]]` (Obsidian)<br>`::include{file=chapter1.md}` (GitLab) | `<iframe>`                           |                         |

## Simple Tables
| Example                                                                                                                       | Markdown                                                       | HTML tags                                                     | LaTeX                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| <table><thead><tr><th>foo</th><th>bar</th></tr></thead><tbody><tr><td>baz</td><td align="right">bim</td></tr></tbody></table> | `\| foo \| bar \|`<br>`\| --- \| --: \|`<br>`\| baz \| bim \|` | `<table>`<br>  `<thead><tr><th>...`<br>  `<tbody><tr><td>...` | `\begin{tabular}{c r}`<br>`foo & bar \\`<br>`\hline`<br>`baz & bim`<br>`\end{tabular}` |

## Demarcating edits
|                      | Markdown             | HTML tags |
| -------------------- | -------------------- | --------- |
| <ins>Insertion</ins> | `{++...++}` (GitLab) | `<ins>`   |
| Deletion             | `{--...--}` (GitLab) | `<del>`   |