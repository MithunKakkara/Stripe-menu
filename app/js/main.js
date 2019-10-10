
const menu = 	{
		"Products":
		[
			{
				name:"Payments",
				discription:"Full platform for online payments"
			},
			{
				name:"Billing",
				discription:"Smart invoicing & subscription management"
			},
			{
				name:"Connect",
				discription:"Multi-party payments for platforms & marketplaces"
			}
		],
		"Developers":[
			"Prebuilt checkout","Libraries and SDKs","Plugins","Code samples"
		],
		"Company":[
				{name:"about"},
				{name:"customer"},
				{name:"jobs"},
		]
}
jQuery(document).ready(function($){
	getMenu();
	function morphDropdown( element ) {
		this.element = element;
		this.mainNavigation = this.element.find('.main-nav');
		this.mainNavigationItems = this.mainNavigation.find('.has-dropdown');
		this.dropdownList = this.element.find('.dropdown-list');
		this.dropdownWrappers = this.dropdownList.find('.dropdown');
		this.dropdownItems = this.dropdownList.find('.content');
		this.dropdownBg = this.dropdownList.find('.bg-layer');
		this.mq = this.checkMq();
		this.bindEvents();
	}

	morphDropdown.prototype.checkMq = function() {
		//check screen size
		var self = this;
		return window.getComputedStyle(self.element.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
	};

	morphDropdown.prototype.bindEvents = function() {
		var self = this;
		//hover over an item in the main navigation
		this.mainNavigationItems.mouseenter(function(event){
			//hover over one of the nav items -> show dropdown
			self.showDropdown($(this));

		})
		.mousemove( function(){
			console.log(this)
		})
		.mouseleave(function(){
			// setTimeout(function(){
				//if not hovering over a nav item or a dropdown -> hide dropdown
				if( self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) self.hideDropdown();
			// }, 50);
		});
		
		//hover over the dropdown
		this.dropdownList.mouseleave(function(){
			// setTimeout(function(){
				//if not hovering over a dropdown or a nav item -> hide dropdown
				(self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) && self.hideDropdown();
			// }, 50);
		});

		//click on an item in the main navigation -> open a dropdown on a touch device
		this.mainNavigationItems.on('touchstart', function(event){
			var selectedDropdown = self.dropdownList.find('#'+$(this).data('content'));
			if( !self.element.hasClass('is-dropdown-visible') || !selectedDropdown.hasClass('active') ) {
				event.preventDefault();
				self.showDropdown($(this));
			}
		});

		//on small screens, open navigation clicking on the menu icon
		this.element.on('click', '.nav-trigger', function(event){
			event.preventDefault();
			self.element.toggleClass('nav-open');
		});
	};

	morphDropdown.prototype.showDropdown = function(item) {
		this.mq = this.checkMq();
		if( this.mq == 'desktop') {
			var self = this;
			var selectedDropdown = this.dropdownList.find('#'+item.data('content')),
				selectedDropdownHeight = selectedDropdown.innerHeight(),
				selectedDropdownWidth = selectedDropdown.children('.content').innerWidth(),
				selectedDropdownLeft = item.offset().left + item.innerWidth()/2 - selectedDropdownWidth/2;

			//update dropdown position and size
			this.updateDropdown(selectedDropdown, parseInt(selectedDropdownHeight), selectedDropdownWidth, parseInt(selectedDropdownLeft));
			//add active class to the proper dropdown item
			this.element.find('.active').removeClass('active');
			selectedDropdown.addClass('active').removeClass('move-left move-right').prevAll().addClass('move-left').end().nextAll().addClass('move-right');
			item.addClass('active');
			//show the dropdown wrapper if not visible yet
			if( !this.element.hasClass('is-dropdown-visible') ) {
				setTimeout(function(){
					self.element.addClass('is-dropdown-visible');
				}, 10);
			}
		}
	};

	morphDropdown.prototype.updateDropdown = function(dropdownItem, height, width, left) {
		this.dropdownList.css({
		    '-moz-transform': 'translateX(' + left + 'px)',
		    '-webkit-transform': 'translateX(' + left + 'px)',
			'-ms-transform': 'translateX(' + left + 'px)',
			'-o-transform': 'translateX(' + left + 'px)',
			'transform': 'translateX(' + left + 'px)',
			'width': width+'px',
			'height': height+'px'
		});

		this.dropdownBg.css({
			'height':height ,
		    'width':  width
		});
	};

	morphDropdown.prototype.hideDropdown = function() {
		this.mq = this.checkMq();
		if( this.mq == 'desktop') {
			this.element.removeClass('is-dropdown-visible').find('.active').removeClass('active').end().find('.move-left').removeClass('move-left').end().find('.move-right').removeClass('move-right');
		}
	};

	morphDropdown.prototype.resetDropdown = function() {
		this.mq = this.checkMq();
		if( this.mq == 'mobile') {
			this.dropdownList.removeAttr('style');
		}
	};

	var morphDropdowns = [];
	if( $('.cd-morph-dropdown').length > 0 ) {
		$('.cd-morph-dropdown').each(function(){
			//create a morphDropdown object for each .cd-morph-dropdown
			morphDropdowns.push(new morphDropdown($(this)));
		});

		var resizing = false;

		//on resize, reset dropdown style property
		updateDropdownPosition();
		$(window).on('resize', function(){
			if( !resizing ) {
				resizing =  true;
				(!window.requestAnimationFrame) ? setTimeout(updateDropdownPosition, 300) : window.requestAnimationFrame(updateDropdownPosition);
			}
		});

		function updateDropdownPosition() {
			morphDropdowns.forEach(function(element){
				element.resetDropdown();
			});

			resizing = false;
		};
	}
});

function getMenu(){
	// $.ajax({
    //     type: "GET",
    //     // url: "https://jsonblob.com/api/jsonBlob/6766327f-607d-11e9-95ef-9bcb815ba4a4",
    //     success: function(response) {
    //         if(response == "Successful")
    //         {
    //             $('form').removeAttr('onsubmit'); // prevent endless loop
    //             $('form').submit();
    //         }
    //     }
	// });
	let mainNavigation = $('#mainNav');
	let dropDownList = $('#dropDownList');
	let mainHeadr = Object.keys(menu); 
	let navHtml = '';
	mainHeadr.forEach(value=>{
		navHtml += " <li class='has-dropdown "+value+"' data-content='"+value+"'><a href='#0'>"+value+"</a></li>";
	})
	let Products = menu.Products;
	let productHtml = '<li id="Products" class="dropdown gallery"><a href="#0" class="label">Products</a> <div class="content">	<ul>';
	Products.map((value,index)=>{
		productHtml += '<li><a href="#0"> <em>'+value.name+'</em><span>'+value.discription+'</span></a> </li>';
	})
	let Developers = menu.Developers;
	let DevelopersHtml = '<li id="Developers" class="dropdown links"><a href="#0" class="label">Developers</a> <div class="content">	<ul>';
	Developers.forEach((value,index)=>{
		console.log(value)
		DevelopersHtml += '<li><a href="#0"> <em>'+value+'</em><span>'+value+'</span></a> </li>';
	})
	let Company = menu.Company;
	let CompanyHtml = '<li id="Company" class="dropdown button"><a href="#0" class="label">Company</a> <div class="content">	<ul>';
	Company.forEach((value,index)=>{
		console.log(value)
		CompanyHtml += '<li><a href="#0"> <em>'+value.name+'</em><span>'+value.name+'</span></a></li>';
	})
	mainNavigation.html('<ul>'+navHtml+'</ul>')
	dropDownList.html(productHtml+'</ul></div></li>'+DevelopersHtml+'</ul></div></li>'+CompanyHtml+'</ul></div></li>')
}