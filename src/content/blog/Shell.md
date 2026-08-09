---
title: Bash vs Batch/CMD vs PowerShell
description: "A quick cheatsheet of bash, PowerShell and Batch (cmd) "
pubDate: 2026-08-01
heroImage: ../../assets/blog/logo_bash.png
heroSize: small
---

## 0. Terminology
| Term              | Meaning                                                              | Example                                                                                |
| ----------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Directory         | Same thing as a "folder."                                            | `Documents`                                                                            |
| Current directory | The folder you're currently "in"                                     | `.`                                                                                    |
| Path              | The address of a file or folder                                      | `C:\Users\You\Documents\report.txt`                                                    |
| Root              | The very top of the path                                             | `C:\` or `/`                                                                           |
| Filename          | The file's name                                                      | `report`                                                                               |
| Extension         | The file's type                                                      | `.txt`                                                                                 |
| Absolute path     | Full path from the root — works from anywhere                        | `C:\Users\You\Documents\report.txt`                                                    |
| Relative path     | Path from where you currently are — shorter if you're already nearby | If your current directory is `C:\Users\You\`, you can just type `Documents\report.txt` |
| CLI               | Command-Line Interpreter                                             |                                                                                        |
| Shell             | An OS software UI, which launches and controls programs              | CLI, TUI, GUI                                                                          |
| Terminal          | A text input/output environment                                      |                                                                                        |
| Console           | A physical terminal                                                  |                                                                                        |


## 1. Navigation

|                                   | bash                                       | Batch/Cmd                   | PowerShell                                   |
| --------------------------------- | ------------------------------------------ | --------------------------- | -------------------------------------------- |
| Current directory (shorthand)     | >                                          | >                           | `.`                                          |
| Parent directory (shorthand)      | >                                          | >                           | `..`                                         |
| Home directory (shorthand)        | `~`                                        | `%USERPROFILE%`             | `~`                                          |
| Folder separator                  | `/`                                        | `\` (often accepts `/` too) | `\` or `/` (both work)                       |
| Folder/file name case sensitivity | Case-sensitive (`Documents` ≠ `documents`) | >                           | Case-insensitive (`Documents` = `documents`) |
| Change directory                  | `cd`                                       | `cd`                        | `cd` (`Set-Location`)                        |
| Print working directory           | `pwd`                                      | `cd` (no args)              | `pwd` (`Get-Location`)                       |
| List files                        | `ls`                                       | `dir`                       | `Get-ChildItem` (`ls`, `dir`)                |
| Clear screen                      | `clear`                                    | `cls`                       | `Clear-Host` (`cls`, `clear`)                |
| Exit shell                        | `exit`                                     | `exit`                      | `exit`                                       |


---

## 2. Edition

|                        | bash    | Batch/Cmd          | PowerShell                                     |
| ---------------------- | ------- | ------------------ | ---------------------------------------------- |
| Copy file              | `cp`    | `copy`             | `Copy-Item` (`cp`, `copy`)                     |
| Move/rename file       | `mv`    | `move` / `ren`     | `Move-Item` (`mv`, `move`)                     |
| Delete file            | `rm`    | `del` / `erase`    | `Remove-Item` (`rm`, `del`)                    |
| Make directory         | `mkdir` | `mkdir` / `md`     | `New-Item -ItemType Directory` (`mkdir`, `md`) |
| Remove directory       | `rmdir` | `rmdir` / `rd`     | `Remove-Item` (`rmdir`, `rd`)                  |
| View file contents     | `cat`   | `type`             | `Get-Content` (`cat`, `type`)                  |
| Find files             | `find`  | `dir /s` (limited) | `Get-ChildItem -Recurse`                       |
| Find text in files     | `grep`  | `findstr`          | `Select-String` (`sls)                         |
| Compare files          | `diff`  | `fc`               | `Compare-Object`                               |
| Wildcard (any chars)   | >       | >                  | `*`                                            |
| Wildcard (single char) | >       | >                  | `?`                                            |

---

## 3. Redirection & Piping

