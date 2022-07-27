"use strict";
/* Unit Tests Below */
/* Use Jasmine assert framework to supply BDD-style vocabularly */


describe('Curl Command Generator', function() {
  let IFrWrap = null;
  let sel = null;
  let frame = null;
  
  beforeEach(function() {
	IFrWrap = document.createElement("DIV");
	IFrWrap.innerHTML = '<iframe id="testFrame" title="." width="500" height="50"></iframe>';
	const el = document.createElement("span");
	el.setAttribute("id", "selectedTextFixture");
	el.innerHTML = "https://www.bl.uk/events/Medusas%20Story";
	document.body.appendChild(IFrWrap);
	frame = window.frames[0]
	const d = frame.document;
    d.body.appendChild(el);
	const range = d.createRange();
    range.selectNodeContents(el);
    sel = window.frames[0].getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  });

  it('should be able to pick up some text that is currently selected', function () {
	sel.removeAllRanges();
	const range = frame.document.createRange();
	const el = frame.document.getElementById("selectedTextFixture");
	el.innerHTML = "This is selected text";
    range.selectNodeContents(el);
	sel.addRange(range);
    expect("This is selected text").toEqual(ccg(frame));
   });
  it('should return empty string if it ccouldn\t pick up any text', function () {
	sel.removeAllRanges();
	expect("").toEqual(ccg(frame));
  });
  it('should detect a selected URL and process it so it is not just the same string returned back', function () {
    const elContainingSelected = frame.document.getElementById("selectedTextFixture");
	const url = "http://www.x.com/";
	expect(elContainingSelected.innerHTML=url).toEqual(url);
	sel.removeAllRanges();
	const range = frame.document.createRange();
    range.selectNodeContents(elContainingSelected);
	sel.addRange(range);	
	expect(url).not.toEqual(ccg(frame));
  });
  it('should roll a picked up URL into a curl command', function () {
	expect("curl -I -X DELETE \"https://www.bl.uk/events/Medusas%20Story\"").toEqual(ccg(frame));
  });
  afterEach(function() {
	sel.removeAllRanges();
	document.body.removeChild(IFrWrap);
	sel = null;
	IFrWrap = null;
  });
});

describe('URL Corollarizer', function() { 
  const oldSelf = self;
  
  beforeEach(function() {
	self = {location: {}};
	Object.defineProperty(self.location, 'href', {value: "https://www.bl.uk/collection-guides/news-data", writable: true, configurable: true});
  });
  it('should be defined', function () {
	  expect(url_corollarizer).toBeDefined();
  });
  xit('should be able to distinguish between a mocked global object, \"self\" (synonym of \"window\") and browser native version', function () {
	//expect(void(0)).toBeDefined();
   });
  it('should redirect to \"v19b-content1.bl.uk\" when option 1 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(1);
	const expected = "https://v19b-content1.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  });
  it('should redirect to \"v19b-content1.bl.uk\" when option 1 chosen (HTTP redirect)', function () {
	self.location.href = "http://www.bl.uk/collection-guides/news-data";
	const rewrittenUrlCorollary =  url_corollarizer(1);
	const expected = "http://v19b-content1.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  });
  it('should retain the port in the source URL as it redirects to \"v19b-content1.bl.uk\" when option 1 chosen (HTTPS redirect)', function () {
	self.location.href = "https://www.bl.uk:80/collection-guides/news-data";
	const rewrittenUrlCorollary =  url_corollarizer(1);
	const expected = "https://v19b-content1.bl.uk:80/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  });
  it('should retain the port in the source URL as it redirects to \"v19b-content1.bl.uk\" when option 1 chosen (HTTP redirect)', function () {
	self.location.href = "http://www.bl.uk:80/collection-guides/news-data";
	const rewrittenUrlCorollary =  url_corollarizer(1);
	const expected = "http://v19b-content1.bl.uk:80/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 2 BELOW
  it('should redirect to \"v19b-fe1.dmz.bl.uk\" when option 2 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(2);
	const expected = "https://v19b-fe1.dmz.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 3 BELOW
  it('should redirect to \"v19b-fe2.dmz.bl.uk\" when option 3 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(3);
	const expected = "https://v19b-fe2.dmz.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 4 BELOW
  it('should redirect to \"v19b-fenle1.dmz.bl.uk\" when option 4 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(4);
	const expected = "https://v19b-fenle1.dmz.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 5 BELOW
  it('should redirect to \"v19b-fenle2.dmz.bl.uk\" when option 5 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(5);
	const expected = "https://v19b-fenle2.dmz.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 6 BELOW
  it('should redirect to \"v19b-dev-fe1.ad.bl.uk\" when option 6 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(6);
	const expected = "https://v19b-dev-fe1.ad.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 7 BELOW
  it('should redirect to \"v19b-dev-fe2.ad.bl.uk\" when option 7 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(7);
	const expected = "https://v19b-dev-fe2.ad.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 8 BELOW
  it('should redirect to \"v19b-fenle3.dmz.bl.uk\" when option 8 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(8);
	const expected = "https://v19b-fenle3.dmz.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 9 BELOW
  it('should redirect to \"v19b-fenle4.dmz.bl.uk\" when option 9 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(9);
	const expected = "https://v19b-fenle4.dmz.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 10 BELOW
  it('should redirect to \"v19b-dev-fe2.ad.bl.uk\" when option 10 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(10);
	const expected = "https://v19b-dev-fe2.ad.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 11 BELOW
  it('should redirect to \"v19b-manage.ad.bl.uk\" when option 11 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(11);
	const expected = "https://v19b-manage.ad.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  }); // OPTION 12 BELOW
  it('should redirect to \"www.bl.uk\" when option 12 chosen (HTTPS redirect)', function () {
	const rewrittenUrlCorollary =  url_corollarizer(12);
	const expected = "https://www.bl.uk/collection-guides/news-data";
	expect(rewrittenUrlCorollary).toEqual(expected);
	expect(self.location.href).toEqual(expected);
  });
  it('should return an error -1 code if an out-of-bounds corollary Url choice arg number supplied', function () {
	expect(url_corollarizer(-1)).toEqual(-1);
	expect(url_corollarizer(Number.POSITIVE_INFINITY)).toEqual(-1);
  });
  afterEach(function() {
	self = window;
  });
});