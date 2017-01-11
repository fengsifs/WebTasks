/**
 * Created by FengSi on 2017/01/11 0011.
 */
//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, true);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

//遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递，后面用
function each(arr, fn) {
    for (var cur = 0; cur < arr.length; cur++) {
        fn(arr[cur], cur);
    }
}

window.onload = function() {
    var container = document.getElementById("container");
    var buttonList = document.getElementsByTagName("input");
    //定义队列的对象
    var queue = {
        str: [],

        leftPush: function (num) {
            if (this.str.length == 60) {
                alert("Cannot input more than 60 numbers!");
            }
            else {
                this.str.unshift(num);
                this.paint();
            }
        },

        rightPush: function (num) {
            if (this.str.length == 60) {
                alert("Cannot input more than 60 numbers!");
            }
            else {
                this.str.push(num);
                this.paint();
            }
        },

        isEmpty: function () {
            return (this.str.length == 0);
        },

        leftPop: function () {
            if (!this.isEmpty()) {
                alert(this.str.shift());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },

        rightPop: function () {
            if (!this.isEmpty()) {
                alert(this.str.pop());
                this.paint();
            }
            else {
                alert("The queue is already empty!");
            }
        },

        paint: function () {
            var str = "";
            each(this.str, function (item) {
                str += ("<div style='height: " + item +
                "px; margin-top: " + (100 - item) + "px;'></div>")
            });
            container.innerHTML = str;
            addDivDelEvent();
        },

        deleteID: function (id) {
            console.log(id);
            this.str.splice(id, 1);
            this.paint();
        },

    };

    function BubbleSort() {
        var Clock;
        var count = 0, i = 0;
        console.log(queue.str.length)
        Clock = setInterval(function() {
            if (count >= queue.str.length) {
                clearInterval(Clock);
            }
            if (i == queue.str.length - 1 - count) {
                i = 0;
                count++;
            }
            if (queue.str[i] > queue.str[i + 1]) {
                var temp = queue.str[i];
                queue.str[i] = queue.str[i + 1];
                queue.str[i + 1] = temp;
                queue.paint();
            }
            i++;
        }, 1000);
    }

    //为container中的每个div绑定删除函数
    function addDivDelEvent() {
        for (var cur = 0; cur < container.childNodes.length; cur++) {

            //这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length);
            addEvent(container.childNodes[cur], "click", function(cur) {
                return function(){return queue.deleteID(cur)};
            }(cur));
        }
    }

    //为4个按钮绑定函数
    addEvent(buttonList[1], "click", function() {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)) {
            var number = parseInt(input);
            if (number >= 10 && number <= 100)
                queue.leftPush(input);
            else
                alert("Please enter an integer between 10 and 100!");
        }
        else {
            alert("Please enter an interger!");
        }
    });
    addEvent(buttonList[2], "click", function() {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)) {
            var number = parseInt(input);
            if (number >= 10 && number <= 100)
                queue.rightPush(number);
            else
                alert("Please enter an integer between 10 and 100!");
        }
        else {
            alert("Please enter an interger!");
        }
    });
    addEvent(buttonList[3], "click", function(){queue.leftPop()});
    addEvent(buttonList[4], "click", function(){queue.rightPop()});
    addEvent(buttonList[5], "click", function () {
        BubbleSort();
    })
}