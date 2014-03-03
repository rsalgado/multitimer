$(document).ready(function () {
    
    // Auxiliary functions

    var setAnimation = function(task, time) {
        var value = "countdown linear " + time*60 + "s";
        task.find('.bar').css("animation", value);
    };

    var createTaskNode = function(summary, duration) {
        return $("<div class='task'><div class='progress'>" +
                    "<div class='bar' data-status='running'></div></div>"+
                    "<div class='duration'>" + duration + " M" + "</div>" +
                    "<a class='play-pause btn'><i class='fa fa-pause'></i></a> " + 
                    "<a class='remove btn'><i class='fa fa-times'></i></a>" +
                    "<div class='summary' contenteditable='true'>" + summary + "</div></div>");
    };

    // Daemon checker
    setInterval(function() {
        $("#running-tasks").find(".task").each(function(index) {
            var width = $(this).find(".bar").css("width");
            if (width == "0px") {
                $(this).find(".bar").css("animation", "none");
                $(this).find(".play-pause").remove();
                $(this).appendTo("#completed-tasks")
                    .addClass("completed");
            }
        });
    }, 500);


    // Event handlers

    // New task functionality
    $("#new-task").on('click', 'button' , function() {
        var defaultTime = 5;

        //Get values from inputs
        var summaryInput = $("#new-task .summary"),
            durationInput = $("#new-task .duration"),
            summary = summaryInput.val(),
            duration = parseFloat(durationInput.val());
        
        if (!isNaN(duration) && summary !== "") { // Validate inputs
            //Clear inputs
            summaryInput.val("");
            durationInput.val(defaultTime);
            // Create task
            var task = createTaskNode(summary, duration);
            $("#running-tasks").append(task);
            setAnimation(task, duration);
        }
    });

    // Buttons functionality
    // Remove Task
    $("#running-tasks, #completed-tasks").on('click', ".remove", function () {
        $(this).closest(".task").remove();
    });
    // Play/Pause functionality
    $("#running-tasks").on('click', ".play-pause", function () {
        var task = $(this).closest(".task"),
            bar = task.find(".bar");

        // Pause functionality
        if (bar.data("status") == "running") {
            $(this).find('i').removeClass("fa-pause").addClass("fa-play");
            bar.data("status", "paused");
            bar.css("animation-play-state", "paused");
            task.addClass("paused");
        }
        // Play functionality
        else if (bar.data("status") == "paused") {
            $(this).find('i').removeClass("fa-play").addClass("fa-pause");
            bar.data("status", "running");
            bar.css("animation-play-state", "running");
            task.removeClass("paused");
        }
    });
});