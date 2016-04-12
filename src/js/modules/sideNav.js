'use strict';

var Laced = window.Laced || {};
window.Laced = Laced;

var sideNav = Laced.sideNav || {};
Laced.sideNav = sideNav;

(function (me) {


	//public
	me.toggle = toggle;

	//private
	

	//////////

	function toggle(selector){
		//get the sideNav
		document.querySelector(selector).classList.toggle('open');
	}

})(sideNav);