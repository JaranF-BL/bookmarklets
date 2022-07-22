"use strict";
/* Unit Tests Below */
/* Use Jasmine assert framework to supply BDD-style vocabularly */


describe('Date Mock', function() {
    let IFrWrap = null;
	let d = null;
	let sel = null;
	
  beforeEach(function() {
	
	IFrWrap = document.createElement("DIV");
	IFrWrap.innerHTML = '<iframe id="testFrame" title="." width="500" height="50"></iframe>';

    const el = document.createElement("span");
	el.innerHTML = "This is some text";
	document.body.appendChild(IFrWrap);
	d = window.frames[0].document;
    d.body.appendChild(el);
	const range = d.createRange();
    range.selectNodeContents(el);
    sel = window.frames[0].getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
	//console.dir(wrapper);
  });
  
  it('should run one mock test', function() {
    expect(1).toEqual(1);
  });
  
  afterEach(function() {
	  sel.removeAllRanges();
	  document.body.removeChild(IFrWrap);
	  sel = null;
	  IFrWrap = null;
  });

});
