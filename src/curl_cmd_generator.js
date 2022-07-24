"use strict";
function ccg(win) {
	win = win || window;
	const sel = win.getSelection();
	const reExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
	if (reExp.test(sel)) {
		let url = String.prototype.trim.call(sel);
		if (url.indexOf("http")) { url = "https://" + url; }
		url = `curl -I -X DELETE "${url}"`;
		if (window.location.href.indexOf('SpecRunner.html') < 0) {
			prompt('Select all the text below, \ncopy it to your clipboard and ...\npaste into a Windows command line', url);
		}
		return url;
	}
	return sel.toString();
}