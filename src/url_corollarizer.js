"use strict";
function url_corollarizer(iCorollaryChoice) {
	const globalWinObj = self; // TODO sniff out if a mocked self has been supplied, otherwise use 'window' as is normal.
	const choices = ["v19b-content1.bl.uk", "v19b-fe1.dmz.bl.uk", "v19b-fe2.dmz.bl.uk" , "v19b-fenle1.dmz.bl.uk",
				"v19b-fenle2.dmz.bl.uk", "v19b-dev-fe1.ad.bl.uk", "v19b-dev-fe2.ad.bl.uk",
				"v19b-fenle3.dmz.bl.uk", "v19b-fenle4.dmz.bl.uk", "v19b-dev-fe2.ad.bl.uk", "v19b-manage.ad.bl.uk",
				"www.bl.uk"];
    if (iCorollaryChoice && (iCorollaryChoice < 0 || iCorollaryChoice > choices.length)) { return -1; }
	if (!iCorollaryChoice) {
		let promptMsg = "Enter the corollary of this page to go to\n\
        1) v19b-content1.bl.uk \n\
        2) v19b-fe1.dmz.bl.uk \n\
        3) v19b-fe2.dmz.bl.uk \n\n\
        4) v19b-fenle1.dmz.bl.uk \n\
        5) v19b-fenle2.dmz.bl.uk \n\n\
        6) v19b-dev-fe1.ad.bl.uk \n\
        7) v19b-dev-fe2.ad.bl.uk \n\n\
        8) v19b-fenle3.dmz.bl.uk \n\
        9) v19b-fenle4.dmz.bl.uk \n\
        10) v19b-dev-fe2.ad.bl.uk \n\
        11) v19b-manage.ad.bl.uk \n\n\
        12) LIVE www.bl.uk";
		while (!iCorollaryChoice || (iCorollaryChoice < 0 || iCorollaryChoice > choices.length)) {
			iCorollaryChoice = prompt(promptMsg, "");
		}
	}
	const currUrl = globalWinObj.location.href;
	const newUrl = currUrl.replace(/:\/\/([^:/]*)/g, "://" + choices[iCorollaryChoice-1]);
	globalWinObj.location.href = newUrl;
	return newUrl;
}
