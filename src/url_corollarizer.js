"use strict";
function url_corollarizer(iCorollaryChoice) {
	const globalWinObj = self; // TODO sniff out if a mocked self has been supplied, otherwise use 'window' as is normal.
	const choices = ["www.bl.uk", "v19b-content1.bl.uk", "v19b-content2.bl.uk", "v19b-fe1.dmz.bl.uk", "v19b-fe2.dmz.bl.uk" ,
					"v19b-fenle1.dmz.bl.uk", "v19b-fenle2.dmz.bl.uk",
					"v19b-fenle3.dmz.bl.uk", "v19b-fenle4.dmz.bl.uk"];
    if (iCorollaryChoice && (iCorollaryChoice < 0 || iCorollaryChoice > choices.length)) { return -1; }
	if (!iCorollaryChoice) {
		let promptMsg = "Enter the corollary of this page to go to\n\
		1) LIVE www.bl.uk \n\
        2) v19b-content1.bl.uk \n\
        3) v19b-content2.bl.uk \n\
        4) v19b-fe1.dmz.bl.uk \n\
        5) v19b-fe2.dmz.bl.uk \n\n\
        6) v19b-fenle1.dmz.bl.uk \n\
        7) v19b-fenle2.dmz.bl.uk \n\n\
        8) v19b-fenle3.dmz.bl.uk \n\
        9) v19b-fenle4.dmz.bl.uk";
		while (!iCorollaryChoice || (iCorollaryChoice < 0 || iCorollaryChoice > choices.length)) {
			iCorollaryChoice = prompt(promptMsg, "");
			if (iCorollaryChoice === null) {
				blinkWarn();
				return -1;
			}
		}
	}
	const currUrl = globalWinObj.location.href;
	const newUrl = currUrl.replace(/:\/\/([^:/]*)/g, "://" + choices[iCorollaryChoice-1]);
	globalWinObj.location.href = newUrl;
	return newUrl;
}

function blinkWarn() {
	const ua = navigator.userAgent;
	const isIEorEdge = ua.indexOf("Edg") > -1 || ua.indexOf("MSIE ") > -1 || /Edge/.test(ua);
	let bgColor = window.getComputedStyle(document.body).getPropertyValue("background-color");
	let bgColorRGBonly = bgColor;
	let arrRGB = [];
	if (isIEorEdge && (bgColor == 'rgba(0, 0, 0, 0)' || bgColor == 'transparent')) {   
		bgColorRGBonly = 'rgb(255, 255, 255)';
	}
	arrRGB = bgColorRGBonly.match(/\d{1,3}(?:\,)|\d{1,3}/g);
	if (arrRGB !== null) {
	  arrRGB = arrRGB.map(function(item) {
		  let colourVal = Math.abs(parseInt(item) - 255 % 256);
		  return colourVal; });
	}
	const allEqual = arrRGB.every( function(arrayItem) { return arrayItem === arrRGB[0] });
	if (allEqual && arrRGB[0] > 64 && arrRGB[0] < 192) { arrRGB[0] = arrRGB[0] < 128 ? 0 : 255; } //deal with greys as they don't invert very strikingly
	document.body.style.backgroundColor = 'rgb(' + arrRGB.join(',') + ')'
	setTimeout(function() {document.body.style.backgroundColor = bgColor !== bgColorRGBonly ? bgColor : bgColorRGBonly} ,300)
}
