"use strict";
/* Unit Tests Below */
/* Use Jasmine assert framework to supply BDD-style vocabularly */


describe('Date Mock', function() {
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
	expect(elContainingSelected.innerHTML="https://www.x.com/").toEqual("https://www.x.com/");
	sel.removeAllRanges();
	const range = frame.document.createRange();
    range.selectNodeContents(elContainingSelected);
	sel.addRange(range);	
	expect("https://www.x.com/").not.toEqual(ccg(frame));
  });

  afterEach(function() {
	sel.removeAllRanges();
	document.body.removeChild(IFrWrap);
	sel = null;
	IFrWrap = null;
  });

});
