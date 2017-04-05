/**
 * Created by bjwsl-001 on 2016/10/29.
 */
$(function () {
  $('div#header').load('header.php');
  $('div#footer').load('footer.php');
});

//分页加载商品数据，并动态创建分页条 shop页面异步加载效果
function loadProductByPage1(pageNum) {
  p=pageNum;
  $.ajax({
    url: 'data/product_select1.php?pageNum=' + pageNum,
    success:page
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
loadProductByPage1(1);


$(".show-info .right ul").on('click', 'li', function (e) {
  var $targer = $(e.target);
  if ($targer.html() == '2' || $targer.html() == '下一页' || $targer.html() == '尾页') {
    loadProductByPage1(2);
  } else {
    loadProductByPage1(1);
  }
})