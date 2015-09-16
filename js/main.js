
$(document).ready(function() {

// Board

// numbered from left to right, top to bottom
// ie, corners are 1, 3, 7 and 9
//     edges are 2, 4, 6 and 8
//     the center takes number 5

//     1   2   3
//     + | + | +
//    ---+---+---
//     + | + | +
//    ---+---+---
//     + | + | +
//     7   8   9

// The board is implemented with an array so subtract 1 to each number for its internal representation (zero-based indexing)
// Each player keeps their own board with boolean values regarding their currently occupied places.
// Constants have been defined to help querying the board (no magic numbers!)

    const FIRST_CORNER = 0, SECOND_CORNER = 2, THIRD_CORNER = 6, FOURTH_CORNER = 8;
    const FIRST_EDGE = 1, SECOND_EDGE = 3, THIRD_EDGE = 5, FOURTH_EDGE = 7;
    const CENTER = 4;
    const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const human = 'X';
    const bot = 'O';
    const empty = '+';

    var human_board = [false, false, false, false, false, false, false, false, false];
    var bot_board = [false, false, false, false, false, false, false, false, false];
    var move_count = 0;


    //resets the board (ui and internal representation)
    var reset_board = function reset() {
        move_count = 0;
        $('#game li').text(empty).removeClass('disable btn-primary btn-info bot human');
        for (var i = human_board.length - 1; i >= 0; i--) {
            human_board[i] = false;
            bot_board[i] = false;
        }
    };

    //checks if 'player' won
    function player_wins(player){
        var board = (player === bot)? bot_board : human_board;
        for (var i = 0, j = 0; i != 9; i+=3, j++) {
            if(board[i] && board[i+1] && board[i+2])       //horizontal check
                return true;
            else if(board[j] && board[j+3] && board[j+6])  //vertical check
                return true;
        }
        //diagonals
        return (board[FIRST_CORNER] && board[CENTER]  && board[FOURTH_CORNER])
            || (board[SECOND_CORNER] && board[CENTER] && board[THIRD_CORNER]);
    }

    //checks if the game is a tie
    function is_draw() {
        if (move_count === 9) {
            $('#modal-content').text('An optimal game for each player gets you a draw. Congrats.');
            $('#modal').modal();
        }
    }

    //places moves in internal board, updates move count
    function add_to_board(place, player) {
        move_count++;
        var board = (player === bot) ? bot_board : human_board;
        board[place] = true;
    }

    function is_empty(place) {
        return ! bot_board[place] && ! human_board[place];
    }

// Bot

// Basic AI strategy:
//  1) search for a place that wins the game
//  2) block a place that would give a victory to the opponent
//  3) grabs places that increase opportunities
//  4) blocks forking opportunities of the opponent
//  5) grabs the center position (the most valuable one)
//  6) grabs opposing corners of the opponent
//  7) grabs any corner
//  8) grabs the edges (remaining positions)

    //looks for winning moves
    function checks_possible_winning_moves(player1, player2) {
        var opponent_board = (player1 === bot)? bot_board : human_board;
        var board = (player2 === bot)? bot_board : human_board;

        for (var i = 0, j = 0; i != 9; i+=3, j++) {
            // horizontal check
            if(board[i] && board[i+1] && ! opponent_board[i+2])         //     X | X | +
                return move_bot(i+2);                                   //    ---+---+---
            else if(board[i+1] && board[i+2] && ! opponent_board[i])    //     + | X | X
                return move_bot(i);                                     //    ---+---+---
            else if(board[i] && board[i+2] && ! opponent_board[i+1])    //     X | + | X
                return move_bot(i+1);

            // vertical check
            else if(board[j] && board[j+3] && ! opponent_board[j+6])    //     X | + | X
                return move_bot(j+6);                                   //    ---+---+---
            else if(board[j+3] && board[j+6] && ! opponent_board[j])    //     X | + | +
                return move_bot(j);                                     //    ---+---+---
            else if(board[j] && board[j+6] && ! opponent_board[j+3])    //     + | X | X
                return move_bot(j+3);
        }
        // diagonals
        if (board[FIRST_CORNER] && board[CENTER] && !opponent_board[FOURTH_CORNER])
            return move_bot(FOURTH_CORNER);
        else if (board[CENTER] && board[FOURTH_CORNER] && !opponent_board[FIRST_CORNER])
            return move_bot(FIRST_CORNER);
        else if (board[FIRST_CORNER] && board[FOURTH_CORNER] && !opponent_board[CENTER])
            return move_bot(CENTER);
        else if (board[SECOND_CORNER] && board[CENTER] && !opponent_board[THIRD_CORNER])
            return move_bot(THIRD_CORNER);
        else if (board[CENTER] && board[THIRD_CORNER] && !opponent_board[SECOND_CORNER])
            return move_bot(SECOND_CORNER);
        else if (board[SECOND_CORNER] && board[THIRD_CORNER] && !opponent_board[CENTER])
            return move_bot(CENTER);

        return false;
        }

    //checks if a move can win the game
    function win() {
        if (move_count > 4)
            return checks_possible_winning_moves(human, bot);
        return false;
    }

    //blocks an opponent winning move (using the reverse logic of win())
    function block() {
        if (move_count > 2)
            return checks_possible_winning_moves(bot, human);
        return false;
    }

    //forks so that the opportunities to win increase
    function fork() {
        if (move_count > 4) {
            //the bot has the center position
            if (bot_board[CENTER]) {                                                    //   example:
                if (bot_board[FIRST_CORNER] || bot_board[FOURTH_CORNER]) {              //     X | + | X
                    if (is_empty(SECOND_CORNER))                                        //    ---+---+---
                        return move_bot(SECOND_CORNER);                                 //     + | X | +
                    else if (is_empty(THIRD_CORNER))                                    //    ---+---+---
                        return move_bot(THIRD_CORNER);                                  //     + | + | +
                } else if (bot_board[SECOND_CORNER] || bot_board[THIRD_CORNER]) {
                    if (is_empty(FIRST_CORNER))
                        return move_bot(FIRST_CORNER);
                    else if (is_empty(FOURTH_CORNER))
                        return move_bot(FOURTH_CORNER);
                }
            } else {
                if (bot_board[FIRST_CORNER]) {                                                                      //   example:
                    if ((bot_board[SECOND_CORNER] || bot_board[THIRD_CORNER]) && is_empty(FOURTH_CORNER))           //     X | + | X
                        return move_bot(FOURTH_CORNER);                                                             //    ---+---+---
                    else if ((bot_board[FOURTH_CORNER] || bot_board[THIRD_CORNER]) && is_empty(SECOND_CORNER))      //     + | + | +
                        return move_bot(SECOND_CORNER);                                                             //    ---+---+---
                    else if ((bot_board[SECOND_CORNER] || bot_board[FOURTH_CORNER]) && is_empty(THIRD_CORNER))      //     + | + | X
                        return move_bot(THIRD_CORNER);
                } else if (bot_board[SECOND_CORNER]) {
                    if ((bot_board[FOURTH_CORNER] || bot_board[THIRD_CORNER]) && is_empty(FIRST_CORNER))
                        return move_bot(FIRST_CORNER);
                    else if ((bot_board[FIRST_CORNER] || bot_board[FOURTH_CORNER]) && is_empty(THIRD_CORNER))
                        return move_bot(THIRD_CORNER);
                    else if ((bot_board[FIRST_CORNER] || bot_board[THIRD_CORNER]) && is_empty(FOURTH_CORNER))
                        return move_bot(FOURTH_CORNER);
                } else if (bot_board[THIRD_CORNER]) {
                    if ((bot_board[SECOND_CORNER] || bot_board[FOURTH_CORNER]) && is_empty(FIRST_CORNER))
                        return move_bot(FIRST_CORNER);
                    else if ((bot_board[FIRST_CORNER] || bot_board[FOURTH_CORNER]) && is_empty(SECOND_CORNER))
                        return move_bot(SECOND_CORNER);
                    else if ((bot_board[FIRST_CORNER] || bot_board[SECOND_CORNER]) && is_empty(FOURTH_CORNER))
                        return move_bot(FOURTH_CORNER);
                }

            }
        }
        return false;
    }

    //blocks imminent opponent forks
    function block_fork() {
        if (bot_board[CENTER]) {
            if (human_board[FIRST_CORNER] && human_board[FOURTH_CORNER] || human_board[SECOND_CORNER] && human_board[THIRD_CORNER])
                return take_empty_edge();
        }
        return false;
    }

    //grabs the center of the board
    function take_center() {
        if (is_empty(CENTER)) {
            return move_bot(CENTER);
        }
        return false;
    }

    //grabs the opposite corner of the opponent
    function take_opposite_corner() {
        if (human_board[FIRST_CORNER] && is_empty(FOURTH_CORNER))
            return move_bot(FOURTH_CORNER);
        else if (human_board[SECOND_CORNER] && is_empty(THIRD_CORNER))
            return move_bot(THIRD_CORNER);
        else if (human_board[THIRD_CORNER] && is_empty(SECOND_CORNER))
            return move_bot(SECOND_CORNER);
        else if (human_board[FOURTH_CORNER] && is_empty(FIRST_CORNER))
            return move_bot(FIRST_CORNER);

        return false;
    }

    //grabs any empty corner
    function take_empty_corner() {
        if (is_empty(FIRST_CORNER))
            return move_bot(FIRST_CORNER);
        else if (is_empty(SECOND_CORNER))
            return move_bot(SECOND_CORNER);
        else if (is_empty(THIRD_CORNER))
            return move_bot(THIRD_CORNER);
        else if (is_empty(FOURTH_CORNER))
            return move_bot(FOURTH_CORNER);

        return false;
    }

    //grabs one of the edge spots
    function take_empty_edge() {
        if (move_count < 9) {
            if (is_empty(FIRST_EDGE))
                return move_bot(FIRST_EDGE);
            else if (is_empty(SECOND_EDGE))
                return move_bot(SECOND_EDGE);
            else if (is_empty(THIRD_EDGE))
                return move_bot(THIRD_EDGE);
            else
                return move_bot(FOURTH_EDGE);
        }
        return false;
    }

    //moves bot and updates ui
    function move_bot(place) {
        add_to_board(place, bot);
        $('#' + digits[place]).text(bot).addClass('disable bot btn-primary');
        return true;
    }

    //bot strategy
    function run_bot() {
        return win()
            || block()
            || fork()
            || block_fork()
            || take_center()
            || take_opposite_corner()
            || take_empty_corner()
            || take_empty_edge();
    }


// Tic Tac Toe

// each round is delimited by a player turn
// an event listener is called upon clicking one of the positions

    //moves human and updates ui
    function move_human(place) {
        for (var i = digits.length - 1; i >= 0; i--)
            if (place.id == digits[i])
                add_to_board(i, human);

        $(place).text(human).addClass('disable human btn-info');
    }

    //game round
    var tictactoe = function() {
        //this position is already occupied
        if ($(this).hasClass('disable')) {
            return;
        } else {
            //human turn
            move_human(this);
            if (player_wins(human)) {
                $('#modal-content').text('You won!');
                $('#modal').modal();
                return;
            }
            //bot turn
            run_bot();      //feel free to change this call to your own bot
            if (player_wins(bot)) {
                $('#modal-content').text('Bot won!');
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
