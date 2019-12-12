$(function(){
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
    var products = [{
        pic: "./img/111.jpg",
        name: "牛奶草莓",
        price: "38",
    },
    {
        pic: "./img/112.jpg",
        name: "柠檬",
        price: "10",
    },
    {
        pic: "./img/109.jpg",
        name: "苹果",
        price: "16",
    },
    {
        pic: "./img/113.jpg",
        name: "西瓜",
        price: "15",
    },
    {
        pic: "./img/110.jpg",
        name: "橙子",
        price: "25",
    },
    {
        pic: "./img/106.jpg",
        name: "葡萄 ",
        price: "25",
    },
    {
        pic: "./img/108.jpg",
        name: "水果捞 ",
        price: "213",
    }
]

function setStorage(json) {
    localStorage.setItem('cart', JSON.stringify(json));
}

function getStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function renderCartList() {
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
    console.log( $(".total"))
    var str = `<h2>购物车</h2>
         <table>
             <tr>
                <td>商品图片</td>
                <td>名称和规格</td>
                <td>数量</td>
                <td>价格</td>
                <td>操作</td>
            </tr>`
    var sum = 0;
    getStorage().forEach((product) => {
        sum += product.price * product.num;

        console.log(sum)
        str += `<tr>
                <td><img src="${product.pic}"></td>
                <td>${product.name}</td>
                <td>
                    <span class="jian">-</span>
                    <span>${product.num}</span>
                    <span class="jia">+</span>
                </td>
                <td>${product.price*product.num}</td>
                <td>
                    <a href="javascript:;" class="del">删除商品</a>
                </td>
            </tr>`

    })
    str += `<tr>
                <td></td>
                <td></td>
                <td style="font-size:20px;">${total} 件商品</td>
                <td style="font-size:20px;">总计￥${sum}.00</td>
                <td class="Clearing"><div>结算</div></td>
            </tr>
            </table>`
    cart.innerHTML = str

    //删除购物车商品
    function deleteProductEvent() {
        $(".del").on("click", function () {
            var name = $(this).parent().parent().children().eq(1).html()
            console.log(name)
            var cartProducts = getStorage();
            //过滤 去掉点击的
            cartProducts = cartProducts.filter(function (product) {
                if (product.name == name) {
                    return false;
                } else {
                    return true;
                }
            })
            setStorage(cartProducts);
            renderCartList();
        })
    }
    deleteProductEvent()


    $(".jian").on("click", function () {
        var arr = getStorage()
        var name = $(this).parent().parent().children().eq(1).html()
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name == name) {
                arr[i].num--;
                if (arr[i].num <= 0) {
                    arr = arr.filter(function (product) {
                        if (product.name == name) {
                            return false;
                        } else {
                            return true;
                        }
                    })
                    setStorage(arr)
                    renderCartList()
                }
                setStorage(arr)
                renderCartList()
                return
            }
        }
        renderCartList()
    })

    $(".jia").on("click", function () {
        var arr = getStorage()
        var name = $(this).parent().parent().children().eq(1).html()
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name == name) {
                arr[i].num++;
                setStorage(arr)
                renderCartList()
                return
            }
        }
        renderCartList()
    })
}
var cart = document.getElementById("cart");
//渲染商品列表
renderCartList()
var str = `<h2>商品列表</h2><table>`
str += `<tr>
            <td>商品图片</td>
            <td>名称和规格</td>
            <td>数量</td>
            <td>价格</td>
            <td>操作</td>
        </tr>`
products.forEach(function (value) {
    str += `<tr>
                <td><img src='${value.pic}'></td>
                <td>${value.name}</td>
                <td>1</td>
                <td>${value.price}</td>
                <td>
                    <a href="javascript:;" class="addCart">加入购物车</a>
                </td>
            </tr>`
})
str += "</table>";
$("#list").html(str)

var addCartBtnArr = $(".addCart")
$.each(addCartBtnArr, function (index, value) {
    addCartBtnArr[index].onmousedown = function () {
        var tr = $(this).parent().parent();
        // console.log(tr)
        var currentProduct = {
            pic: tr.children().eq(0).children().attr("src"),
            name: tr.children().eq(1).html(),
            price: tr.children().eq(3).html()
        }
        // console.log(currentProduct)
        var cartProducts = getStorage()
        // console.log(cartProducts)
        for (var i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].name == currentProduct.name) {
                cartProducts[i].num++
                setStorage(cartProducts);
                renderCartList()
                return;
            }
        }
        currentProduct.num = 1
        cartProducts.push(currentProduct);
        setStorage(cartProducts)
        renderCartList()

    }
})
})