|                                     | bash        | Batch/Cmd | PowerShell                              |
| ----------------------------------- | ----------- | --------- | --------------------------------------- |
| Print text                          | >           | `echo`    | `echo` (`Write-Output`)                 |
| Redirect output (stdout, overwrite) | >           | >         | `>`                                     |
| Redirect output (stdout, append)    | >           | >         | `>>`                                    |
| Redirect errors (stderr)            | >           | >         | `2>`                                    |
| Redirect input (stdin)              | >           | >         | `<`                                     |
| Pipe                                | >           | `\|`      | `\|` (pipes **objects**, not just text) |
| Pipe passed item                    | >           | Text      | .NET objects                            |
| Null device (discard output)        | `/dev/null` | `NUL`     | `$null` or `NUL`                        |

---

## 4. Chaining

|                              | bash          | Batch/Cmd          | PowerShell                                 |
| ---------------------------- | ------------- | ------------------ | ------------------------------------------ |
| Chain regardless of result   | `;`           | `&`                | `;`                                        |
| Run next **only if success** | >             | `&&`               | `if ($?) { cmd2 }`<br>`&&` (**7.0+ only**) |
| Run next **only if failure** |               | `\|\|`             | `\|` (**7.0+ only**)                       |
| Success check basis          | exit code `0` | `%ERRORLEVEL%` `0` | `$?` (boolean, richer than exit code)      |


---

## 5. Environment

|                                | bash                                                                                                    | Batch/Cmd                                                                                                                | PowerShell                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Set variable                   | `VAR=value`                                                                                             | `set VAR=value`                                                                                                          | `$var = value`                                                                                         |
| Read variable                  | `$VAR` / `${VAR}`                                                                                       | `%VAR%`                                                                                                                  | `$env:VAR` (env) / `$var` (local)                                                                      |
| List all env vars              | `env` / `printenv`                                                                                      | `set`                                                                                                                    | `Get-ChildItem Env:` (`dir env:`)                                                                      |
| Export to child processes      | `export VAR=value`                                                                                      | `set VAR=value` (already global)                                                                                         | `$env:VAR = "value"`                                                                                   |
| Local/scoped variable          | `local var=value`                                                                                       | `setlocal` (block-level)                                                                                                 | automatic inside functions                                                                             |
| Delayed expansion (loop quirk) | *(not needed)*                                                                                          | `setlocal enabledelayedexpansion` + `!var!`                                                                              | _(not needed)_                                                                                         |
| Current username               | `$USER`                                                                                                 | `%USERNAME%`                                                                                                             | `$env:USERNAME`                                                                                        |
| Computer/hostname              | `$HOSTNAME`                                                                                             | `%COMPUTERNAME%`                                                                                                         | `$env:COMPUTERNAME`                                                                                    |
| Temp directory                 | `$TMPDIR` = `/tmp`                                                                                      | `%TEMP%` / `%TMP%` = `C:\Users\{user}\Appdata\Local\Temp`                                                                | `$env:TEMP`                                                                                            |
| Command discovery              | Checks `$PATH` only, not current folder <br><br>`./` to run from current directory (e.g. `./script.sh`) | Checks **current folder first**, then `%PATH%`                                                                           | Checks `$env:PATH`, not current folder<br><br>`./` to run from current directory (e.g. `.\script.ps1`) |
| Security                       | Safe — current folder isn't searched automatically                                                      | **Weak spot** — CMD checks the current folder first, so a maliciously named file dropped there could run unintentionally | Safe — current folder isn't searched automatically                                                     |
| Root Directory                 | `/`                                                                                                     | `%HOMEDRIVE%` = `C:\`                                                                                                    | <                                                                                                      |
| Home Directory                 | `/home`                                                                                                 | `C:\Users`                                                                                                                 | <                                                                                                      |
| User Directory                 | `~` = `/home/{user}`                                                                                    | `%HOMEPROFILE%` = `C:\Users\{user}`                                                                                      | `~` = `$env:HOMEPROFILE`                                                                               |
| System Configuration Directory | `/etc`                                                                                                  | C:\Windows\System32\config                                                                                               | <                                                                                                      |
| Global Program Directory       | `/usr/bin`, `/usr/sbin`                                                                                 | `%ProgramFiles%` = `C:\Program Files`<br>`%ProgramFiles(x86)%` = `C:\Program Files (x86)`                                | <                                                                                                      |
| Global Program Config          | `/etc`, `/var/lib`                                                                                      | `%ALLUSERSPROFILE%` = `C:\ProgramData`                                                                                   | <                                                                                                      |
| Configurations                 | `~/.config/{app}/`                                                                                      | `%APPDATA%\{App}\`                                                                                                       | <                                                                                                      |
| Cache / Temp Files             | `~/.cache/{app}/`                                                                                       | `%LOCALAPPDATA%\{App}\Cache\`                                                                                            | <                                                                                                      |
| Local data / data base         | `~/.local/share/{app}/`                                                                                 | `%LOCALAPPDATA%\{App}\`                                                                                                  | <                                                                                                      |
|                                |                                                                                                         |                                                                                                                          |                                                                                                        |
---

## 6. String Formatting


|                               | bash                            | Batch/Cmd                            | PowerShell         |
| ----------------------------- | ------------------------------- | ------------------------------------ | ------------------ |
| Literal string                | `'text'`                        | `"text"` (no true single-quote)      | `'text'`           |
| Variable-expanding string     | `"text $var"`                   | `"text %var%"`                       | `"text $var"`      |
| Escape character              | `\`                             | `^`                                  | `` ` `` (backtick) |
| Line continuation             | `\`                             | `^`                                  | `` ` `` (backtick) |
| New line (inside a string)    | `\n` (in `$'...'` or `echo -e`) | *(no native — use two `echo` calls)* | `` `n ``           |
| Tab                           | `\t`                            | *(no native)*                        | `` `t ``           |
| Carriage return               | `\r`                            | *(no native)*                        | `` `r ``           |
| Literal backtick/backslash    | `\\`                            | `^^`                                 | ``` `` ```         |
| Comment                       | `#`                             | `REM` or `::`                        | `#`                |
| Command separator (same line) | `;`                             | `&`                                  | `;`                |


