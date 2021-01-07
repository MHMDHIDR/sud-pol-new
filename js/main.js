jQuery(document).ready(function( $ ) {

  // Smooth scroll for the menu and links with .scrollto classes
  $('.smoothscroll').on('click', function(e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {

        $('html, body').animate({
          scrollTop: target.offset().top - 48
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Nav bar
  $(".navbar-collapse a").on('click', function() {
    $(".navbar-collapse.collapse").removeClass('in');
  });

  // Get the form.
  var form = $('#contactUsForm');

  // Get the messages div.
  var formMessages = $('#form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })

    .done(function(response) {
      // // Make sure that the formMessages div has the 'success' class.
      // $(formMessages).removeClass('error');
      // $(formMessages).addClass('success');

      // // Set the message text.
      // $(formMessages).text(response);

      $('.loading').slideDown(400);
      $('.loading').slideUp(400);
      $('.sent-message').slideDown(2000);


      // Clear the form.
      $('.name').val('');
      $('.email').val('');
      $('.subject').val('');
      $('.message').val('');
    })
    
    .fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      $(formMessages).removeClass('success');
      $(formMessages).addClass('error');

      // Set the message text.
      if (data.responseText !== '') {
        $(formMessages).text(data.responseText);
      } else {
        $(formMessages).text('عفوًا! يبدو أنه يوجد خطأ ما، لم يتم ارسال الرسالة بنجاح');
      }
    });
  });

  $('a#myModalBtn').click((e) => {
    // modal-btn clicked
    let modelImgSrc = e.target.parentElement.previousSibling.previousSibling.currentSrc;
    $('#myModal').find('.img-responsive').attr("src", modelImgSrc);
  }) 

  // Back to Top
  $(window).scroll(function () {
		if($(this).scrollTop() > 1200) {
			// Show
			$('.back-top').fadeIn(300);
		} else {
			// Hide
			$('.back-top').fadeOut(300);
		}
  });
  
	// Back to Top Click
	$('.back-top').click(function (event) {
		$('html, body').animate({scrollTop: 0}, 600);
	});
});
