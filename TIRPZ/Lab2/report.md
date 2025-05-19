![](https://raw.githubusercontent.com/Folainer/university/refs/heads/main/TIRPZ/Lab1/img/KPI_logo.jpeg)
## Міністерство освіти і науки України Національний технічний університет України
## «Київський політехнічний інститут»
<br>

### Лабораторна робота №2

*з дисципліни «Технології та Інструменти Розробки Програмного Забезпечення»*
<br>
<br>

**Виконав студент групи: КВ-22**
**ПІБ: Крутогуз Максим Ігорович**
**Варіант 12**
**Перевірив:**


**Київ 2024**

---

#### Assignment acomplishment

### Repository clonning
repository clonning 
```
git clone git@github.com:cambecc/grib2json.git
```

In this repository was added two commits com1 and com2
```
* 9e01c0b (HEAD -> master) com2
* 2c4cbc3 com1
*   cfbe557 (origin/master, origin/HEAD) Merge pull request #30 from jacobtomlinson/patch-1
|\  
| * 620284a Fix Unidata repository
|/  
* de8676f increase max heap
* 1f05d22 remove dependency exclusions
* ba72217 use .cmd instead of .bat
* 279270b use longname option ordering assign center id for ESR dump netcdf file to log when logging enabled
* 7b53726 Write missing OSCAR values as null rather than "NaN", because it is more compact.
* f02729e add OSCAR->JSON support
* 27b158c add discipline filter
* 47db446 add batching ("recipe") feature to improve performance.
```

Let's add two another commits(I forgot to make new branch) com3 and com4 in branch feature1
```
* commit 7e2fe4976196acbe7cb1b6c327a64b67015d097c (HEAD -> master)      
| Author: Maksym <mak.krutogouz@gmail.com>
| Date:   Sun Oct 27 21:39:42 2024 +0900
|
|     com4
:...skipping...
* commit 7e2fe4976196acbe7cb1b6c327a64b67015d097c (HEAD -> master)      
| Author: Maksym <mak.krutogouz@gmail.com>
| Date:   Sun Oct 27 21:39:42 2024 +0900
|
|     com4
|
* commit 3e19d9b0b3fae5fe6c339932c25a07a3425b052c
| Author: Maksym <mak.krutogouz@gmail.com>
| Date:   Sun Oct 27 21:39:31 2024 +0900
|
|     com3
|
* commit 9e01c0b2349016c059d7b4bfc932731d2d8a8d0f (feature1)
| Author: Maksym <mak.krutogouz@gmail.com>
| Date:   Sun Oct 27 21:27:00 2024 +0900
|
|     com2
|
* commit 2c4cbc33c5f8597220d274cc33e7c2f107c85067
| Author: Maksym <mak.krutogouz@gmail.com>
| Date:   Sun Oct 27 21:26:41 2024 +0900
|
|     com1
|
*   commit cfbe5574ca34fbccb54292a410b709c66d9f2037 (origin/master, origin/HEAD)
|\  Merge: de8676f 620284a
| | Author: Cameron Beccario <cambecc@users.noreply.github.com>
| | Date:   Thu Nov 23 13:54:55 2017 +0900
| |
| |     Merge pull request #30 from jacobtomlinson/patch-1
| |
| |     Fix Unidata repository
| |
| * commit 620284a5cf07ff944a10db866145f0dbc94b8e68
|/  Author: Jacob Tomlinson <jacobtomlinson@users.noreply.github.com>   
|   Date:   Fri Nov 17 15:00:19 2017 +0000
|
|       Fix Unidata repository
|
```

Now let's clone the repository
```
git clone D:\Projects\University\TIRPZ\ForLab2\
```

Let's check our branches in cloned repository from my PC
```
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/feature1
  remotes/origin/master
```

### Remotes
Let's use
```
git remote -v
```

And the result is 
```
origin  D:\Projects\University\TIRPZ\ForLab2\ (fetch)
origin  D:\Projects\University\TIRPZ\ForLab2\ (push)
```

Let's  add remote
```
git remote add upstream1 git@github.com:cambecc/grib2json.git 
```

And
```
git remote -v             
origin  D:\Projects\University\TIRPZ\ForLab2\ (fetch)
origin  D:\Projects\University\TIRPZ\ForLab2\ (push)
upstream1       git@github.com:cambecc/grib2json.git (fetch)
upstream1       git@github.com:cambecc/grib2json.git (push)
```

Let's fetch upstream1  by
```
git fetch upstream1
```

So, we have
```
git branch -a      
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/feature1
  remotes/origin/master
```

Let's add another branch feature2 and switch to it
```
git checkout -b feature2
Switched to a new branch 'feature2'
```

Let's add two file src/1.java and src/2.java and made correcponding two commits j1 and j2

Now let's push it to our remote upstream1
```
git push origin
fatal: The current branch feature2 has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin feature2

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git hgit push --set-upstream origin feature2
```
```
 git push --set-upstream origin feature2
 Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 720 bytes | 720.00 KiB/s, done.
Total 8 (delta 4), reused 0 (delta 0), pack-reused 0
To D:\Projects\University\TIRPZ\ForLab2\
 * [new branch]      feature2 -> feature2
branch 'feature2' set up to track 'origin/feature2'.
```

Let's add new commit j3 and next we will make sure that we don't need to link branch

```
git push
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 347 bytes | 347.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0), pack-reused 0
To D:\Projects\University\TIRPZ\ForLab2\
   97f1f0e..549594f  feature2 -> feature2
```

Let's check local branch in lab1's repository
```
git branch --all
  feature1
  feature2
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

But I accidantly made branch with the same name which there are in lab1's repository, so commits on lab2's repository was added to feature2
```
git log --oneline --graph -n 20 feature2 --all
* 549594f (HEAD -> feature2) j3
* 97f1f0e j2
* 1a9ea50 j1
* 7e2fe49 (master) com4
* 3e19d9b com3
* 9e01c0b (feature1) com2
* 2c4cbc3 com1
*   cfbe557 (origin/master, origin/HEAD) Merge pull request #30 from jacobtomlinson/patch-1
|\
| * 620284a Fix Unidata repository
|/
* de8676f increase max heap
* 1f05d22 remove dependency exclusions
* ba72217 use .cmd instead of .bat
* 279270b use longname option ordering assign center id for ESR dump netcdf file to log when logging enabled
* 7b53726 Write missing OSCAR values as null rather than "NaN", because it is more compact.
* f02729e add OSCAR->JSON support
* 27b158c add discipline filter
* 47db446 add batching ("recipe") feature to improve performance.       
* da6f3e6 reduce xmx
* 843a60a tweak exit codes
* becc068 allow filter that selects both u and v wind components at once
```

### Merging
Let's add new branch feature3 on lab1's repository and made feature3_c1 one commit 
```
feature2
master
remotes/origin/HEAD -> origin/master
remotes/origin/feature1
remotes/origin/feature2
remotes/origin/feature3
remotes/origin/master
remotes/upstream1/master
```


Let's merge feature2 with remotes/origin/feature3
```
git merge origin/feature3
Updating 549594f..c426172
Fast-forward
 5.txt | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 5.txt
```
```
git log --graph --oneline --all
*   416e9f5 (HEAD -> feature2) Merge remote-tracking branch 'origin/feature3' into feature2
|\
| * 763044b (origin/feature3) com7
* | 52ae3d1 (origin/feature2) com6
|/
* c426172 feature3_c1
* 549594f j3
* 97f1f0e j2
* 1a9ea50 j1
* 7e2fe49 (origin/master, origin/HEAD, master) com4
* 3e19d9b com3
* 9e01c0b (origin/feature1) com2
```

### Cherry pick

Let's add one branch `feature4` and add 4 commits `fb4_c1, fb4_c2, fb4_c3, fb4_c4` to it

Let's switch to `feature2` and try to cherry pick fb4_c3 commit
```
* 7e91ab2 (feature4) fb4_c4
* 7e91ab2 (feature4) fb4_c4
* 54625e2 fb4_c3
* abdc8ee fb4_c2
* a69e02e fb4_c1
* 7e91ab2 (feature4) fb4_c4
* 54625e2 fb4_c3
* abdc8ee fb4_c2
* a69e02e fb4_c1
| *   a50e57c (refs/stash) WIP on feature2: ecdc905 f4_c3
|/|\
| | * 46b33c5 untracked files on feature2: ecdc905 f4_c3
| * f775db0 index on feature2: ecdc905 f4_c3
|/
* 7e91ab2 (feature4) fb4_c4
* 54625e2 fb4_c3
* abdc8ee fb4_c2
* a69e02e fb4_c1
| *   a50e57c (refs/stash) WIP on feature2: ecdc905 f4_c3
|/|\
| | * 46b33c5 untracked files on feature2: ecdc905 f4_c3
| * f775db0 index on feature2: ecdc905 f4_c3
|/
* ecdc905 (HEAD -> feature2) f4_c3
* 48201c8 f4_c2
* d892c0a f4_c1
*   416e9f5 Merge remote-tracking branch 'origin/feature3' into feature2  
|\
* 7e91ab2 (feature4) fb4_c4
* 54625e2 fb4_c3
* abdc8ee fb4_c2
* a69e02e fb4_c1
| *   a50e57c (refs/stash) WIP on feature2: ecdc905 f4_c3
|/|\
| | * 46b33c5 untracked files on feature2: ecdc905 f4_c3
| * f775db0 index on feature2: ecdc905 f4_c3
|/
* ecdc905 (HEAD -> feature2) f4_c3
* 48201c8 f4_c2
* d892c0a f4_c1
*   416e9f5 Merge remote-tracking branch 'origin/feature3' into feature2  
|\
| * 763044b (origin/feature3) com7
* | 52ae3d1 (origin/feature2) com6
|/
```
```
git cherry-pick 54625e2
[feature2 e56e0df] fb4_c3
 Date: Mon Oct 28 20:36:46 2024 +0900
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 fb4_3.txt
```
```
git log --oneline --graph --all
* e56e0df (HEAD -> feature2) fb4_c3
| * 7e91ab2 (feature4) fb4_c4
| * 54625e2 fb4_c3
| * abdc8ee fb4_c2
| * a69e02e fb4_c1
|/
| *   a50e57c (refs/stash) WIP on feature2: ecdc905 f4_c3
|/|\
| | * 46b33c5 untracked files on feature2: ecdc905 f4_c3
| * f775db0 index on feature2: ecdc905 f4_c3
|/
* ecdc905 f4_c3
```

```
git log --pretty=oneline --graph -n 10 --branches
* e56e0dfffe37c1aafc0c99920c3a21588165cb12 (HEAD -> feature2) fb4_c3
| * 7e91ab2ee795b59cd926aa858f003caffe5ebd5c (feature4) fb4_c4
| * 54625e241cb7e24bcae7b5d00b61aedd18ce6dc5 fb4_c3
| * abdc8ee97f7e1094a6da113234912d7739f524cd fb4_c2
| * a69e02e4afd5fd485dcf3d9654a39190c4bacff3 fb4_c1
|/
* ecdc90506c3a17f9fcff3ad170c028f25185443f f4_c3
```

### Last common parent
```
git branch -a               
* feature2
  feature4
  master
  remotes/origin/HEAD -> origin/master
  remotes/origin/feature1
  remotes/origin/feature2
  remotes/origin/feature3
  remotes/origin/master
  remotes/upstream1/master
PS D:\Projects\University\TIRPZ\Lab2\ForLab2> git merge-base feature2 feature4
ecdc90506c3a17f9fcff3ad170c028f25185443f
```
```
* e56e0dfffe37c1aafc0c99920c3a21588165cb12 (HEAD -> feature2) fb4_c3
| * 7e91ab2ee795b59cd926aa858f003caffe5ebd5c (feature4) fb4_c4
| * 54625e241cb7e24bcae7b5d00b61aedd18ce6dc5 fb4_c3
| * abdc8ee97f7e1094a6da113234912d7739f524cd fb4_c2
| * a69e02e4afd5fd485dcf3d9654a39190c4bacff3 fb4_c1
|/
* ecdc90506c3a17f9fcff3ad170c028f25185443f f4_c3
```

### Stash

Let's add two file `stash1.dat` and `stash2.dat`

Let's save in stash
```
 git stash
No local changes to save
```
```
 git stash
No local changes to save
```
```
git stash list
stash@{0}: WIP on feature2: e56e0df fb4_c3
stash@{1}: WIP on feature2: ecdc905 f4_c3
```

Let's add `stash3.dat` and save to stash
```
git stash list
stash@{0}: WIP on feature2: e56e0df fb4_c3
stash@{1}: WIP on feature2: e56e0df fb4_c3
stash@{2}: WIP on feature2: ecdc905 f4_c3
```

Let's change branch to feature 4 and retrieve stash@{1}
```
git stash apply "stash@{1}"
Already up to date.
On branch feature4
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        shatsh2.dat
        stash1.dat

nothing added to commit but untracked files present (use "git add" to track)
```

### .gitignore

I have added two files `app1.exe` and `app2.exe`

And let's add to `.gitignore`

```
*.exe
```

So we have
```
git status --ignored
On branch feature4
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)   
        modified:   .gitignore

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        shatsh2.dat
        stash1.dat

