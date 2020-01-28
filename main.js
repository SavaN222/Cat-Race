jQuery(document).ready(function($) {
    var race = $('#race');
    var psyc = $('.psyc');
    var racecats = $('.racecats');
    var kvota = $('.kvota');
    var catText = $('.catinfo');
    var btn = $('#btn');
    var catBtn = $('#catBtn');
    var btnIndex;
    var ulog = $('#ulog');
    var dobitak = $('#dobitak');
    var warnBet = $('.warnBet');
    var mycat;
    var getindex;
    var prvam = $('#prvam');
    var drugam = $('#drugam');
    var trecam = $('#trecam');
    var cetvrtam = $('#cetvrtam');

    function createCat(name, age, cweight, desc) {
        this.name = name;
        this.age = age;
        this.cweight = cweight;
        this.desc = desc;
    }
    var psyCat = new createCat("Psy Cat", "3", "10kg", "PSY CAT biggest power is psycho substance");
    var weedCat = new createCat("Snoop Cat", "5", "15kg", "Snoop CAT very close cousin of Snoop Dog");
    var fatCat = new createCat("Fat Joe", "10", "65kg", "Fat Joe he doesn't even know what he's looking for here");
    var bondCat = new createCat("Cat Bond", "7", "20kg", "Biggest Favorit,cat of James Bond");
    var cats = [psyCat, weedCat, fatCat, bondCat];

    for (let i = 0; i < cats.length; i++) {
        var rand = (Math.random() * 50 + 1).toFixed(2);
        cats[i].kvota = parseFloat(rand);
    }
    btn.on('click', catInfo);

    function catInfo() {
        catBtn.html('');
        catText.html('');
        for (var i = 0; i < cats.length; i++) {
            catText.eq(i).
            html(
                "Name: " + "<span class = 'sava'>" + cats[i].name + "</span>" + "<br>" +
                "Age: " + "<span class = 'sava'>" + cats[i].age + "</span>" + "<br>" +
                "Weight: " + "<span class = 'sava'>" + cats[i].cweight + "</span>" + "<br>" +
                "Description: " + "<br>" + "<span class = 'sava'>" + cats[i].desc + "</span>" + "<br>" +
                "Kvota: " + "<span class = 'savaKvota'>" + cats[i].kvota + "</span>" + "<br>" + "<br>" +
                "<button data-toggle='modal' data-target='#betModal' type='button' class='btn btn-warning betcat '>BET ON ME</button>"
            );
            if (i == 3) {
                var betcatBtn = $('.betcat');
                for (let k = 0; k < betcatBtn.length; k++) {
                    betcatBtn.eq(k).on('click', getKvotic);
                }
            }
        }
    }

    function getKvotic() {
        var betcatBtn = $('.betcat');
        var savice = $('.savaKvota');
        //console.log(betcatBtn.index($(this)));
        getindex = (betcatBtn.index($(this)));
        mycat = cats[getindex];
        kvota.text(savice.eq(getindex).text());
    }

    function validacija() {
        var testVal = ulog.val();
        if (testVal < 100 || testVal > 10000) {
            warnBet.text("*Your bet must be higher than 100$ and smaller than 10000$");
            return false;
        } else if (isNaN(testVal)) {
            warnBet.text("*NUMBERS ONLY!");
            warnBet.append('<br>');
            return false;
        } else {
            warnBet.text('');
            return true;
        }

    }
    ulog.blur(function() {
        // $(this).css("background-color", "red");
        // console.log(ulog.val());
        // console.log(kvota.text());
        validacija();
        var zbir = Math.floor(ulog.val() * kvota.text());
        dobitak.val(zbir);
    });
    $('#betExit').on('click', function() {
        ulog.val('');
        dobitak.val('');
        warnBet.text('');
    })
    $('#placebet').on('click', function() {
        var conf = confirm('Are you sure? \n\ Your bet is : ' + ulog.val() +
            ' \n\ Winnings: ' + dobitak.val());
        if (conf === true) {
            var getB = validacija();
            if (getB === true && conf === true) {
                $('#betModal').modal('toggle');
                $('.cats').hide();
                // $('#wtf').show();
                $(document).scrollTop($(".fh").offset().top);
                racecats.eq(getindex).addClass('mycat'); // selektuje macku nasu
                checkRun();
            }
        }
    });
    var xx = 5;
    var yy = 0;
    var winner;

    var pos = 0;
    var pos1 = 0;
    var pos2 = 0;
    var pos3 = 0;

    function moveCats() {
        if (pos > 950) {
            xx = 0;
        } else {
            var steps = Math.floor(Math.random() * 200);
            prvam.animate({
                left: "+=" + steps + "px"
            }, 2000);
            pos += steps;

        }
        if (pos1 > 950) {
            xx = 1;
        } else {
            var steps1 = Math.floor(Math.random() * 200);
            drugam.animate({
                left: "+=" + steps1 + "px"
            }, 2000);
            pos1 += steps1;

        }
        if (pos2 > 950) {
            xx = 2;
        } else {
            var steps2 = Math.floor(Math.random() * 200);
            trecam.animate({
                left: "+=" + steps2 + "px"
            }, 2000);
            pos2 += steps2;

        }
        if (pos3 > 950) {
            xx = 3;
        } else {
            var steps3 = Math.floor(Math.random() * 200);
            cetvrtam.animate({
                left: "+=" + steps3 + "px"
            }, 2000);
            pos3 += steps3;

        }
        checkRun();
        return xx;
    }

    function checkRun() {
        if (xx == 5) {
            moveCats();

        } else {
            getInfo();
        }
    }
    var btnrst = $('#btnr');
    btnrst.on('click', function() {
        location.reload();
    });

    function getInfo() {
        $(document).scrollTop($(".fh").offset().top);
        var pobednik;
        switch (xx) {
            case 0:
                pobednik = "Psy Cat";
                break;
            case 1:
                pobednik = "Weed Cat";
                break;
            case 2:
                pobednik = "Fat Joe";
                break;
            default:
                pobednik = "Cool Cat";
                break;
        }
        if (xx == getindex) {
            $('.fh').html('Congratulations, your prize is: ' + dobitak.val() + "<br>" +
                "Winner is: " + "<span>" + pobednik + "</span>");
            btnrst.show();
        } else {
            $('.fh').html('You lose! :(' + "<br>" +
                "Winner is: " + "<span>" + pobednik + "</span>");
            btnrst.show();
        }
        return false;
    }

}); // kraj jquery