---

## 7. System

|                          | bash              | Batch/Cmd                                  | PowerShell                                   |
| ------------------------ | ----------------- | ------------------------------------------ | -------------------------------------------- |
| List processes           | `ps`              | `tasklist`                                 | `Get-Process` (`ps`)                         |
| Kill process             | `kill`            | `taskkill`                                 | `Stop-Process` (`kill`)                      |
| Which/where is a command | `which`           | `where`                                    | `Get-Command` (`gcm`), also `where.exe`      |
| Ping                     | `ping`            | `ping`                                     | `ping` (`Test-Connection`)                   |
| Network config           | `ifconfig` / `ip` | `ipconfig`                                 | `Get-NetIPConfiguration` (also `ipconfig`)   |
| Download a file          | `curl` / `wget`   | _(no native equivalent)_                   | `Invoke-WebRequest` (`curl`, `wget` aliased) |
| Run as admin             | `sudo`            | _(no equivalent — "Run as administrator")_ | `Start-Process -Verb RunAs`                  |
| Command history          | `history`         | `doskey /history`                          | `Get-History` (`history`)                    |
| Sleep/delay              | `sleep 5`         | `timeout /t 5`                             | `Start-Sleep -Seconds 5`                     |

---

## 8. Control Structure

|                                    | bash                                 | Batch/Cmd                                | PowerShell                                                        |
| ---------------------------------- | ------------------------------------ | ---------------------------------------- | ----------------------------------------------------------------- |
| If statement                       | `if [ cond ]; then ... fi`           | `if cond ( ... )`                        | `if (cond) { ... }`                                               |
| If/else                            | `if...then...else...fi`              | `if...else...`                           | `if (cond) {...} else {...}`                                      |
| Equal (numeric)                    | `-eq`                                | `==`                                     | `-eq`                                                             |
| Not equal                          | `-ne`                                | `NEQ`                                    | `-ne`                                                             |
| Greater than                       | `-gt`                                | `GTR`                                    | `-gt`                                                             |
| Less than                          | `-lt`                                | `LSS`                                    | `-lt`                                                             |
| String equal                       | `=` / `==` (in `[[ ]]`)              | `==`                                     | `-eq` (case-insensitive by default)                               |
| Logical AND                        | `&&` / `-a`                          | `&&`                                     | `-and`                                                            |
| Logical OR                         | `\|\|` / `-o`                        | `\|\|`                                   | `-or`                                                             |
| Logical NOT                        | `!`                                  | `NOT`                                    | `-not` / `!`                                                      |
| Case/switch statement              | `case $x in ... esac`                | *(no native — nested `if`/`goto`)*       | `switch ($x) { ... }`                                             |
| For loop (list)                    | `for i in 1 2 3; do ...; done`       | `for %%i in (1,2,3) do ...`              | `foreach ($i in 1,2,3) {...}`                                     |
| For loop (counted)                 | `for i in {1..5}; do ...; done`      | `for /l %%i in (1,1,5) do ...`           | `for ($i=1; $i -le 5; $i++) {...}`                                |
| For loop (files)                   | `for f in *.txt; do ...; done`       | `for %%f in (*.txt) do ...`              | `foreach ($f in Get-ChildItem *.txt) {...}`                       |
| While loop                         | `while [ cond ]; do ...; done`       | *(no native — faked with `goto`)*        | `while (cond) {...}`                                              |
| Loop over piped input              | `cmd1 \| while read x; do ...; done` | *(no direct equivalent)*                 | `cmd1 \| ForEach-Object { ... }` (shorthand: `cmd1 \| % { ... }`) |
| Filter piped input                 | `cmd1 \| grep pattern`               | *(no direct equivalent — use `findstr`)* | `cmd1 \| Where-Object { ... }` (shorthand: `cmd1 \| ? { ... }`)   |
| "Current item" inside a pipe block | n/a                                  | n/a                                      | `$_` (used inside `%` / `?` blocks)                               |
| Increment variable                 | `((i++))` or `i=$((i+1))`            | `set /a i+=1`                            | `$i++`                                                            |