Ignored files:
  (use "git add -f <file>..." to include in what will be committed)       
        app1.exe
        app2.exe

no changes added to commit (use "git add" and/or "git commit -a")
```

Let's remove all untracted files
```
git clean -fdx
git clean -fdx
Removing app1.exe
Removing app2.exe
Removing shatsh2.dat
Removing stash1.dat
Removing target/
```

### Reflog

Let's see reflog
```
git reflog
7e91ab2 (HEAD -> feature4) HEAD@{0}: checkout: moving from feature2 to feature4
e56e0df (feature2) HEAD@{1}: reset: moving to HEAD
e56e0df (feature2) HEAD@{2}: reset: moving to HEAD
e56e0df (feature2) HEAD@{3}: cherry-pick: fb4_c3
ecdc905 HEAD@{4}: checkout: moving from feature4 to feature2
7e91ab2 (HEAD -> feature4) HEAD@{5}: commit: fb4_c4
54625e2 HEAD@{6}: commit: fb4_c3
abdc8ee HEAD@{7}: commit: fb4_c2
a69e02e HEAD@{8}: commit: fb4_c1
ecdc905 HEAD@{9}: checkout: moving from feature2 to feature4
ecdc905 HEAD@{10}: reset: moving to HEAD
ecdc905 HEAD@{11}: reset: moving to HEAD~1
c17d7ec HEAD@{12}: reset: moving to HEAD~
82e6236 HEAD@{13}: reset: moving to HEAD
82e6236 HEAD@{14}: reset: moving to HEAD~2
b1afbfd HEAD@{15}: checkout: moving from feature2 to feature2
b1afbfd HEAD@{16}: commit: fb4_c4
5b654f8 HEAD@{17}: commit: fb4_c3
82e6236 HEAD@{18}: commit: fb4_c2
```

Let's change the branch to `feature2` and check reflog
```
git reflog
e56e0df (HEAD -> feature2) HEAD@{0}: checkout: moving from feature4 to feature2
ef63059 (feature4) HEAD@{1}: commit: modify gitignore
7e91ab2 HEAD@{2}: checkout: moving from feature2 to feature4
e56e0df (HEAD -> feature2) HEAD@{3}: reset: moving to HEAD
e56e0df (HEAD -> feature2) HEAD@{4}: reset: moving to HEAD
e56e0df (HEAD -> feature2) HEAD@{5}: cherry-pick: fb4_c3
```