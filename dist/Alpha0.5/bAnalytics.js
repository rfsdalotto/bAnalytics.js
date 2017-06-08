(function() {
    var debug = false;
    var maccontrolKey = false;
    var time = 150;

    bAnalytics = function() {

    }

    bAnalytics.init = function(options){
        var waitReady = true;
        var unbind = true;

        if(options != undefined){
            try{
                waitReady = options.waitReady;
                unbind    = options.unbind;
                debug     = options.debug;
            }catch(err){console.error(err);}
            if(debug){console.log(options);}
        }

        if(waitReady){
            $(document).ready(function(){
                bind_events();
            });
        }
        else{
            bind_events(unbind);
        }
        console.log("bAnalytics.js initialized");
        init_mac_listeners();
    }

    bAnalytics.rebind = function(unbind){
        bind_events(unbind);
    }

    bAnalytics.bind_element = function(div){
        div.unbind();
        div.click(function(e){
            send_ga_data($(this));
            if($(this).attr('data-preventdefault') != 'false'){
                set_timeout(e);
            }
            else{
                if(debug){console.log(e); console.log("preventDefault");}
            }
        });
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

    bAnalytics.set_event = function(div, cat, act, lbl, options){
        var preventDefault = true;

        div.attr('data-gaevent', '');
        div.attr('data-gacat', cat);
        div.attr('data-gaact', act);
        div.attr('data-galbl', lbl);

        if(options != undefined){
            try{
                if(options.preventDefault == false){
                    preventDefault = false;
                }
            }catch(err){console.error(err);}
        }

        div.attr('data-preventdefault', preventDefault);
    }

    var set_timeout = function(e){
        if(debug){
            console.log(e);
        }

        if(e.button == 1){
            if(debug){console.log("Middle Button");}
            middle_button_events(e);
        }
        else{
            if(debug){console.log("Left Button");}
            left_button_events(e);
        }
    }

    var middle_button_events = function(e){
        e.preventDefault();
        var url;

        if(check_href(e)){url = e.target.href;}
        else{url = e.target.parentElement.href;}

        setTimeout(function() {
            var nw = window.open(url, '_blank');
        }, time);
    }

    var left_button_events = function(e){
        e.preventDefault();
        var url;
        var target;

        if(check_href(e)){url = e.target.href;}
        else{url = e.target.parentElement.href;}

        if(check_target(e)){target = e.target.target;}
        else{target = e.target.parentElement.target;}

        if(debug){console.log("URL: " + url); console.log("Target: " + target);}

        if (target != '_blank' && !e.ctrlKey && !maccontrolKey) {
            setTimeout(function() {location.href = url;}, time);
        }
        if (target == '_blank' && !e.ctrlKey && !maccontrolKey) {
            if(debug){console.log("New tab")}
            setTimeout(function() {
                var nw = window.open(url, '_blank');
            }, time);
        }
        if (target == '_blank' && e.ctrlKey || maccontrolKey) {
            if(debug && e.ctrlKey){console.log("Ctrl Key")}
            if(debug){console.log("New tab")}
            setTimeout(function() {
                var nw = window.open(url, '_blank');
            }, time);
        }
    }

    var check_href = function(e){
        if(e.target.href == undefined){return false;}
        else{return true;}
    }

    var check_target = function(e){
        if(e.target.target == undefined){return false;}
        else{return true;}
    }

    var bind_events = function(unbind){
        if(unbind){
            $('[data-gaevent]').unbind();
        }
        $('[data-gaevent]').click(function(e){
            send_ga_data($(this));
            if($(this).attr('data-preventdefault') != 'false'){
                if(debug){console.log("preventDefault")}
                set_timeout(e);
            }
            else{
                if(debug){console.log(e); console.log("!preventDefault");}
            }
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
                if(debug && maccontrolKey){console.log("MacOS Command Key");}
            }
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