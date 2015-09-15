
$(document).ready(function() {
    var board = {
        one: "+",
        two: "+",
        three: "+",
        four: "+",
        five: "+",
        six: "+",
        seven: "+",
        eight: "+",
        nine: "+"
    }
    var move_count = 0;
    var x = "x"
    var o = "o"

    function reset() {
        $("#game li").text("+");
        $("#game li").removeClass('disable')
        $("#game li").removeClass('btn-primary')
        $("#game li").removeClass('btn-info')
        $("#game li").removeClass(o)
        $("#game li").removeClass(x)
        move_count = 0
        board = {
            one: "+",
            two: "+",
            three: "+",
            four: "+",
            five: "+",
            six: "+",
            seven: "+",
            eight: "+",
            nine: "+"
        }

    }

    function player_wins(player) {
        return board.one == board.two && board.one == board.three && board.one == player || board.four == board.five && board.four == board.six && board.four == player || board.seven == board.eight && board.seven == board.nine && board.seven == player || board.one == board.four && board.one == board.seven && board.one == player || board.two == board.five && board.two == board.eight && board.two == player || board.three == board.six && board.three == board.nine && board.three == player || board.one == board.five && board.one == board.nine && board.one == player || board.three == board.five && board.three == board.seven && board.three == player;
    }

    function is_draw() {
        if (move_count == 10) {
            alert('An optimal game for each player gets you a draw. Congrats.')
            reset();
        }
    }

    function win() {
        player = x;
        computer = o;
        var next_move = "";
        if (move_count > 4) {
            if (board.one == board.two && board.three != player && board.one == computer)
                next_move = "board.three"
            else if (board.two == board.three && board.one != player && board.two == computer)
                next_move = "board.one"
            else if (board.one == board.three && board.two != player && board.one == computer)
                next_move = "board.two"
            else if (board.four == board.five && board.six != player && board.four == computer)
                next_move = "board.six";
            else if (board.five == board.six && board.four != player && board.five == computer)
                next_move = "board.four";
            else if (board.four == board.six && board.five != player && board.four == computer)
                next_move = "board.five";
            else if (board.seven == board.eight && board.nine != player && board.seven == computer)
                next_move = "board.nine";
            else if (board.eight == board.nine && board.seven != player && board.eight == computer)
                next_move = "board.seven"
            else if (board.seven == board.nine && board.eight != player && board.seven == computer)
                next_move = "board.eight"
            else if (board.one == board.four && board.seven != player && board.one == computer)
                next_move = "board.seven"
            else if (board.four == board.seven && board.one != player && board.four == computer)
                next_move = "board.one"
            else if (board.one == board.seven && board.four != player && board.one == computer)
                next_move = "board.four"
            else if (board.two == board.five && board.eight != player && board.two == computer)
                next_move = "board.eight";
            else if (board.five == board.eight && board.two != player && board.five == computer)
                next_move = "board.two";
            else if (board.two == board.eight && board.five != player && board.two == computer)
                next_move = "board.five";
            else if (board.three == board.six && board.nine != player && board.three == computer)
                next_move = "board.nine";
            else if (board.six == board.nine && board.three != player && board.six == computer)
                next_move = "board.three"
            else if (board.three == board.nine && board.six != player && board.three == computer)
                next_move = "board.six"
            else if (board.one == board.five && board.nine != player && board.one == computer)
                next_move = "board.nine";
            else if (board.five == board.nine && board.one != player && board.five == computer)
                next_move = "board.one"
            else if (board.one == board.nine && board.five != player && board.one == computer)
                next_move = "board.five"
            else if (board.three == board.five && board.seven != player && board.three == computer)
                next_move = "board.seven"
            else if (board.five == board.seven && board.three != player && board.five == computer)
                next_move = "board.three"
            else if (board.three == board.seven && board.five != player && board.three == computer)
                next_move = "board.five"

            if (next_move != "") {
                move_bot(next_move);
                return true;
            };
        }
        return false;
    }

    function block() {
        player = x;
        computer = o;
        var next_move = "";
        if (move_count >= 3) {
            if (board.one == board.two && board.three != computer && board.one == player)
                next_move = "board.three"
            else if (board.two == board.three && board.one != computer && board.two == player)
                next_move = "board.one"
            else if (board.one == board.three && board.two != computer && board.one == player)
                next_move = "board.two"
            else if (board.four == board.five && board.six != computer && board.four == player)
                next_move = "board.six";
            else if (board.five == board.six && board.four != computer && board.five == player)
                next_move = "board.four";
            else if (board.four == board.six && board.five != computer && board.four == player)
                next_move = "board.five";
            else if (board.seven == board.eight && board.nine != computer && board.seven == player)
                next_move = "board.nine";
            else if (board.eight == board.nine && board.seven != computer && board.eight == player)
                next_move = "board.seven"
            else if (board.seven == board.nine && board.eight != computer && board.seven == player)
                next_move = "board.eight"
            else if (board.one == board.four && board.seven != computer && board.one == player)
                next_move = "board.seven"
            else if (board.four == board.seven && board.one != computer && board.four == player)
                next_move = "board.one"
            else if (board.one == board.seven && board.four != computer && board.one == player)
                next_move = "board.four"
            else if (board.two == board.five && board.eight != computer && board.two == player)
                next_move = "board.eight";
            else if (board.five == board.eight && board.two != computer && board.five == player)
                next_move = "board.two";
            else if (board.two == board.eight && board.five != computer && board.two == player)
                next_move = "board.five";
            else if (board.three == board.six && board.nine != computer && board.three == player)
                next_move = "board.nine";
            else if (board.six == board.nine && board.three != computer && board.six == player)
                next_move = "board.three"
            else if (board.three == board.nine && board.six != computer && board.three == player)
                next_move = "board.six"
            else if (board.one == board.five && board.nine != computer && board.one == player)
                next_move = "board.nine";
            else if (board.five == board.nine && board.one != computer && board.five == player)
                next_move = "board.one"
            else if (board.one == board.nine && board.five != computer && board.one == player)
                next_move = "board.five"
            else if (board.three == board.five && board.seven != computer && board.three == player)
                next_move = "board.seven"
            else if (board.five == board.seven && board.three != computer && board.five == player)
                next_move = "board.three"
            else if (board.three == board.seven && board.five != computer && board.three == player)
                next_move = "board.five"

            if (next_move != "") {
                move_bot(next_move);
                return true;
            };
        }
        return false;
    }


    function fork() {
        player = x;
        computer = o;
        var next_move = ""
        if (move_count >= 5) {
            if (board.five == computer) {
                if (board.one == computer && board.five == "+")
                    next_move = "board.five"
                else if (board.five == computer && board.one == "+")
                    next_move = "board.one"
                else if (board.one == computer && board.seven == "+")
                    next_move = "board.seven"
                else if (board.seven == computer && board.one == "+")
                    next_move = "board.one"
                else if (board.seven == computer && board.nine == "+")
                    next_move = "board.nine"
                else if (board.nine == computer && board.seven == "+")
                    next_move = "board.seven"
                else if (board.three == computer && board.nine == "+")
                    next_move = "board.nine"
                else if (board.nine == computer && board.three == "+")
                    next_move = "board.three"
            } else {
                if (board.one == computer && board.three == computer && board.nine == "+")
                    next_move = "board.nine"
                else if (board.one == computer && board.nine == computer && board.three == "+")
                    next_move = "board.three"
                else if (board.three == computer && board.nine == computer && board.one == "+")
                    next_move = "board.one"
                else if (board.one == computer && board.seven == computer && board.three == "+")
                    next_move = "board.three"
                else if (board.one == computer && board.three == computer && board.seven == "+")
                    next_move = "board.seven"
                else if (board.seven == computer && board.three == computer && board.one == "+")
                    next_move = "board.one"
                else if (board.one == computer && board.nine == computer && board.seven == "+")
                    next_move = "board.seven"
                else if (board.one == computer && board.seven == computer && board.nine == "+")
                    next_move = "board.nine"
                else if (board.seven == computer && board.nine == computer && board.one == "+")
                    next_move = "board.one"
                else if (board.three == computer && board.nine == computer && board.seven == "+")
                    next_move = "board.seven"
                else if (board.three == computer && board.seven == computer && board.nine == "+")
                    next_move = "board.nine"
                else if (board.seven == computer && board.nine == computer && board.three == "+")
                    next_move = "board.three"
            }
            if (next_move != "") {
                move_bot(next_move);
                return true;
            };
        }
        return false;
    }

    function center() {
        if (board.five == "+") {
            move_bot("board.five");
            return true;
        }
        return false;
    }

    function opposite_corner() {
        player = x;
        var next_move = ""
        if (board.one == player && board.nine == "+") {
            next_move = "board.nine";
        } else if (board.three == player && board.seven == "+") {
            next_move = "board.seven"
        } else if (board.seven == player && board.three == "+") {
            next_move = "board.three"
        } else if (board.nine == player && board.one == "+") {
            next_move = "board.one"
        }
        if (next_move != "") {
            move_bot(next_move);
            return true;
        };
        return false;
    }

    function empty_corner() {
        var next_move = ""
        if (board.one == "+") {
            next_move = "board.one"
        } else if (board.three == "+") {
            next_move = "board.three"
        } else if (board.seven == "+") {
            next_move = "board.seven"
        } else if (board.nine == "+") {
            next_move = "board.nine";
        }
        if (next_move != "") {
            move_bot(next_move);
            return true;
        };
        return false;
    }

    function empty_side() {
        if (move_count < 9) {
            if (board.two == "+") {
                move_bot("board.two");
            } else if (board.four == "+") {
                move_bot("board.four");
            } else if (board.six == "+") {
                move_bot("board.six");
            } else {
                move_bot("board.eight");
            }
            return true;
        }
        return false;
    }

    function add_board(argument, player) {
        switch (argument) {
            case "one":
                board.one = player;
                break;
            case "two":
                board.two = player;
                break;
            case "three":
                board.three = player;
                break;
            case "four":
                board.four = player;
                break;
            case "five":
                board.five = player;
                break;
            case "six":
                board.six = player;
                break;
            case "seven":
                board.seven = player;
                break;
            case "eight":
                board.eight = player;
                break;
            case "nine":
                board.nine = player;
                break;
        }
    }

    function move_bot(place) {
        new_move = ""
        switch (place) {
            case "board.one":
                new_move = "one";
                break;
            case "board.two":
                new_move = "two";
                break;
            case "board.three":
                new_move = "three";
                break;
            case "board.four":
                new_move = "four";
                break;
            case "board.five":
                new_move = "five";
                break;
            case "board.six":
                new_move = "six";
                break;
            case "board.seven":
                new_move = "seven";
                break;
            case "board.eight":
                new_move = "eight";
                break;
            case "board.nine":
                new_move = "nine";
                break;
        }
        add_board(new_move, o);
        $("#" + new_move).text(o)
        $("#" + new_move).addClass('disable o btn-primary')
    }


    function bot() {
        move_count++;
        if (win())
            return;
        if (block())
            return;
        if (fork())
            return;
        //if(block_fork()){}
        //	return;
        if (center())
            return;
        if (opposite_corner())
            return;
        if (empty_corner())
            return;
        if (empty_side())
            return;
    }

    //game loop
    $('#game li').click(function() {
        move_count++;
        if ($(this).hasClass('disable')) {
            move_count--;
            return;
        } else {
            add_board(this.id, x);
            $(this).text(x)
            $(this).addClass('disable x btn-info')
            if (player_wins(x)) {
                alert('X wins!')
                reset();
            }

            bot();
            if (player_wins(o)) {
                alert('Computer wins!')
                reset();
            }
        }
        is_draw();
    });

});
