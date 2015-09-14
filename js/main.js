// JavaScript Document
$(document).ready(function() {
    var move_count = 0;
    var x = "x"
    var o = "o"

	function reset () {
        $("#game li").text("+");
        $("#game li").removeClass('disable')
        $("#game li").removeClass('btn-primary')
        $("#game li").removeClass('btn-info')
        $("#game li").removeClass(o)
        $("#game li").removeClass(x)
        move_count = 0
	}

    function player_wins(player){
        return $("#one").hasClass(player) && $("#two").hasClass(player) && $("#three").hasClass(player)
                || $("#four").hasClass(player) && $("#five").hasClass(player) && $("#six").hasClass(player)
                || $("#seven").hasClass(player) && $("#eight").hasClass(player) && $("#nine").hasClass(player)
                || $("#one").hasClass(player) && $("#four").hasClass(player) && $("#seven").hasClass(player)
                || $("#two").hasClass(player) && $("#five").hasClass(player) && $("#eight").hasClass(player)
                || $("#three").hasClass(player) && $("#six").hasClass(player) && $("#nine").hasClass(player)
                || $("#one").hasClass(player) && $("#five").hasClass(player) && $("#nine").hasClass(player)
                || $("#three").hasClass(player) && $("#five").hasClass(player) && $("#seven").hasClass(player);
    }

	function is_draw () {
		if (move_count == 9) {
	        alert('An optimal game for each player gets you a draw. Congrats.')
	        reset();
	    }
	}

	//game loop
    $('#game li').click(function() {

		move_count++
        if ($(this).hasClass('disable')) {
        	move_count--;
            return;
        } else if (!(move_count % 2)) {
            $(this).text(o)
            $(this).addClass('disable o btn-primary')
            if (player_wins(o)) {
                alert('O wins!')
                reset();
            }
        } else {
            $(this).text(x)
            $(this).addClass('disable x btn-info')
            if (player_wins(x)) {
                alert('X wins!')
                reset();
            }
        }
        is_draw();
    });

});
