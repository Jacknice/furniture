/**
 * Created by bjwsl-001 on 2016/10/29.
 */
$(function () {
  $('div#header').load('header.php');
  $('div#footer').load('footer.php');
});

//分页加载商品数据，并动态创建分页条 product页面异步加载效果
function loadProductByPage(pageNum) {
  p = pageNum;
  $.ajax({
    url: 'data/product_select.php?pageNum=' + pageNum,
    success: page
  });
}

function page(pager) {
  var html = '';
  html = `<span>共${pager.recordCount}条 每页${pager.pageSize}条 首次: ${p}/2</span>`;

  $('.show-info .left').html('').html(html);
  //遍历读取到分页器对象，拼接HTML，追加到DOM树
  var html = '';
  $.each(pager.data, function (i, p) {
    html += `
          <div class="group">
                    <a href="#"><img src="imgs/${p.img}"/></a>
                    <p>${p.p}</p>
          </div>
        `;
  });
  $('.product-show').html(html);
}

//页面加载时显示第一页
loadProductByPage(1);

$(".show-info .right ul").on('click', 'li', function (e) {
  var $targer = $(e.target);
  if ($targer.html() == '2' || $targer.html() == '下一页' || $targer.html() == '尾页') {
    loadProductByPage(2);
  } else {
    loadProductByPage(1);
  }
})

//导航条悬停事件e
$("div#header").on('click', 'nav ul li a', function (e) {
  e.target.addClass("hover");
  console.log(e.target);
})

//导航栏
$('#header').on('mouseover', 'nav ul li', function (e) {
  var $target = e.target;
  if ($target.nodeName == 'LI') {
    $($target).addClass("hover").siblings(".hover").removeClass();
  }
})

//精品展示前后
var t = 0, b = 0, f = 3, l = 0;
$("#back").on('click', function temp() {
  if (l == 0) {
    $(this).children().css('border-left-color','#888888');
  } else if (l) {
    t += 150;
    $(this).next().children("ul").css("left", t + "px");
    $(this).next().next().children().css('border-left-color','#000000');
    --l;
    console.log(l);
    f++;
  }
});

$("#farw").on('click', function temp() {
  if (f == 0) {
    $(this).children().css('border-left-color','#888888');
  }else if(f){
    t -= 150;
    $(this).prev().children("ul").css("left", t + "px");
    $(this).children().css('border-left-color','#000000');
    $(this).prev().prev().children().css('border-left-color','#000000');
    ++l;
    f--;
  }
});

































