$( document ).ready(function() {
$(function() {
   $(".gender-btn").click(function() {
      // remove classes from all
      $(".gender-btn").removeClass("gender-active");
      // add class to the one we clicked
      $(this).addClass("gender-active");
   });
});




});

/***************Next***********************/

// $(document).ready(function() {
// $('.next').click(function(){
//    $(this).parent().hide().next().show();//hide parent and show next
// });

// $('.back').click(function(){
//    $(this).parent().hide().prev().show();//hide parent and show previous
// });
// });


/***************Tab***********************/
$(document).ready(function () {
    $('.form-tab').tabify();

});


/***************Scroll***********************/

$(document).ready(function() {

    $('.back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });

});



/*******************Phot0-collasp**********************/


$(document).ready(function() {

   $(".downarrow-mobile1 a").click(function(){
  $(".photo-row1").find("ul").slideToggle("slow");
   $(this).find(".fa-caret-down").toggleClass("fa-caret-up");
	
 });

});


$(document).ready(function() {

   $(".downarrow-mobile2 a").click(function(){
  $(".photo-row2").find("ul").slideToggle("slow");
   $(this).find(".fa-caret-down").toggleClass("fa-caret-up");
});
});


$(document).ready(function() {

   $(".downarrow-mobile3 a").click(function(){
  $(".photo-row3").find("ul").slideToggle("slow");
   $(this).find(".fa-caret-down").toggleClass("fa-caret-up");
});
});

$(document).ready(function() {

   $(".downarrow-mobile4 a").click(function(){
  $(".photo-row4").find("ul").slideToggle("slow");
   $(this).find(".fa-caret-down").toggleClass("fa-caret-up");
});
});



/*******************Editopp**********************/

						   


$(document).ready(function() {
//  $(".photo-edit-outer .photo-edit-icon").click(function(){

//  $(this).siblings(".edit-popup-photo-vid").toggle();
//  });
 
//  $(".photo-edit-icon").click(function(){
 
//   $(this).toggleClass("photo-edit-icon-active");
 	
// 	});
	
	// $(".photo-row ul li").hover(function(){				   
	//  $(this).find(".photo-edit-outer").addClass("photo-popshow");
	 
	 
	//  });
 
 
//  $(".photo-edit-outer").click(function(e){
//     e.stopPropagation();
// });
 
 
 $(document).click(function(){
    //$(".photo-edit-outer").removeClass("photo-popshow");
	//$(".edit-popup-photo-vid").hide();
	//$(".photo-edit-icon").removeClass("photo-edit-icon-active");
});
 
 
 $(".private-btn").click(function(){
 $(this).toggleClass("save-btn");
 
});
 
});




/*******************Editopp**********************/
$(document).ready(function() {
// $(".personal-detail-tab-row ul li").click(function(){
//  $(this).toggleClass("detail-active");
 
// });
});
						   

/*******************Setting**********************/
// $(document).ready(function() {
// $(".more-setting-outer a").click(function(){
//  $(".more-setting-bot, .more-setting-top").toggle();
//  $(".fa-caret-down").toggleClass("fa-caret-up");
// });
// });



/*******************Load More**********************/

$(document).ready(function () {
    size_li = $("#myList3 li").size();
    x=1;
    $('#myList3 li:lt('+x+')').show();
    $('#loadMore3').click(function () {
        x= (x+1 <= size_li) ? x+1 : size_li;
        $('#myList3 li:lt('+x+')').show();
    });
    
});


$(document).ready(function () {
    size_li = $("#myList li").size();
    x=3;
    $('#myList li:lt('+x+')').show();
    $('#loadMore').click(function () {
        x= (x+2 <= size_li) ? x+2 : size_li;
        $('#myList li:lt('+x+')').show();
    });
    
});

$(document).ready(function () {
    size_li = $("#myList2 li").size();
    x=3;
    $('#myList2 li:lt('+x+')').show();
    $('#loadMore2').click(function () {
        x= (x+2 <= size_li) ? x+2 : size_li;
        $('#myList2 li:lt('+x+')').show();
    });
    
});



/***************Date-Time-picker***********************/

$(document).ready(function()
		{
			$('#date, #date2, #date3').bootstrapMaterialDatePicker
			({
				time: false,
				clearButton: true
			});

			$('#time, #time2').bootstrapMaterialDatePicker
			({
				date: false,
				shortTime: false,
				format: 'HH:mm'
			});

			
		});


/***************Animated-circle***********************/

$(document).ready(function(){
		$(".progress-bar").loading();
		$('input').on('click', function () {
			 $(".progress-bar").loading();
		});
		});






/***************Custom-seloect-box***********************/

$(document).ready(function() {
				enableSelectBoxes();
			});
			
			function enableSelectBoxes(){
				$('div.msg-top-box').each(function(){
					$(this).children('span.selected').html($(this).children('div.selectOptions').children('span.selectOption:first').html());
					$(this).attr('value',$(this).children('div.selectOptions').children('span.selectOption:first').attr('value'));
					
					$(this).children('span.selected,span.selectArrow').click(function(){
						if($(this).parent().children('div.selectOptions').css('display') == 'none'){
							$(this).parent().children('div.selectOptions').css('display','block');
						}
						else
						{
							$(this).parent().children('div.selectOptions').css('display','none');
						}
					});
					
					$(this).find('span.selectOption').click(function(){
						$(this).parent().css('display','none');
						$(this).closest('div.msg-top-box').attr('value',$(this).attr('value'));
						$(this).parent().siblings('span.selected').html($(this).html());
					});
				});				
			}



/***************Select-Delete***********************/


$(document).ready(function() {
var selectedScheme = 'value';

$('#color_scheme').change(function(){
    $('.msg-user-img img').removeClass(selectedScheme).addClass($(this).val());
    selectedScheme = $(this).val();
});

});



/*******************Delete-Message**********************/
$(document).ready(function() {
$(".msg-delete").click(function (e) {
    var a = $(this); // "this" is the <a>

     a.parents("li").fadeOut(function () {
                $(this).remove();
     });
 });
});




/***********************Profile-Gallery**********************/


// $(document).ready(function() {
// var $owl = $('.owl-carousel');

// $owl.children().each( function( index ) {
//   $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
// });

// $owl.owlCarousel({
//   center: true,
//   loop: true,
//   items:3,
// });

// $(document).on('click', '.owl-item>div', function() {
//   $owl.trigger('to.owl.carousel', $(this).data( 'position' ) );
// });});





/***********************More show**********************/

$(document).ready(function() {

$(".profile-more-btn").click(function() {

$(".profile-more-box").toggle();
	
					 
});


});




/*******************Delete-Message**********************/
$(document).ready(function() {
$(".profile-frnds-cross").click(function (e) {
    var a = $(this); // "this" is the <a>

     a.parents(".profile-right-friends-sec li").fadeOut(function () {
                $(this).remove();
     });
 });
});


/*******************Profile-Loadmore**********************/

$(function () {
    $(".profile-post-row").slice(0, 3).show();
    $("#loadMore-profile").on('click', function (e) {
        e.preventDefault();
        $(".profile-post-row:hidden").slice(0, 1).slideDown();
        if ($(".profile-post-row:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
       
    });
});





/*******************like-pop**********************/
$(document).ready(function() {
$(".prof-pop-icon-sec").hover(function() {
$(".like-popup").toggleClass("like-hover");					 
					 
					 
});

});




/***************Auto-Fill***********************/



function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}






$(document).ready(function() {

$("#myInput").click(function(){
$(".slimScrollDiv").show();


});

$("#myUL li").click(function(){
$(".slimScrollDiv").hide();




});

//WHEN YOU CLICK THE ELEMENT INSIDE THE BODY (THIS WILL HELP YOU IF YOU NEED TO CREATE MORE LI.INLINER ELEMENTS WITH JS, AJAX, OR WHATEVER...
$('#myUL li').on('click',function(){
//GET THE TEXT INSIDE THAT SPECIFIC LI
var content= $(this).text();
//PLACE THE TEXT INSIDE THE INPUT FIELD, YOU CAN CHANGE YOUR SELECTOR TO TARGET THE RIGHT INPUT
$('#myInput').val(content);
//HERE YOU CAN DO SOMETHING ELSE LIKE SIBMITING THE FORM, OR CLICK A BUTTON.. OR SOMETHING ELSE
  });

});


$(document).ready(function() {

$(".nearby-prople").click(function(){
//$(".near-by-pop-outer").show();
$(".near-by-pop-outer").toggleClass("friends-pop-display");


});

  $(".nearby-prople, .prog-circle-sec").click(function(e){
      e.stopPropagation();
});

 $(document).click(function(){
     $(".near-by-pop-outer").removeClass("friends-pop-display");
	 });

});



$(document).ready(function() {
$('.next-div-friends').click(function(){
   $(this).parent().hide().next().show();//hide parent and show next
});

});



$(document).ready(function() {
var fadeinBox = $("#box2");
var fadeoutBox = $("#box1");

$(".nearby-prople").click(function(){
function fade() {
    fadeinBox.stop(false).delay(3000).fadeIn(1000);
    fadeoutBox.stop(false).delay(3000).fadeOut(1000, function() {
        var temp = fadeinBox;
        fadeinBox = fadeoutBox;
        //fadeoutBox = temp;
       // setTimeout(fade, 100);
    });
}

fade();
});
});



$(document).ready(function(){

$(".msg-user-img a").click(function(){
     $(this).toggleClass("select-all-img-msg");
	 });
});