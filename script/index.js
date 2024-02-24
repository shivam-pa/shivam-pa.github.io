/* Auto Collaps of sidebar */

$(document).ready(function(){
    $("#sidebar #toggle-btn-container").click(function(){
        $("#sidebar").toggleClass("opened");
    });

    $("#sidebar").click(function(e){
        e.stopPropagation();
    });

    $("body, html").click(function(){
        $("#sidebar").removeClass("opened");
    });
});


$(window).scroll(function(){

    //scroll top btn
    if($(window).width() > 767) {
		if ($(this).scrollTop() > 600) {
			$('#scroll-top').fadeIn(300);
		} else {
			$('#scroll-top').fadeOut(300);
		}		
    }
    
    //change active class of sidebar item
    var currScroll = window.pageYOffset;

    $(".menu-container li").each(function(){
        var elePos = $($(this).find('a')[0].hash).offset().top;
        var eleHeight = $($(this).find('a')[0].hash).height();
        // console.log($(this).find('a')[0].hash + " " + elePos + " " + eleHeight);

        if(elePos-20 < currScroll && elePos + eleHeight -20 > currScroll){
            // console.log($(this).find('a')[0].hash);
            $(".menu-container li").each(function(){
                $(this).removeClass('active');
            })
            $(this).addClass('active');
        }
    });
});

//change active class of sidebar item and scroll to that position

$(".menu-container li").on('click', function(e){
    e.preventDefault();
    
    $(".menu-container li").each(function(){
        $(this).removeClass('active');
    })
    
    $(this).addClass('active');

    $(window).scrollTop($($(this).find('a')[0].hash).offset().top);

})

//scroll to top btn working

$("#scroll-top").on('click', function(e){
    e.preventDefault();
    $(window).scrollTop(0);
})

//send message

$("#sendMsg").on('click', function(e){
    e.preventDefault();

    //validate form

    var data = {
        'name' : $("input[name='name']").val(),
        'email' : $("input[name='email']").val(),
        'msg' : $("textarea[name='msg']").val(),
    }

    if(!verifyData(data)){
        console.log("invalid data");
        return;
    }

    var url = "https://script.google.com/macros/s/AKfycbxMgbp8voLGdlr4ZiTo2yAMtBott-yV6IX5KtZ4Idbyl5yyBLY-/exec";
    var jqxhr = $.ajax({
        url: url,
        method: "POST",
        dataType: "json",
        data: data,
        success: function(response){
          successResponse(response);
        },
        error: function(response){
            errorResponse(response);
        }
      });
    
      console.log("Request send");
})

var successResponse = function(data){
    clearContactMeForm();
    $('.successMsgToast').toast('show');
}

var errorResponse = function(response){
    $('.errorMsgToast').toast('show');
}

var clearContactMeForm = function(){
    // $("input[name='name']").val("");
    // $("input[name='email']").val("");
    // $("textarea[name='msg']").val("");
    $("#contactMeForm")[0].reset();
    
}

var verifyData = function(data){
    if(data['name'] == "" || data['email'] == "" || data['msg'] == null){
        $('.nullDataToast').toast('show');
        return false;
    }
    if(!(/^[!#$%&'*+-\/=?^_`{|}~0-9a-zA-Z]+[@][0-9a-zA-Z]+[.][0-9a-zA-Z.]+$/.test(data['email']))){
        $('.invalidEmailToast').toast('show');
        return false;
    }
    return true;
}