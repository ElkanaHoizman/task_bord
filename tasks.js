var x = 0;

function setstorage() {

    var comment = document.getElementById("comment").value;
    var time = document.getElementById("time").value;
    var date = document.getElementById("date").value;

    var date_regex = /^\d{4}-\d{2}-\d{2}$/;
    var validate = date_regex.test(date);

    if (comment != "" && date != "" && validate == true) {

        var tasksq = [];
        var task = {
            "comment": comment,
            "time": time,
            "date": date
        };

        if (localStorage.getItem('tasksq')) {


            var w = localStorage.getItem('tasksq');
            var js = JSON.parse(w);

            js.push(task);
            localStorage.setItem('tasksq', JSON.stringify(js));

        } else {
            tasksq[0] = task;
            localStorage.setItem('tasksq', JSON.stringify(tasksq));

        }
        var new_task = "<div class='task' id='" + x + "'><i class='glyphicon glyphicon-remove' id=a" + x + " ></i><p class='comment'>" + comment + "</p><p              class='date'>" + date + "</p> <p class='time'>" + time + "</p></div>"

        document.getElementById("tasks").innerHTML += new_task;
        document.getElementById(x).style.animation = 'fadein 2s';

        clean();
        x++;

    } else {
        var element = document.getElementById("mes").innerHTML = "";

        if (comment == "") {
            var mesg = "<div id='mesg '  class='mesg '>You have not filled out a comment.</div>"
            document.getElementById("mes").innerHTML = mesg;

        }

        if (date == "" || validate == false) {
            var mesg = "<div    class='mesg '>You have not filled out a date.</div>"
            document.getElementById("mes").innerHTML += mesg;
        }
    }
}

function getStorage() {

    if (localStorage.getItem('tasksq')) {

        var s = localStorage.getItem('tasksq');
        jtask = JSON.parse(s);
        for (i = 0; i < jtask.length; i++) {

            var new_task = "<div class='task' id='" + i + "'><i class='glyphicon glyphicon-remove' id=a" + i + " ></i><p class='comment'>" + jtask[i].comment + "</p><p class='date'>" + jtask[i].date + "</p> <p class='time'>" + jtask[i].time + "</p></div>"
            document.getElementById("tasks").innerHTML += new_task;

            document.getElementById(i).style.animation = 'fadein ' + i + 's';
            x = i;
        }
        x++;
    }
}

document.addEventListener("click", function(s) {
    Delete(s);

});

function Delete(s) {

    if (s.target.tagName.toLowerCase() === 'i') {
        var a = s.target.id;
        var b = document.getElementById(a).nextSibling;
        var c = b.innerHTML;

        var w = localStorage.getItem('tasksq');
        var js = JSON.parse(w);

        for (i = 0; i < js.length; i++) {
            var d = js[i].comment;
            if (d == c) {
                js.splice(i, 1);
                var fadeparent = document.getElementById(a).parentElement;
                fade(fadeparent);
            }
            s
            localStorage.setItem('tasksq', JSON.stringify(js));
        }
    }
}

function clean() {
    document.getElementById("comment").value = null;
    document.getElementById("time").value = null;
    document.getElementById("date").value = null;

    var element = document.getElementById("mes").innerHTML = "";
}

function fade(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}