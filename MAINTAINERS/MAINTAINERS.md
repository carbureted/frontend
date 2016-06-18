Introduction
============

All git janitors are maintainers. 
This folder, is created to collect git janitors and possibly other contribuaters public PGP keys. 

The reason we do this, is to sign all commits and pull requests. In non-tech language, it is to verify every new edition of the website. 
If our website was handled by a boss sitting behind a desk, and everytime on from the office has a new campaign ready, that person will talk to the boss and make him update the website and launch the campaign. We are trying to do stuff a little different. 

Everytime someone on the Git Janitor team reviews a new campaign code from one of the Git Campaigners (see roles*), the Git Janitor will make sure that the code is clean from bugs, virusses, germs etc. It can be hard to be sure about that, because hackers are smart. 

So when the Git Janitor have cleaned everything she can see, then she will commit the code to our 'Master' which will launch the campaign if it is accepted. But it will only be accepted, if the Git Janitor can verify herself by signing the PR (Pull Request, in Git language) and if there's nothing hidden somewhere else in the code. This is a pretty strong and very important security measure, and if you are annoyed about having to learn about PGP-encryption to function as a Git Janitor, then just image what hackers could hit us with, when they would be able to put in their own software on our website. 

Read more about signing, PGP encryption, Github GPG encryption by researching it online - I will not go into technical details here. 


Warning
=======
Everyone Must Sign!
Signing tags and commits is great, but if you decide to use this in your normal workflow, you’ll have to make sure that everyone on your team understands how to do so. If you don’t, you’ll end up spending a lot of time helping people figure out how to rewrite their commits with signed versions. Make sure you understand GPG and the benefits of signing things before adopting this as part of your standard workflow.


How to sign
===========
We sign our commits in the master branch to be sure no one can tamper with our code without us noticing it.

To see signed commits your write `git log --show-signature`.
If you dislike typing you can create an alias. E.g. `git config alias.l "log --show-signature"`.
Now, you only need to write `git l`.

You'll need a pgp key with the same name as your github user.

`git config user.signingkey [Your key]`

`git config commit.gpgsign true`

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



More info: 
==========
This is a work in progress. Feel free to contribute to the MAINTAINERS.md with more guidance, infomation and ressources. 
If you have questions you think should be answered here, then simply add questions here, and others will try to explain. 



FAQ: 
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
