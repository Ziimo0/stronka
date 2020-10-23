var menu = 0;

$(document).ready(function() {
	$('.next').click(function(){ $('.carousel').carousel('next'); return false; });
    $('.prev').click(function(){ $('.carousel').carousel('prev'); return false; });

	$('#nav-toggle').click(function() {
		$(this).toggleClass('open');
		$('#nav-content').fadeToggle(250);
		
		
		menu += 1;
		if(menu > 1) menu = 0;
			
		switch(menu) {
			case 1:
				$("#nav-toggle span").css("box-shadow", "none");
				break;
			case 0:
				$("#nav-toggle span").css("box-shadow", "2px 2px 4px #000");
				break;
		}
	});
	
	$('a, button, .scroll').click(function(e) {
		var target = $(this.getAttribute('data-scroll'));
		
		if(target.length) {
			e.preventDefault();
			
			$('html, body').animate({
				scrollTop:$(target).offset().top + 'px'
			});
		}
		else {
			target = $(this.getAttribute('href'));

			if(target.length) {
				e.preventDefault();
			
				$('html, body').animate({
					scrollTop:$(target).offset().top + 'px'
				});
			}
		}
	});

	$('.copy').click(function(e) {
		 var $temp = $("<input>");
		  $("body").append($temp);
		  $temp.val($(this).text()).select();
		  document.execCommand("copy");
		  $temp.remove();
	});


	$('#send').submit(function(e) {
		e.preventDefault();

		$.ajax({
			url: 'email.php',
			method: 'POST',
			data: {
				'name': $('#send input[name=name]').val(),
				'email': $('#send input[name=email]').val(),
				'title': $('#send input[name=title]').val(),
				'content': $('#send textarea[name=content]').val()
			},
			success: function(data) {
				var response = JSON.parse(data);

				if(response['status']) {
					$('#send')[0].reset();
					$('#action-notice').html('<div class="notice-success"><div class="container">' + response['message'] + '</div></div>');
					$('#action-notice').slideToggle(500).delay(7000).slideToggle(500);
				}
				else {
					$('#action-notice').html('<div class="notice-fail"><div class="container">' + response['message'] + '</div></div>');
					$('#action-notice').slideToggle(500).delay(7000).slideToggle(500);
				}
		}
