# Firefund - Style guide

## Generates live CSS documentation for use on the firefund website

[![Stories in Ready](https://badge.waffle.io/Firefund/styleguide.png?label=ready&title=Ready)](https://waffle.io/Firefund/styleguide)

We use [kalei](https://github.com/Firefund/kaleistyleguide/) to generate our CSS documentation right in your browser.

## Prerequisites

You can test if you have `git`, `make` and `node` installed by trying to call them in your terminal/cmd.
```
git --version
node -v
make -v
```

1. Install [git](https://git-scm.com/downloads) our version control
2. Install [git lfs](https://git-lfs.github.com/) our version control for large files like pictures and illustrator documents
3. Install [nodejs](https://nodejs.org/en/) our server platform and platform for various helper tools
4. Install [make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm). It's preinstalled on Mac.
Probably also with your linux distro. Make is a task runner designed for compiling files. 


## Getting started

1. Go to https://github.com/Firefund/frontend/ and copy the git url.
1. Download the repository (`git clone --depth=1 https://github.com/Firefund/frontend.git`) and cd into the frontend folder.
2. `npm i` - download the node packages that we depend on.
3. `npm install -g bower` - downloads Bower
4. Go to [localhost:8080](localhost:8080) in your browser (preferably in two or three different, like firefox and chrome
to ensure that your styles work in all browsers)
5. Start developing css in `styles/blocks/`


## Creating new BEM blocks

1. Find or create a card in [Waffle - our kanban tool](https://waffle.io/Firefund/styleguide)
2. Create a css file in `styles/blocks/` - name it after your BEM block
3. add the file path to `styles/styleguide.css`. `@import "blocks/YourFileName.css";`
4. if you need to use any of the variables defined in `styles/_variables.css`, you need to import it with: `@import "../variables";` <- **no url**


## Clean CSS

The anatomy for *clean* CSS declaration blocks is the following: 
```
/* Sorting the CSS in BEM blocks */
 FIRST: position/box-model
	position:
	display:
	top/right/bottom/left
	float
	content (only used with position: absolute/relative and ::before and/or ::after)


SECOND: size
	height:
	margin:;
	padding;
	border

THIRD: font/text
	color
	font-*
	text-*
	line-height

FOURTH: background

FIFTH: transitions/transforms/animation

SIXTH: weird stuff
	cursor:
	list-style:
```

Happy coding!


# Secure code

We sign our commits in the master branch to be sure no one can tamper with our code without us noticing it.

To see signed commits your write `git log --show-signature`.
If you dislike typing you can create an alias. E.g. `git config alias.l "log --show-signature"`.
Now, you only need to write `git l`.

You'll need a pgp key with the same name as your github user.

`git config user.signingkey [Your key]`

`git config commit.gpgsign true`

You can see your key by writing `gpg --list-keys`

### git janitor
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

## Everyone Must Sign
Signing tags and commits is great, but if you decide to use this in your normal workflow, you’ll have to make sure that everyone on your team understands how to do so. If you don’t, you’ll end up spending a lot of time helping people figure out how to rewrite their commits with signed versions. Make sure you understand GPG and the benefits of signing things before adopting this as part of your standard workflow.


## Lastly

A good password is only used once and is easy to remember!

![Password Strength](https://www.explainxkcd.com/wiki/images/6/6a/password_strength.png)