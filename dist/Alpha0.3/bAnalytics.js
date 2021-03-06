(function() {
    var debug = false;
    var maccontrolKey = false;
    var time = 150;

    bAnalytics = function() {

    }

    bAnalytics.init = function(waitReady){
        if(waitReady){
            $(document).ready(function(){
                bind_events();
            });
        }
        else{
            bind_events();
        }

        init_mac_listeners();
    }

    bAnalytics.rebind = function(){
        bind_events();
    }

    bAnalytics.set_time = function(newTime){
        if(debug){console.log("Tempo de espera atual: " + time + "ms");}
        if(!newTime.isNaN && newTime >= 0){
            newTime = parseInt(newTime);
            time = newTime;
            if(debug){console.log("Novo tempo de espera: " + time + "ms");}
        }
        else{
            console.error("Tempo deve ser um número inteiro maior ou igual que zero.");
        }
    }

    var set_timeout = function(e){
        if(debug){
            console.log(e);
        }

        if(e.button == 1){
            middle_button_events(e);
        }
        else{
            left_button_events(e);
        }
    }

    var middle_button_events = function(e){
        e.preventDefault();
        var url = e.target.href;
        setTimeout(function() {
            var nw = window.open(url, '_blank');
        }, time);
    }

    var left_button_events = function(e){
        if (e.target.target != '_blank' && !e.ctrlKey && !maccontrolKey) {
            e.preventDefault();
            var url = e.target.href;
            setTimeout(function() {location.href = url;}, time);
        }
        if (e.target.target == '_blank' && e.ctrlKey || maccontrolKey) {
            e.preventDefault();
            var url = e.target.href;
            setTimeout(function() {
                var nw = window.open(url, '_blank');
            }, time);
        }
    }

    var bind_events = function(){
        $('[data-gaevent]').unbind();
        $('[data-gaevent]').click(function(e){
            send_ga_data($(this));
            set_timeout(e);
        });
    }

    var init_mac_listeners = function(e){
        window.onkeydown = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if(!maccontrolKey){
                if (key == 224) {maccontrolKey = true;}
                if (key == 17)  {maccontrolKey = true;}
                if (key == 91)  {maccontrolKey = true;}
                if (key == 93)  {maccontrolKey = true;}
            }
            if(debug){console.log(key);}
        }
        window.onkeyup = function(e) {
            maccontrolKey = false;
            if(debug){console.log("KeyUp");}
        }
    }

    var send_ga_data = function(eventObject){
        var category = eventObject.attr('data-gacat');
        var action   = eventObject.attr('data-gaact');
        var label    = eventObject.attr('data-galbl');

        if(category == undefined){
            category = "CategoryNotSet";
            action = eventObject.attr('class');
            label = eventObject.text();
        }
        if(action == undefined){action = "ActionNotSet";}
        if(label == undefined){label = "LabelNotSet";}

        ga('send', 'event', category, action, label);

        if(debug){
            console.log("GA Send {");
            console.log("Category: " + category);
            console.log("Action: "   + action);
            console.log("Label: "   + label + " }");
        }
    }

    bAnalytics.toggle_debug = function(command){
        debug = command;
    }
}());