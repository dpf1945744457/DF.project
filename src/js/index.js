$(function () {

    // 头部划过显示隐藏
    $(".myyiguo").mouseenter(function () {
        $(".myyiguo>.con").css("display", "block")
    })
    $(".myyiguo").mouseleave(function () {
        $(".myyiguo>.con").css("display", "none")
    })

    $(".mobile").mouseenter(function () {
        $(".mobile>.con").css("display", "block")
    })
    $(".mobile").mouseleave(function () {
        $(".mobile>.con").css("display", "none")
    })

    //头部超出定位=============================================
    window.onload = function () {
        var top = $("#top")[0]
        var nav = $("#nav")[0]
        var topHeight = top.offsetHeight;
        var navHeight = nav.offsetHeight
        var pict = $('#pict')

        window.onscroll = function () {
            //如果滚动距离超过top的高度
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > (topHeight + navHeight)) {
                $("#nav").addClass('fixed')
            } else {
                $("#nav").removeClass('fixed')
            }
        }
    }

    // 底部返回按钮======================================
    var oBack = document.getElementById('back');
    var timer;

    // if (scrollTop > 38) {
    //     oBack.style.display = "block"
    // }
    oBack.onclick = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        clearInterval(timer);
        timer = setInterval(function () {
            scrollTop -= 50;
            // console.log(scrollTop)
            if (scrollTop >= 38) {
                oBack.style.display = "block"
            }
            if (scrollTop < 38) {
                oBack.style.display = "none"
            }
            if (scrollTop <= 0) {
                console.log("<0")
                clearInterval(timer);
                scrollTop = 0;
            }
            document.documentElement.scrollTop = scrollTop;
            document.body.scrollTop = scrollTop;
        }, 30);



    }


    //关键字查询
    var searchInput = $(".search-input")[0]
    var ul = $(".search>ul")[0]

    console.log(searchInput)
    console.log(ul)

    var flag = true;//判断用户是否输入完成,默认是完成的
    searchInput.addEventListener('compositionstart', function () {
        flag = false;
    })
    searchInput.addEventListener('compositionend', function () {
        flag = true;
    })
    searchInput.oninput = function () {
        setTimeout(function () {
            if (flag) {

                var keyword = searchInput.value;//输入的关键字


                // //方法一
                // //创建script标签
                var script = document.createElement('script');
                // //定义一个函数名
                var cbName = 'phone' + new Date().getTime() + Math.random().toString().slice(2);
                // //设置该标签的src属性
                script.src = "https://suggest.taobao.com/sug?code=utf-8&q=" + keyword + "&_ksTS=1563970517892_385&callback=" + cbName + "&k=1&area=c2c&bucketid=10";
                // //定义一个函数,以备调用
                window[cbName] = function (data) {
                    var result = data.result;//是一个数组
                    var str = "";
                    result.forEach(function (value) {
                        str += "<li>" + value[0] + "</li>"
                    })
                    ul.innerHTML = str
                    script.remove()
                }
                document.body.appendChild(script);
            }
            ul.css({
                "border": '1px solid #000',
                "borderTop": 'none'
            })
        }, 0)
    }
    // 楼层跳动
    var floorMove = $("#floorMove")  //装楼层li的大盒子
    var floorOne = $(".floorOne")     //装楼层数字的标签li
    var common = $(".common")    //五个楼的标签

    // console.log(floorMove)
    // console.log(floorOne)
    // console.log(common)

    $(window).on("scroll", function () {
        var sTop = $(document).scrollTop()
        console.log(sTop)
        if (sTop > 600 && sTop < 3000) {
            floorMove.css("display", "block")
        } else {
            floorMove.css("display", "none")
        }
        for (var i = 0; i < common.length; i++) {
            if (Math.abs(common[i].offsetTop - sTop) < common[i].offsetHeight / 2) {
                //此时 变量i 就是楼层的下标 
                //根据楼层的下标  获取到楼层号  
                floorOne[i].style.backgroundColor = "orange";
            } else {
                floorOne[i].style.backgroundColor = "#ccc";
            }
        }
        floorMove.on("click", function (e) {
            var e = e || event;
            var target = e.target || e.srcElement;
            if (target.tagName == "LI") {
                for (var i = 0; i < floorOne.length; i++) {
                    floorOne[i].style.backgroundColor = "#ccc";
                    floorOne[i].index = i;//为每一个楼层号添加下标
                }
                target.style.backgroundColor = "orange";
                $(document).scrollTop() = floorOne[target.index].offsetTop;
            }
        })
    })

// 轮播图特效
    var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        }
    })
    //购物车
    var total = 0;
    var totalArr = JSON.parse(localStorage.getItem('cart'));
    console.log(totalArr)
    if (localStorage.getItem('cart') == null) {
        return;
    } else {
        totalArr.forEach(function (value) {
            total += value.num
        })
    }   

    $(".total").html(total)
    console.log($(".total"))
})