---

## 9. Scripts

|                               | bash                           | Batch/Cmd                        | PowerShell                              |
| ----------------------------- | ------------------------------ | -------------------------------- | --------------------------------------- |
| Script file extension         | `.sh`                          | `.bat` / `.cmd`                  | `.ps1`                                  |
| Function definition           | `function name() { ... }`      | `:label ... goto :eof`           | `function Name { ... }`                 |
| Call function                 | `name arg1 arg2`               | `call :label arg1`               | `Name -Arg1 val`                        |
| Return a value                | `return N` (exit code only)    | `exit /b N`                      | `return $value` (any object type)       |
| Script arguments              | `$1`, `$2`, `$@`, `$#`         | `%1`, `%2`, `%*`                 | `$args[0]`, `$args`, or `param()` block |
| Read user input               | `read var`                     | `set /p var=`                    | `Read-Host`                             |
| Include/source another script | `source file.sh` / `. file.sh` | `call file.bat`                  | `. .\file.ps1`                          |
| Run script in current dir     | `./script.sh`                  | `script.bat` (CWD auto-searched) | `.\script.ps1` (explicit `.\` required) |
| Config/profile file           | `.bashrc` / `.bash_profile`    | _(no profile concept)_           | `$PROFILE`                              |

---

## 10. Data Structures

|                      | bash                 | Batch/Cmd            | PowerShell                        |
| -------------------- | -------------------- | -------------------- | --------------------------------- |
| Arrays               | `arr=(a b c)`        | _(no native arrays)_ | `$arr = @('a','b','c')`           |
| Array access         | `${arr[0]}`          | _(n/a)_              | `$arr[0]`                         |
| String concatenation | `"$a$b"`             | `set c=%a%%b%`       | `$a + $b` or `"$a$b"`             |
| String length        | `${#str}`            | _(no native)_        | `$str.Length`                     |
| Substring            | `${str:0:3}`         | _(no native)_        | `$str.Substring(0,3)`             |
| Arithmetic           | `$((1+2))` or `expr` | `set /a "1+2"`       | `1+2` (native, no special syntax) |

---

## 11. Errors

|                      | bash             | Batch/Cmd                    | PowerShell                  |
| -------------------- | ---------------- | ---------------------------- | --------------------------- |
| Last exit/error code | `$?`             | `%ERRORLEVEL%`               | `$?` / `$LASTEXITCODE`      |
| Try/catch            | `trap` (limited) | _(no native error handling)_ | `try { ... } catch { ... }` |






