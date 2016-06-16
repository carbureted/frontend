(function() {
	var webComponentsSupported = ('registerElement' in document
		&& 'import' in document.createElement('link')
		&& 'content' in document.createElement('template'))

	if (!webComponentsSupported) {
		var wcPoly = document.createElement('script')
		wcPoly.src = '../lib/webcomponents.js' // TODO: change to webcomponents-lite.min.js
		wcPoly.onload = finishLazyLoading
		document.head.appendChild(wcPoly)
	} else {
		finishLazyLoading()
	}

	function finishLazyLoading () {
		// Set up the element imports.
		window.Polymer = window.Polymer || {}
		// shadow dom can NOT be used because we load external css to style our web components
		// window.Polymer.dom = 'shadow'

		var imports = Array.prototype.slice.call(document.querySelectorAll(".f-import"), 0)

		var loaded = downloads(imports, hideSplash, function predicate(url, list, startListLength) {
			if(list.indexOf(url) === -1) throw new Error("Unknown url: " + url)
			list.splice( list.indexOf(url), 1 )
			return list.length < startListLength / 2 // true when half is loaded
		})
		
		if(imports.length === 0)
			hideSplash() // hide splash now if there is zero web components

		imports.forEach(function(link) {
			if(link.import && link.import.readyState === "complete") loaded(link.href)
			else link.addEventListener("load", loaded(link.href))
		})

		// var elements = [
		// 	'/wc/header.htm'
		// ]
		// elements.forEach(function(elementURL) {

		// 	var elImport = document.createElement('link')
		// 	elImport.rel = 'import'
		// 	elImport.href = elementURL

		// 	document.head.appendChild(elImport)
		// })
	}
	
	function downloads(list, doFunction, predicate) {
		// var urlParser = document.createElement('a')
		var urls = list.map(function(link) { return link.href })
		var downloads = urls.length

		return function loaded(url) {
			// urlParser.href = url
			// urlParser.pathname
			// console.log(url)
			if( predicate(url, urls, downloads) )
				doFunction()
		}
	}

	function hideSplash() {
		var splash = document.querySelector(".f-splash_loading")
		if(!splash) return
		if(splash.classList.contains('f-splash_dont-hide')) return
		splash
			.addEventListener("transitionend", removeSplash)
		splash
			.classList
			.remove("f-splash_loading")

		// add timer to remove splash if transitionend is not fired
		setTimeout(removeSplash, 2000)
		
		function removeSplash() {
			if(splash.parentElement == document.body)
				document.body.removeChild(splash)
		}
	}

}())