$(function(){
    
    $(".green").click(function(){
        $(".login-two").fadeIn()
        $(".login-one").fadeOut()
    })
    $(".red").click(function(){
        $(".login-one").fadeIn()
        $(".login-two").fadeOut()

    })

    //登录 注册
    var  UserName = $("#UserName")[0] //登录用户名
    var Pwd = $("#Pwd")[0] //登录密码
    var btnLogin = $("#btnLogin") //登录按钮
    var btnSign = $("#btnSign") //注册按钮
    var UserSign = $("#UserSign")[0]  //注册用户名
    var PwdSign = $("#PwdSign")[0] //注册密码
    var hint = $(".hint") //显示登录信息成功的文本框

  

    // localStorage.Pwd = '666'
    // localStorage.age = 13
    // localStorage.sex = "男"
    // localStorage.UserName = "zhangsan";
    // localStorage.UserName = 11


    // localStorage.setItem(usVal,psVal) 

    
    //登录
    btnLogin.click(function(){
        var UserVal = UserName.value  //获取登录用户名的值
        var PwdVal = Pwd.value      //获取登录密码的值
       
        // localStorage.setItem(UserVal,PwdVal)
        console.log(localStorage)
        if( localStorage.getItem(UserVal) && localStorage.getItem(PwdVal)){
           
            console.log("登录成功")
            var count = 4
            var timer = null
            timer = setInterval(function(){
              
                count--
                console.log(count)
                if(count<=1){
                    window.location.href="http://localhost:9090/"
                    // clearInterval(timer)
                }
                hint.html("√恭喜你，登录成功 还有" +count+ "秒进入页面") 
                hint.css({
                    "display":'block',
                    "color":'green',
                    "fontSize":"18px"
                })
            },1000)
        }else{

            hint.html("×账号或密码错误！")  
            hint.css({
                "display":'block',
                "color":'red',
                "fontSize":'22px'
                })
         
           
        }
    })

    //注册
    btnSign.click(function(){
        
        var usVal = UserSign.value  //注册的用户名
        var psVal= PwdSign.value      //注册的密码

      
        console.log(localStorage)

        if(usVal == localStorage.UserName&&psVal == localStorage.Pwd){
            
            hint.html("×账号已存在，请尝试更换") 
            hint.css({
                "display":'block',
                "color":'red',
                "fontSize":"18px"
            })
            
        }else{
            localStorage.setItem(usVal,psVal)
            console.log("注册成功")
            console.log(localStorage)

            var count = 4
            var timer = null
            timer = setInterval(function(){
              
                count--
                console.log(count)
                if(count<=1){
                    window.location.href="http://localhost:9090/"
                    // clearInterval(timer)
                }
                hint.html("√恭喜你，注册成功 还有" +count+ "秒进入页面") 
                hint.css({
                    "display":'block',
                    "color":'green',
                    "fontSize":"18px"
                })
            },1000)

            localStorage.setItem(usVal,psVal) 

            // console.log("用户名或密码错误")
            // hint.css({
            //     "display":'block',
            //     "color":'red',
            //     "fontSzie":'16px'
            //     })
            // // hint.innerHTML = 
            // hint.html("账号或密码错误！")  
        }
    })

   

    


    


   

         
        


    
  













})