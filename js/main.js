
$(document).ready(function() {
    var move_count = 0;
    var player = "x";
    var bot = "o";
    var empty = "+";

    var board = {
        one: empty,
        two: empty,
        three: empty,
        four: empty,
        five: empty,
        six: empty,
        seven: empty,
        eight: empty,
        nine: empty
    };

    //resets the board (ui and internal representation)
    var reset_board = function reset() {
        move_count = 0;
        $("#game li").text(empty).removeClass('disable btn-primary btn-info bot player');
        for(var key in board)
            board[key] = empty;
    };

    //checks if 'player' won
    function player_wins(player){
        return board.one === board.two && board.one === board.three && board.one === player
                || board.four === board.five && board.four === board.six && board.four === player
                || board.seven === board.eight && board.seven === board.nine && board.seven === player
                || board.one === board.four && board.one === board.seven && board.one === player
                || board.two === board.five && board.two === board.eight && board.two === player
                || board.three === board.six && board.three === board.nine && board.three === player
                || board.one === board.five && board.one === board.nine && board.one === player
                || board.three === board.five && board.three === board.seven && board.three === player;
    }

    //checks if the game is a tie
    function is_draw() {
        if (move_count === 9) {
            $("#modal-content").text('An optimal game for each player gets you a draw. Congrats.');
            $('#modal').modal();
        }
    }

    function checks_possible_winning_moves(player1, player2) {
        var next_move = "";
        if (board.one === board.two && board.three !== player1 && board.one === player2)
            next_move = "board.three";
        else if (board.two === board.three && board.one !== player1 && board.two === player2)
            next_move = "board.one";
        else if (board.one === board.three && board.two !== player1 && board.one === player2)
            next_move = "board.two";
        else if (board.four === board.five && board.six !== player1 && board.four === player2)
            next_move = "board.six";
        else if (board.five === board.six && board.four !== player1 && board.five === player2)
            next_move = "board.four";
        else if (board.four === board.six && board.five !== player1 && board.four === player2)
            next_move = "board.five";
        else if (board.seven === board.eight && board.nine !== player1 && board.seven === player2)
            next_move = "board.nine";
        else if (board.eight === board.nine && board.seven !== player1 && board.eight === player2)
            next_move = "board.seven";
        else if (board.seven === board.nine && board.eight !== player1 && board.seven === player2)
            next_move = "board.eight";
        else if (board.one === board.four && board.seven !== player1 && board.one === player2)
            next_move = "board.seven";
        else if (board.four === board.seven && board.one !== player1 && board.four === player2)
            next_move = "board.one";
        else if (board.one === board.seven && board.four !== player1 && board.one === player2)
            next_move = "board.four";
        else if (board.two === board.five && board.eight !== player1 && board.two === player2)
            next_move = "board.eight";
        else if (board.five === board.eight && board.two !== player1 && board.five === player2)
            next_move = "board.two";
        else if (board.two === board.eight && board.five !== player1 && board.two === player2)
            next_move = "board.five";
        else if (board.three === board.six && board.nine !== player1 && board.three === player2)
            next_move = "board.nine";
        else if (board.six === board.nine && board.three !== player1 && board.six === player2)
            next_move = "board.three";
        else if (board.three === board.nine && board.six !== player1 && board.three === player2)
            next_move = "board.six";
        else if (board.one === board.five && board.nine !== player1 && board.one === player2)
            next_move = "board.nine";
        else if (board.five === board.nine && board.one !== player1 && board.five === player2)
            next_move = "board.one";
        else if (board.one === board.nine && board.five !== player1 && board.one === player2)
            next_move = "board.five";
        else if (board.three === board.five && board.seven !== player1 && board.three === player2)
            next_move = "board.seven";
        else if (board.five === board.seven && board.three !== player1 && board.five === player2)
            next_move = "board.three";
        else if (board.three === board.seven && board.five !== player1 && board.three === player2)
            next_move = "board.five";

        if (next_move !== "") {
            move_bot(next_move);
            return true;
        }
        return false;
    }

    //checks if a move can win the game
    function win() {
        if (move_count > 4)
            return checks_possible_winning_moves(player, bot);
        return false;
    }

    //blocks an opponent move (using the reverse logic of win())
    function block() {
        if (move_count > 2)
            return checks_possible_winning_moves(bot, player);
        return false;
    }

    //forks to multiply chances of winning
    function fork() {
        if (move_count > 4) {
            var next_move = "";
            //the bot has the center position
            if (board.five === bot) {
                if (board.one === bot) {
                    if (board.three === empty)
                        next_move = "board.three";
                    else if (board.seven === empty)
                        next_move = "board.seven";
                } else if (board.three === bot) {
                    if (board.one === empty)
                        next_move = "board.one";
                    else if (board.nine === empty)
                        next_move = "board.nine";
                } else if (board.seven === bot) {
                    if (board.one === empty)
                        next_move = "board.one";
                    else if (board.nine === empty)
                        next_move = "board.nine";
                } else if (board.nine === bot) {
                    if (board.seven === empty)
                        next_move = "board.seven";
                    else if (board.three === empty)
                        next_move = "board.three";
                }
            } else {
                if (board.one === bot) {
                    if ((board.three === bot || board.seven === bot) && board.nine === empty)
                        next_move = "board.nine";
                    else if ((board.nine === bot || board.seven === bot) && board.three === empty)
                        next_move = "board.three";
                    else if ((board.three === bot || board.nine === bot) && board.seven === empty)
                        next_move = "board.seven";
                } else if (board.three === bot) {
                    if ((board.nine === bot || board.seven === bot) && board.one === empty)
                        next_move = "board.one";
                    else if ((board.one === bot || board.nine === bot) && board.seven === empty)
                        next_move = "board.seven";
                    else if ((board.one === bot || board.seven === bot) && board.nine === empty)
                        next_move = "board.nine";
                } else if (board.seven === bot) {
                    if ((board.three === bot || board.nine === bot) && board.one === empty)
                        next_move = "board.one";
                    else if ((board.one === bot || board.nine === bot) && board.three === empty)
                        next_move = "board.three";
                    else if ((board.one === bot || board.three === bot) && board.nine === empty)
                        next_move = "board.nine";
                }

            }
            if (next_move !== "") {
                move_bot(next_move);
                return true;
            }
        }
        return false;
    }

    //blocks imminent opponent forks
    function block_fork() {
        if (board.five === bot) {
            if (board.one === player && board.nine === player || board.three === player && board.seven === player)
                return empty_side();
        }
        return false;
    }

    //grabs the center of the board
    function center() {
        if (board.five === empty) {
            move_bot("board.five");
            return true;
        }
        return false;
    }

    //grabs the opposite corner of the opponent
    function opposite_corner() {
        var next_move = "";
        if (board.one === player && board.nine === empty)
            next_move = "board.nine";
        else if (board.three === player && board.seven === empty)
            next_move = "board.seven";
        else if (board.seven === player && board.three === empty)
            next_move = "board.three";
        else if (board.nine === player && board.one === empty)
            next_move = "board.one";

        if (next_move !== "") {
            move_bot(next_move);
            return true;
        }
        return false;
    }

    //grabs any empty corner
    function empty_corner() {
        var next_move = "";
        if (board.one === empty)
            next_move = "board.one";
        else if (board.three === empty)
            next_move = "board.three";
        else if (board.seven === empty)
            next_move = "board.seven";
        else if (board.nine === empty)
            next_move = "board.nine";

        if (next_move !== "") {
            move_bot(next_move);
            return true;
        }
        return false;
    }

    //grabs one of the edge spots
    function empty_side() {
        if (move_count < 9) {
            if (board.two === empty)
                move_bot("board.two");
            else if (board.four === empty)
                move_bot("board.four");
            else if (board.six === empty)
                move_bot("board.six");
            else
                move_bot("board.eight");

            return true;
        }
        return false;
    }

    //places moves in internal board, updates move count
    function add_to_board(place, player) {
        move_count++;
        board[place] = player;
    }

    //moves bot and updates ui
    function move_bot(place) {
        var new_move = place.substring(6);
        add_to_board(new_move, bot);
        $("#" + new_move).text(bot).addClass('disable bot btn-primary');
    }

    //bot strategy
    function run_bot() {
        return win()
            || block()
            || fork()
            || block_fork()
            || center()
            || opposite_corner()
            || empty_corner()
            || empty_side();
    }

    //moves player and updates ui
    function move_player(argument) {
        add_to_board(argument.id, player);
        $(argument).text(player).addClass('disable player btn-info');
    }

    //game round
    var tictactoe = function() {
        //this position is already occupied
        if ($(this).hasClass('disable')) {
            return;
        } else {
            //player turn
            move_player(this);
            if (player_wins(player)) {
                $("#modal-content").text('You won!');
                $('#modal').modal();
                return;
            }
            //bot turn
            run_bot();
            if (player_wins(bot)) {
                $("#modal-content").text('Bot won!');
                $('#modal').modal();
                return;
            }
        }
        is_draw();
    };


    //event listeners
    $('#modal-button').click(reset_board);

    $('#game li').click(tictactoe);

});
