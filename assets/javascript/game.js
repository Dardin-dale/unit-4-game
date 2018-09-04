$(document).ready(function () {
    // all Playable characters and stats sould be easy to update.
    // new characters need to be added to game's chars array
    var char1 = {
        name: "char1",
        attack: 25,
        hp: 100,
        counter: 8,
        sprite: "https://via.placeholder.com/100x100"

    }

    var char2 = {
        name: "char2",
        attack: 20,
        hp: 100,
        counter: 15,
        sprite: "https://via.placeholder.com/100x100"
 
    }

    var char3 = {
        name: "char3",
        attack: 15,
        hp: 130,
        counter: 10,
        sprite: "https://via.placeholder.com/100x100"
        
    }

    var char4 = {
        name: "char4",
        attack: 17,
        hp: 100,
        counter: 25,
        sprite: "https://via.placeholder.com/100x100"
        
    }

    var char5 = {
        name: "char5",
        attack: 19,
        hp: 100,
        counter: 23,
        sprite: "https://via.placeholder.com/100x100"
        
    }

    var char6 = {
        name: "char6",
        attack: 13,
        hp: 100,
        counter: 28,
        sprite: "https://via.placeholder.com/100x100"
        
    }

    //Creates HTML element character from char type object with optional class (cl) or id
    function charEle(char, cl = "character", id = "") {
        var character = $('<div class=' + cl + ' id=' + id + '>');
            character.data("name", char.name);
            character.data("hp", char.hp);
            character.data("sprite", char.sprite);
            character.data("attack", char.attack);
            character.data("counter", char.counter);
            character.html(
                '<span>'+ char.name + '</span>' +
                '<img src='+ character.data("sprite") + '/>' +
                '<span class="hbar">' + character.data("hp") + '</span>'
            );
        return character;
    }

    //gets index of char in char array by name value returns -1 otherwise
    function getIndex(charr, name) {
        for (var i = 0; i < charr.length; i++){
            if (charr[i].name == name){
                return i;
            }
        }
        return -1;
    }

    //Controls Dom functions and keeps track of characters in play
    var game = {
        chars: [char1, char2, char3, char4, char5, char6],
        player: null,
        defender: null,
        //fills id with character list
        charFill: function (id, cl = undefined, charId = undefined) {
            // populates character select creates character HTML with data to call later
            for (var i = 0; i < this.chars.length; i++) {
                $(id).append(charEle(this.chars[i], cl, charId));
            }
        },
        //sets player character and populates foes
        makePlayer: function (name) {
            // select character and fills opponents
            $('#charSelect').empty();
            var ind = getIndex(this.chars, name);
            var play = charEle(this.chars[ind], undefined, "player");
            $('#charSelect').append('<h3>Player</h3>');
            $('#charSelect').append(play);
            this.player = this.chars.splice(ind, 1);
            // fills opponent div
            $('#enemySelect').prepend('<h3 id="oppmsg">Select Your Opponent</h3>')
            this.charFill('#foes', "foe", undefined);
        },
        //move defender into position
        opponent: function (name) {
            // select character and fills opponents
            var ind = getIndex(this.chars, name);
            var play = charEle(this.chars[ind], undefined, "defender");
            $('#defend').append('<h3>Defender</h3>');
            $('#defend').append(play);
            this.defender = this.chars.splice(ind, 1);
            // Updates opponents
            $('#oppmsg').text("Opponents on Standby");
            $('#foes').empty();
            this.charFill('#foes', "wait", undefined);
        },
        attack: function () {

        }

    }

    //Sets initial game state
    game.charFill('#chars');

    // user selects character to play as.
    $('.character').on('click', function() {
        var el = $(this);
        game.makePlayer(el.data("name"));
    });

    // pick new opponent
    $('#foes').on('click', 'div.foe', function () {
        console.log('clicked!');
        var el = $(this);
        game.opponent(el.data("name"));
    });


    //runs through user chooses attack options
    $('#attack').on('click', function() {

    });


});