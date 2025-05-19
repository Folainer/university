![](https://raw.githubusercontent.com/Folainer/university/refs/heads/main/TIRPZ/Lab1/img/KPI_logo.jpeg)
## Міністерство освіти і науки України Національний технічний університет України
## «Київський політехнічний інститут»
<br>

### Лабораторна робота №1

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

repository clonning
```git
git clone git@github.com:kop7/serverless-nestjs-typeorm.git Nestjs-full
```

repository shallow clonning
```git 
git clone git@github.com:kop7/serverless-nestjs-typeorm.git --branch=master --depth=1 --single-branch Nestjs
```
Parameters explanations
> - `--depth` defines how many recent commits should be clonned
> - `--signle-branch` says to git that one branch only should be clooned
> - `--branch` checks out the specific branch after clonning
> - `--recursive` also clones nested submodules

checking repositories sizes
```
du -sh ./*/.git 
```

And the result
```
83K     ./Nestjs-full/.git
65K     ./Nestjs/.git
```

We can notice that sizes is equal

Actually, the firts repository has two commits and the second commits did not make any change in the size

We will use the full project to make a few commits

So we will use for checking our changes in the project

```
git status
```
and the result is 
```
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   README.md
        modified:   nest-cli.json
        modified:   nodemon-debug.json
        modified:   nodemon.json
        modified:   package.json
        modified:   serverless.yml
        modified:   src/app.controller.ts
        modified:   src/app.module.ts
        modified:   src/app.service.ts
        modified:   src/config/database.ts
        modified:   src/entity/author.entity.ts
        modified:   src/entity/book.entity.ts
        modified:   src/entity/index.ts
        modified:   src/lambda.ts
        modified:   src/modules/author/author.controller.ts
        modified:   src/modules/author/author.module.ts
        modified:   src/modules/author/author.service.ts
        modified:   src/modules/book/book.controller.ts
        modified:   src/modules/book/book.module.ts
        modified:   src/modules/book/book.service.ts
        modified:   test/app.e2e-spec.ts
        modified:   test/jest-e2e.json
        modified:   tsconfig.build.json
        modified:   tsconfig.json
        modified:   tsconfig.spec.json
        modified:   tslint.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        src/time.ts

no changes added to commit (use "git add" and/or "git commit -a")
```
Let's make one commit, initially let's add unstaged file
```
git add src/time.ts
```

and let's commit with the message `add time.ts`
```
git commit -m "add time.ts"
```

And as a result
```
[master e03e514] add time.ts
 1 file changed, 9 insertions(+)
 create mode 100644 src/time.ts
```
Let's create 1.txt, 2.txt and commit them
```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   README.md
        modified:   nest-cli.json
        modified:   nodemon-debug.json
        modified:   nodemon.json
        modified:   package.json
        modified:   serverless.yml
        modified:   src/app.controller.ts
        modified:   src/app.module.ts
        modified:   src/app.service.ts
        modified:   src/config/database.ts
        modified:   src/entity/author.entity.ts
        modified:   src/entity/book.entity.ts
        modified:   src/entity/index.ts
        modified:   src/lambda.ts
        modified:   src/modules/author/author.controller.ts
        modified:   src/modules/author/author.module.ts
        modified:   src/modules/author/author.service.ts
        modified:   src/modules/book/book.controller.ts
        modified:   src/modules/book/book.module.ts
        modified:   src/modules/book/book.service.ts
        modified:   test/app.e2e-spec.ts
        modified:   test/jest-e2e.json
        modified:   tsconfig.build.json
        modified:   tsconfig.json
        modified:   tsconfig.spec.json
        modified:   tslint.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        1.txt
        2.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Using
```
git status -uno
```

We get 
```
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   README.md
        modified:   nest-cli.json
        modified:   nodemon-debug.json
        modified:   nodemon.json
        modified:   package.json
        modified:   serverless.yml
        modified:   src/app.controller.ts
        modified:   src/app.module.ts
        modified:   src/app.service.ts
        modified:   src/config/database.ts
        modified:   src/entity/author.entity.ts
        modified:   src/entity/book.entity.ts
        modified:   src/entity/index.ts
        modified:   src/lambda.ts
        modified:   src/modules/author/author.controller.ts
        modified:   src/modules/author/author.module.ts
        modified:   src/modules/author/author.service.ts
        modified:   src/modules/book/book.controller.ts
        modified:   src/modules/book/book.module.ts
        modified:   src/modules/book/book.service.ts
        modified:   test/app.e2e-spec.ts
        modified:   test/jest-e2e.json
        modified:   tsconfig.build.json
        modified:   tsconfig.json
        modified:   tsconfig.spec.json
        modified:   tslint.json

no changes added to commit (use "git add" and/or "git commit -a")
```

Let's commit staged changes using
```
git commit -am "add modified files"
```

So we get 
```
[master 5e6fdf6] add modified files
 27 files changed, 557 insertions(+), 557 deletions(-)
```

Let's track 1.txt and then change previous commit
```
git add 1.txt
git commit --amend -m "add 1.txt and modified files"
```

And the result
```
[master 89c7ab5] add 1.txt and modified files
 Date: Wed Oct 16 21:04:42 2024 +0900
 28 files changed, 557 insertions(+), 557 deletions(-)
 create mode 100644 1.txt
```

Let's add commit without `-m`
```
git add 2.txt
git commit
```

The result
![](https://raw.githubusercontent.com/Folainer/university/refs/heads/main/TIRPZ/Lab1/img/nano.png)


Let's check our all commits using
```
git log --oneline --graph
```

The result
```
* 736dbf4 (HEAD -> master) add 2.txt
* 89c7ab5 add 1.txt and modified files
* e03e514 add time.ts
* 0d5ab6c (origin/master, origin/HEAD) Update README.md
* 76522c8 update nestjs and nestjsx packages
* 116ea43 first commit
```

Let's delete few commits

we could use 
```
git reset HEAD~2
```

But in this case we could lose precious files

Now we have such commits
```
* e03e514 (HEAD -> master) add time.ts
* 0d5ab6c (origin/master, origin/HEAD) Update README.md
* 76522c8 update nestjs and nestjsx packages
* 116ea43 first commit
```

Let's check current status
```
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   README.md
        modified:   nest-cli.json
        modified:   nodemon-debug.json
        modified:   nodemon.json
        modified:   package.json
        modified:   serverless.yml
        modified:   src/app.controller.ts
        modified:   src/app.module.ts
        modified:   src/app.service.ts
        modified:   src/config/database.ts
        modified:   src/entity/author.entity.ts
        modified:   src/entity/book.entity.ts
        modified:   src/entity/index.ts
        modified:   src/lambda.ts
        modified:   src/modules/author/author.controller.ts
        modified:   src/modules/author/author.module.ts
        modified:   src/modules/author/author.service.ts
        modified:   src/modules/book/book.controller.ts
        modified:   src/modules/book/book.module.ts
        modified:   src/modules/book/book.service.ts
        modified:   test/app.e2e-spec.ts
        modified:   test/jest-e2e.json
        modified:   tsconfig.build.json
        modified:   tsconfig.json
        modified:   tsconfig.spec.json
        modified:   tslint.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        1.txt
        2.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Let's delete tslint.json
```
git rm src/time.ts
```

So the status now
```
n branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    src/time.ts

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   README.md
        modified:   nest-cli.json
        modified:   nodemon-debug.json
        modified:   nodemon.json
        modified:   package.json
        modified:   serverless.yml
        modified:   src/app.controller.ts
        modified:   src/app.module.ts
        modified:   src/app.service.ts
        modified:   src/config/database.ts
        modified:   src/entity/author.entity.ts
        modified:   src/entity/book.entity.ts
        modified:   src/entity/index.ts
        modified:   src/lambda.ts
        modified:   src/modules/author/author.controller.ts
        modified:   src/modules/author/author.module.ts
        modified:   src/modules/author/author.service.ts
        modified:   src/modules/book/book.controller.ts
        modified:   src/modules/book/book.module.ts
        modified:   src/modules/book/book.service.ts
        modified:   test/app.e2e-spec.ts
        modified:   test/jest-e2e.json
        modified:   tsconfig.build.json
        modified:   tsconfig.json
        modified:   tsconfig.spec.json
        modified:   tslint.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        1.txt
        2.txt
```

Let's commit everything
```
git add .
git commit -m "commit all recent changes"
```

Not let's move/rename 1.txt
```
mv 1.txt 10.txt
```

And the result
```
On branch master
Your branch is ahead of 'origin/master' by 3 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    1.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        10.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Let's make three branches and switch to the last one
```
git branch feature1
git branch feature2
git checkout -b feature3
```

After 
```
git branch
```

We can see
```
  feature1
  feature2
* feature3
  master
```

Let's make file feature1.txt, feature2.txt and feature3.txt and then commit with corresponding branch

For switching, we will use

```
git checkout feature#
```

or
```
git switch feature#
```

After 
```
 git log --oneline --graph
```

We can see
```
* a17b4ce (HEAD -> feature1) add feature1.txt
* d145701 (master) rename 1.txt into 10.txt
* 9c45c6b commit all recent changes
* abbc0c8 delete time.ts
* e03e514 add time.ts
* 0d5ab6c (origin/master, origin/HEAD) Update README.md
```

But after 
```
git merge feature2 feature3
```

We can see
```
*-.   54f109c (HEAD -> feature1) Merge branches 'feature2' and 'feature3' into feature1
|\ \
| | * ac7b9a8 (feature3) add feature3.txt
| * | ad759de (feature2) add feature2.txt
| |/
* / a17b4ce add feature1.txt
|/
* d145701 (master) rename 1.txt into 10.txt
* 9c45c6b commit all recent changes
* abbc0c8 delete time.ts
* e03e514 add time.ts
* 0d5ab6c (origin/master, origin/HEAD) Update README.md
* 76522c8 update nestjs and nestjsx packages
* 116ea43 first commit
```

Let's check last few commits using
```
git log d145701..HEAD --oneline --graph
```

We have
```
*-.   54f109c (HEAD -> feature1) Merge branches 'feature2' and 'feature3' into feature1
|\ \
| | * ac7b9a8 (feature3) add feature3.txt
| * ad759de (feature2) add feature2.txt
* a17b4ce add feature1.txt
```

Let's add one commit in which write somthing into 10.txt
```
git commit -a -m "modify 10.txt"
```

Now let's find where the string Hello world(added to 10.txt) was modified
```
git log -G "Hello world"
```

We have
```
commit f174265ba588b85f8cb1373d3a2dd00c932e3ebb (HEAD -> feature1)
Author: Maksym <mak.krutogouz@gmail.com>
Date:   Wed Oct 16 22:08:56 2024 +0900

    modify 10.txt
```

We can ensure using 
```
git log --oneline HEAD~5..HEAD~0
```

So we have
```
f174265 (HEAD -> feature1) modify 10.txt
54f109c Merge branches 'feature2' and 'feature3' into feature1
a17b4ce add feature1.txt
ad759de (feature2) add feature2.txt
ac7b9a8 (feature3) add feature3.txt
d145701 (master) rename 1.txt into 10.txt
9c45c6b commit all recent changes
```

Let's check changes of 10.txt file
```
git diff HEAD~1..HEAD 10.txt
```

We have
```
diff --git a/10.txt b/10.txt
index e69de29..70c379b 100644
--- a/10.txt
+++ b/10.txt
@@ -0,0 +1 @@
+Hello world
\ No newline at end of file
```

Or we can use
```
git show HEAD~1..HEAD 10.txt
```

And get
```
commit f174265ba588b85f8cb1373d3a2dd00c932e3ebb (HEAD -> feature1)
Author: Maksym <mak.krutogouz@gmail.com>
Date:   Wed Oct 16 22:08:56 2024 +0900

    modify 10.txt

diff --git a/10.txt b/10.txt
index e69de29..70c379b 100644
--- a/10.txt
+++ b/10.txt
@@ -0,0 +1 @@
+Hello world
\ No newline at end of file
```

The lab is done :smile:!

[Github repository](https://github.com/Folainer/university/tree/main/TIRPZ/Lab1)