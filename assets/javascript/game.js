$(document).ready(function () {
    // all Playable characters and stats sould be easy to update.
    // new characters need to be added to game's chars array

    // Easy target
    var char1 = {
        name: "Stink Bug",
        attack: 5,
        hp: 100,
        counter: 25,
        sprite: "assets/images/stink.jpg"

    }

    //maybe OP?
    var char2 = {
        name: "Rhino Beetle",
        attack: 10,
        hp: 135,
        counter: 20,
        sprite: "assets/images/rhino.jpg"
    }

    // classic tank
    var char3 = {
        name: "Dung Beetle",
        attack: 4,
        hp: 160,
        counter: 15,
        sprite: "assets/images/dung.jpg"
    }

    //High DPA Glass Cannon
    var char4 = {
        name: "Ladybug",
        attack: 30,
        hp: 80,
        counter: 45,
        sprite: "assets/images/lady.jpg"  
    }

    // good ol' bait
    var char5 = {
        name: "Scarab",
        attack: 19,
        hp: 100,
        counter: 15,
        sprite: "assets/images/scarab.jpg"   
    }

    //fights for their family and children
    var char6 = {
        name: "Stag Beetle",
        attack: 3,
        hp: 120,
        counter: 35,
        sprite: "assets/images/stag.jpg"
    }

    //Creates HTML element character from char type object with optional class (cl) or id
    // not all data currently used but available for future updates
    function charEle(char, cl = "character", id = "") {
        var character = $('<div class=' + cl + ' id=' + id + '>');
            character.data("name", char.name);
            character.data("hp", char.hp);
            character.data("sprite", char.sprite);
            character.data("attack", char.attack);
            character.data("counter", char.counter);
            var color = "darkgreen";
            if (char.hp < 30) {
                color = "darkred";
            }
            character.html(
                '<span>'+ char.name + '</span>' +
                '<img class="img-thumbnail" src='+ character.data("sprite") + ' alt=' + char.name + 'picture />' +
                '<span class="hbar" style="background-color:' + color + '; width:' + char.hp + '%;">' + '<p>' + character.data("hp") + '</p>' + '</span>'
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
            this.player = this.chars.splice(ind, 1)[0];
            // fills opponent div
            $('#enemySelect').prepend('<h3 id="oppmsg">Select Your Opponent</h3>')
            this.charFill('#foes', "foe", undefined);
        },
        //move defender into position
        opponent: function (name) {
            // select character and fills opponents
            var ind = getIndex(this.chars, name);
            var play = charEle(this.chars[ind], "foe", "defender");
            $('#defend').empty();
            $('#defend').append('<h3>Defender</h3>');
            $('#defend').append(play);
            this.defender = this.chars.splice(ind, 1)[0];
            // Updates opponents
            $('#oppmsg').text("Opponents on Standby");
            $('#foes').empty();
            this.charFill('#foes', "wait", undefined);
        },
        // ################################
        // main attack system/game logic
        // ################################
        attack: function () {
            if (this.defender) {
                this.defender.hp = this.defender.hp - this.player.attack;
                // pick new opponent or win
                if (this.defender.hp <= 0) {
                    // checks for remaining opponents
                    if(!Array.isArray(this.chars) || !this.chars.length){
                        this.win();
                    } else {
                        $('#defend').empty();
                        $('#defend').append('<p id="defmsg">You beat '+ this.defender.name + '!</p>');
                        $('#oppmsg').text("Select Your Next Opponent");
                        $('#foes').empty();
                        this.charFill('#foes', "foe", undefined);
                        this.defender = null;
                    }
                } else {
                    // update health and check for fail case
                    this.player.hp = this.player.hp - this.defender.counter
                    if (this.player.hp <= 0) {
                        this.lose();
                    } else {
                        // re-draw player and defender & icrease pllayer attack
                        var def = charEle(this.defender, "foe", "defender" )
                        $('#defend').empty();
                        $('#defend').append('<h3>Defender</h3>');
                        $('#defend').append(def);
                        $('#defend').append('<p>You attacked ' + this.defender.name + ' for ' + this.player.attack + 
                    ' damage. ' + this.defender.name + ' countered with ' + this.defender.counter + ' damage.');

                        this.player.attack = this.player.attack*2;
                        var play = charEle(this.player, undefined, "player");
                        $('#charSelect').empty();
                        $('#charSelect').append('<h3>Player</h3>');
                        $('#charSelect').append(play);
                    }
                    
                }

            } else {
                //only adds once else changes msg
                if ($('#defmsg').length == 0) {
                     $('#defend').append('<p id="defmsg">No Opponent to Attack</p>');
                } else {
                    $('#defmsg').text('No Opponent to Attack');
                }
            }

        },
        //Ony winners get to stay on the page!
        win: function () {
            console.log('You Win!');
            $('.hbar').empty(); 
            $('#defend').empty();
            $('#options').empty();
            $('#enemySelect').empty();
            $('#charSelect').append('<h1> You Win! </h1>');

            $('#winModalCenterTitle').text('You Win!');
            $('#giffy').attr('src', "https://giphy.com/embed/3o6ozgHi0Fv82zA12M");
            $('#winModal').modal('toggle');
        },
        lose: function () {
            console.log('You Lose!');
            $('.hbar').empty();
            $('#charSelect').empty();
            $('#options').empty();
            $('#enemySelect').empty();
            $('<p>').empty();
            $('#defend').append('<h1> You Lose! </h1>');

            $('#winModalCenterTitle').text('You Lose!');
            $('#giffy').attr('src', "https://giphy.com/embed/LS19frvRRQbPG");
            $('#winModal').modal('toggle');
        },
        reset: function () {
            location.reload();
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
        var el = $(this);
        game.opponent(el.data("name"));
    });


    //runs through user chooses attack options
    $('#attack').on('click', function() {
        game.attack();
    });

    $('.btn-primary').on('click', function() {
        game.reset();
    });


});