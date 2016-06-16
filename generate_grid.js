"use strict"
/**
 * Naive grid generator - creates rows with cells that can be pushed
 * to different start positions.
 * Based on lost: https://github.com/peterramsing/lost#readme
 * TODO: Refactor to combine classes that does the same
 * 	E.g. These 3 declaration blocks are identical:
 * ```css
	.f-row_6 .f-row__cell_3 {
		lost-cell: 3/6 flex;
	}
	.f-row_12 .f-row__cell_6 {
		lost-cell: 6/12 flex;
	}
	```
 */

/** nth take a selector as list and a declaration as list
 * and combine them while inserting n in null positions
 * [a] -> [a] -> b -> c
 * @param {string[]} css
 * @param {number} n
 * @returns {string}
*/
const nth = (css, n) =>
	css.map(a => a === placeholders.cellNumber ? n : a).join("")

const replace = (list, predicate, r) =>
	list.map(a => a === predicate ? r : a)
/**
 * @param {string[]} selector
 * @param [string[]] declaration
 * @param {number} cells
 */
const generator = (selector, declaration, cells, f = nth) => {
	const output = []
	const Rselector = replace(selector, placeholders.rowNumber, cells)
	const Rdeclaration = replace(declaration, placeholders.rowNumber, cells)
	for (let n = 1; n < cells; n++) {		
		output.push( f([...Rselector, ...Rdeclaration], n) )
	}
	return output.join("	")
}

// const types = {
// 	rowNumber: "★",
// 	cellNumber: "Ⓐ"
// }
const placeholders = {
	rowNumber: Symbol("rowNumber"),
	cellNumber: Symbol("cellNumber")
}

const startBracket = " {\r\n"
const endBracket = "\r\n}\r\n"

const cellSelector = [
	".f-row_",
	placeholders.rowNumber,
	" .f-row__cell-",
	placeholders.cellNumber
]
const pushSelector = [
	".f-row_",
	placeholders.rowNumber,
	" .f-row__cell_push_",
	placeholders.cellNumber
]
const mobileCellSelector = [
	".f-row_",
	placeholders.rowNumber,
	" .f-row__cell-mobile-",
	placeholders.cellNumber
]
const mobilePushSelector = [
	".f-row_",
	placeholders.rowNumber,
	" .f-row__cell-mobile_push_",
	placeholders.cellNumber
]
const widthDeclaration = [
	startBracket,
	"\tlost-column: ",
	placeholders.cellNumber,
	"/",
	placeholders.rowNumber,
	" flex;",
	endBracket
]
const pushDeclaration = [
	startBracket,
	"\tlost-offset: -",
	placeholders.cellNumber,
	"/",
	placeholders.rowNumber,
	";",
	endBracket
]

const columnSelector = [
	".f-column_",
	placeholders.cellNumber,
	" > *"
]
const mobileColumnSelector = [
	".f-column_mobile_",
	placeholders.cellNumber,
	" > *"
]
const columnDeclaration = [
	startBracket,
	"\tlost-column: 1/",
	placeholders.cellNumber,
	" ",
	placeholders.cellNumber,
	" flex;",
	endBracket
]

const grid_6 = generator(cellSelector, widthDeclaration, 6)
const pushGrid_6 = generator(pushSelector, pushDeclaration, 6)
const gridMobile_6 = generator(mobileCellSelector, widthDeclaration, 6)
const pushGridMobile_6 = generator(mobilePushSelector, pushDeclaration, 6)

const grid_12 = generator(cellSelector, widthDeclaration, 12)
const pushGrid_12 = generator(pushSelector, pushDeclaration, 12)
const gridMobile_12 = generator(mobileCellSelector, widthDeclaration, 12)
const pushGridMobile_12 = generator(mobilePushSelector, pushDeclaration, 12)

const columnGridNth = (css, n) =>
		css.map(a => a === placeholders.cellNumber ? n+1 : a).join("")
const columnGrid_6 = generator(columnSelector, columnDeclaration,	6, columnGridNth)
const columnMobileGrid_6 = generator(mobileColumnSelector, columnDeclaration, 6, columnGridNth)

console.log(`
@lost gutter 3.4rem;

.f-row {
	lost-flex-container: row;
	width: 100%;
}

/* f-row_reverse is implemented extremely hacky to override *lost* margins */
.f-row_reverse {
	flex-direction: row-reverse;
}
.f-row_reverse [class^="f-row__cell"],
.f-row_reverse [class*="f-row__cell"] {
	margin-left: var(--gutter-width, 3.4rem)!important;
	margin-right: 0!important;
}
.f-row_reverse [class^="f-row__cell"]:last-child,
.f-row_reverse [class*="f-row__cell"]:last-child {
	margin-left: 0!important;
}
.f-row_reverse [class^="f-row__cell"]:first-child,
.f-row_reverse [class*="f-row__cell"]:first-child {
	margin-right: 0!important;
}

.f-row::after {
	lost-utility: clearfix;
}

.f-row_debug, .f-row_debug > * {
	border: 1px dashed cyan;
}

.f-row__cell {
  lost-column: 1 flex;
}

.f-column {
	lost-flex-container: row;
	width: 100%;
	justify-content: space-between;
}

/*FIXME: serious hack to get flexbox working with lost - investigate 13-05-2016 
[class^="f-column_"] > *,
[class*=" f-column_"] > * {
	margin-right: 0!important;
	margin-left: 0!important;
}*/

${columnGrid_6}

@media screen and (--viewport-desktop) {
	.f-row_not-desktop, .f-row__not-desktop { display: none !important; }
	
	${pushGrid_12}
	${pushGrid_6}
}

${grid_12}

${grid_6}

/*
 ## mobile
*/
@media screen and (--viewport-mobile) {
  .f-row_not-mobile, .f-row__not-mobile { display: none !important; }

	.f-row__cell-mobile { lost-column: 1 flex!important; }

	${gridMobile_12}
	${pushGridMobile_12}

	${gridMobile_6}
	${pushGridMobile_6}

	${columnMobileGrid_6}
}
`)
