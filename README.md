# Firefund - Style guide

## We're migrating to [frontend](https://github.com/Firefund/frontend) - which only has signed commits in the master branch

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

1. Go to https://github.com/Firefund/styleguide/ and copy the git url.
1. Download the repository (`git clone --depth=1 https://github.com/Firefund/styleguide.git`) and cd into the styleguide folder.
2. `npm i` - download the node packages that we depend on.
3. `npm run kalei`
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