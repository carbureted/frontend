Table of Content

1. [Introduction](#introduction)
2. [Warning](wWarning)
3. [How to sign](#how-to-sign)
4. [Git Janitors](#git-janitors)
5. [Fix missing signing](#fix-missing-signing)
6. [More info](#more-info)
7. [FAQ](#faq)
8. [Roles](#roles)
9. [Strong passphrases](#strong-passphrases)

Introduction
============

All Git Janitors are maintainers.
This folder, is created to collect git janitors and possibly other contributors public PGP keys.

The reason we do this, is to sign all commits and pull requests. In non-tech language, it is to
verify every new edition of the website.
If our website was handled by a boss sitting behind a desk, and everytime some one from the office has
a new campaign ready, that person would have to talk to the boss and make him update the website and launch
the campaign. We are trying to do stuff a little different.

Everytime someone on the Git Janitor team reviews a new campaign code from one of the Git Campaigners
(see [roles](#roles)), the Git Janitor will make sure that the code is clean from bugs, virusses,
germs etc. It can be hard to be sure about that, because hackers are smart.

So when the Git Janitor have cleaned everything she can see, then she will commit the code to our
`Master` which will launch the campaign if it is accepted. But it will only be accepted, if the
Git Janitor can verify herself by signing the PR (Pull Request, in Git language) and if there's
nothing hidden somewhere else in the code. This is a pretty strong and very important security measure,
and if you are annoyed about having to learn about PGP-encryption to function as a Git Janitor, then
just imaging what hackers could hit us with, when they would be able to put in their own software on our website.

Read more about signing, PGP encryption, Github GPG encryption by researching it online - I will not
go into technical details here.

### NEW TOOL ###
Using [Looks Good To Me](https://lgtm.co/docs/overview/) we can visually see that a PR is approved by a
registered Maintainer. This mean we can have 2 kinds of git janitors, they have the same access rights
to the repository but some git janitors (the ones listed in the [MAINTAINERS](../MAINTAINERS) file)
will have to approve a PR before it can be merged. All git janitors should be listed in the [MAINTAINERS](../MAINTAINERS)
file but we could have a grace period where new git janitors would need to gain some experience before
they are listed in the [MAINTAINERS](../MAINTAINERS) file.
Our *approval* system is currently setup to need a single (1) approval from a listed maintainer.


Warning
=======
Everyone Must Sign!
Signing tags and commits is great, but if you decide to use this in your normal workflow, you’ll have to
make sure that everyone on your team understands how to do so. If you don’t, you’ll end up spending a lot
of time helping people figure out how to rewrite their commits with signed versions. Make sure you understand
GPG and the benefits of signing things before adopting this as part of your standard workflow.


How to sign
===========
We sign our commits in the master branch to be sure no one can tamper with our code without us noticing it.

To see signed commits your write `git log --show-signature`.
If you dislike typing you can create an alias. E.g. `git config alias.l "log --show-signature"`.
Now, you only need to write `git l`.

You'll need a pgp key with the same name as your github user.

This will choose which key you are using for verification:
`git config user.signingkey [Your key]`

This will set it to do it automatically, so you don't have to write -S with your commits:
`git config commit.gpgsign true`

If you by accident committed something that is not signed:
'git commit --amend -S'

OBS: Most people will enter Wi, and you can get out again by clicking: ESC, :, w,q,enter
OBS: If you hate it when you enter Wi, then you can change to your preferred editor instead of Wi like this:
https://trello.com/c/24uvJkO0/476-jon-please-help-mikkel-add-his-text-editor-as-default-in-his-shell-3



You can see your key by writing `gpg --list-keys`

{The 'How to sign' section is copied from the general README.md}


Git Janitors
================
You merge a PR in by writing `git merge --verify-signatures -S [NAME OF PR]`

https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work

In Git 1.8.3 and later, "git merge" and "git pull" can be told to inspect and reject when merging a commit that does not carry a trusted GPG signature with the --verify-signatures command.

If you use this option when merging a branch and it contains commits that are not signed and valid, the merge will not work.

	$ git merge --verify-signatures non-verify
	fatal: Commit ab06180 does not have a GPG signature.
If the merge contains only valid signed commits, the merge command will show you all the signatures it has checked and then move forward with the merge.

	$ git merge --verify-signatures signed-branch
	Commit 13ad65e has a good GPG signature by Scott Chacon (Git signing key) <schacon@gmail.com>
	Updating 5c3386c..13ad65e
	Fast-forward
	README | 2 ++
	1 file changed, 2 insertions(+)
You can also use the -S option with the git merge command itself to sign the resulting merge commit itself. The following example both verifies that every commit in the branch to be merged is signed and furthermore signs the resulting merge commit.

	$ git merge --verify-signatures -S  signed-branch
	Commit 13ad65e has a good GPG signature by Scott Chacon (Git signing key) <schacon@gmail.com>

	You need a passphrase to unlock the secret key for
	user: "Scott Chacon (Git signing key) <schacon@gmail.com>"
	2048-bit RSA key, ID 0A46826A, created 2014-06-04

	Merge made by the 'recursive' strategy.
	README | 2 ++
	1 file changed, 2 insertions(+)

{The 'Git janitor' section is copied from the general README.md}



Fix missing signing
===================
WARNING: 	This will destroy everyone else copy of the branch, it is is the *master* branch - you will
destroy/invalidate everyone elses local copy - meaning they have to download the repository again and possibly
have a lot of difficulties merging in their new work.

YOU SHOULD NEVER PUSH UNSIGN COMMITS TO MASTER!! Check with `git log --show-signature` before you push!

You can rewrite git history with `rebase -i`. With `rebase -i` you first have to find the last *good* commit.
That is the last commit who has a good signature. To find this you do:

`git log --show-signature`

This will give you a list of commits (you can scroll down with `j` and up with `k` if you don't find any *good* commits).

Let's say the first *good* commit is 3 commits down. That is, we have 2 *bad* commits but the third is fine. You copy the commit hash,
which looks like this:

`76d5807afd8c0b4ed948c027c8668058828e8a29`

Then you write `git rebase -i 76d5807afd8c0b4ed948c027c8668058828e8a29`.

You now enter rebase mode. The editor you have configured git to use will open with a list of 2 commits. In the list you want to edit
this 2 unsigned commits with `git commit --amend -S`.

First you mark the 2 commits for edit. Just write `e` in front of the commit hash.

```
pick 76d5807 figure out of to use the...
pick c21d192 perhaps a solution to our...
```

Will be

```
e 76d5807 figure out of to use the...
e c21d192 perhaps a solution to our...
```

Close you editor and if asked to save, save!

You can now edit the commits. We don't want to change anything in the commits but merely sign them. Remember that signing is `-S`.

Type: `git commit --amend -S`

And after you have entered your password for unlocking the signing key (if you have a passphrase for that), you need to continue with
the rebase.

Type: `git rebase --continue`

Then you do the same for the last *bad* commit.

**NOTE:** If you have anything signed after these commits, you will have to re-sign those commits as well, because the commit-signature
no longer is valid because you have changed the git history. If it is merely the current/last commit, you will just do
`git commit --amend -S`. If it is not your commits - you are in trouble.



More info
==========
This is a work in progress. Feel free to contribute to the MAINTAINERS.md with more guidance, infomation and ressources.
If you have questions you think should be answered here, then simply add questions here, and others will try to explain.



FAQ
====
{Add questions here}
{Add answers to questions here}



Roles
=====
![Our taxonomy](https://media.githubusercontent.com/media/Firefund/firefund-lfs/master/architecture/Taxonomy.png)


Strong passphrases
==================
A good passphrase is only used once and is easy to remember!
![Password Strength](https://www.explainxkcd.com/wiki/images/6/6a/password_strength.png)

Do you know why it's wrong to use the word password, and instead you should use the word passphrase?
If you can answer this, then you know will receive a basic internet security highfive and good karma.
