document.addEventListener("DOMContentLoaded", function() {
    
    
    //load from local storage
    if (JSON.parse(localStorage.getItem("page")) != null) {
        document.documentElement.innerHTML = JSON.parse(localStorage.getItem("page"));
    }

    //save to local storage on manual input
    let area = document.getElementsByClassName("tab-pane");
    for (var i = 0; i < area.length; i++) {
        area[i].addEventListener("input", function() {
            localStorage.setItem("page", JSON.stringify(document.documentElement.innerHTML));
        });
    }
    

    //paste as plain text
    let txtarea = document.getElementsByClassName("tab-pane");
    for (var i = 0; i < txtarea.length; i++) {
        txtarea[i].addEventListener("paste", function(e) {
            e.preventDefault()

            let cliptxt = e.clipboardData.getData("text/plain");

            const range = document.getSelection().getRangeAt(0);
            range.deleteContents();

            let textNode = document.createTextNode(cliptxt);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);

            let selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            //save to local storage on paste event
            localStorage.setItem("page", JSON.stringify(document.documentElement.innerHTML));
        });
    }

    //scroll tab panel by mousewheel
    const scrollContainer = document.querySelector("ul");

    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    });

    
    //buttons
    document.getElementById("B").addEventListener("click", () => {   
        document.execCommand("bold", null, false);  
    })

    document.getElementById("I").addEventListener("click", () => { 
        document.execCommand("italic", null, false);
    })

    document.getElementById("U").addEventListener("click", () => {
        document.execCommand("underline", null, false);
    })

    document.getElementById("UL").addEventListener("click", () => {
        document.execCommand("insertUnorderedList");
    })
    document.getElementById("UL").addEventListener("mouseenter", () => {
        document.getElementById("UL").src="icons/ul2.png";
    })
    document.getElementById("UL").addEventListener("mouseleave", () => {
        document.getElementById("UL").src="icons/ul1.png";
    })

    document.getElementById("OL").addEventListener("click", () => {
        document.execCommand("insertOrderedList");
    })
    document.getElementById("OL").addEventListener("mouseenter", () => {
        document.getElementById("OL").src="icons/ol2.png";
    })
    document.getElementById("OL").addEventListener("mouseleave", () => {
        document.getElementById("OL").src="icons/ol1.png";
    })

    document.getElementById("stt").addEventListener("click", () => {
        window.open("options.html"); 
        document.getElementById("stt").src="icons/stt1.png";
        //needs custom save, bc on click new windows is open without mousemove, thus not saving the change in icon
        localStorage.setItem('page', JSON.stringify(document.documentElement.innerHTML));
    })
    document.getElementById("stt").addEventListener("mouseenter", () => {
        document.getElementById("stt").src="icons/stt2.png";
    })
    document.getElementById("stt").addEventListener("mouseleave", () => {
        document.getElementById("stt").src="icons/stt1.png";
    })


    //create new tabs
    $('#add').click(function () {
        var mylist = document.getElementById("tabs");
        // id 0f the last list item
        var lastElement = mylist.lastElementChild.id;
        var nextTab = parseInt(lastElement) + 1;

        // create the tab
        $('<li class="nav-item" id='+nextTab+'><a class="nav-link" href="#tab'+nextTab+'" data-toggle="tab" id="t'+nextTab+'" title="tab'+nextTab+'"><b>Note'+nextTab+'</b><span class="close"> x</span></a></li>').appendTo('#tabs');
        
        // create the tab content
        $('<div class="tab-pane" id="tab'+nextTab+'" contenteditable="true"></div>').appendTo('#tabs-content');
    
        // make the new tab active
        $('#tabs a:last').tab('show');
        
        localStorage.setItem("page", JSON.stringify(document.documentElement.innerHTML));
        location.reload();
        
    });


    //show tab on panel click
    $("#tabs a").click(function(){
        $(this).tab("show");
    })

    
    //remove tabs
    var close = document.getElementsByClassName("close");
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            //making nav-link anchor active to avoid illegal invocation error from bootstrap
            this.parentElement.className += " active";
            this.parentElement.closest("li").remove();

            var tabchref = this.parentElement.getAttribute("title");
            var tabc = document.getElementById(tabchref)
            tabc.remove();

            //show previous note
            $("#tabs a:last").tab("show");

            localStorage.setItem("page", JSON.stringify(document.documentElement.innerHTML));
            location.reload();
        }
    }


    //edit note title
    let tabarea = document.getElementsByClassName("nav-link");
    for (var k = 0; k < tabarea.length; k++) {
        //start editing on doubleclick
        tabarea[k].addEventListener("dblclick", function() {
            this.classList.add(this.contentEditable = "true")
        })
        //save title by changing focus
        tabarea[k].addEventListener("focusout", function() {
            this.classList.add(this.contentEditable = "false")
        })
    }

});


//load user selected font and size on load
let txtarea = document.getElementsByClassName("tab-pane");
window.onload = function() {
    chrome.storage.sync.get("selectedFont", function (item) {     
        for (var j = 0; j < txtarea.length; j++) {
            txtarea[j].style.fontFamily = item.selectedFont;
        }
    });
    chrome.storage.sync.get("selectedFontSize", function (item) {     
        for (var j = 0; j < txtarea.length; j++) {
            txtarea[j].style.fontSize = item.selectedFontSize;
        }
    });
    //bc of the delay on moving the mouse out of the popup
    document.getElementById("stt").src="icons/stt1.png";
    document.getElementById("UL").src="icons/ul1.png";
    document.getElementById("OL").src="icons/ol1.png";

    //open extension on last active tab
    var element = document.querySelector('#tabs > li.nav-item > a.active');
    element.scrollIntoView(false);
}