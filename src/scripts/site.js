import * as $ from 'jquery';
import '../styles/global.scss';
import '../styles/index.scss';

$(document).ready(function() {
    var downloadAddress;
    // apk
    $.ajax({
        type: "GET",
        url: "https://iwallic.forchain.info/client/index/app_version/detail",
        dataType: 'json',
        success: function(data) {
            $('.version').text('v' + data.data.name);
            downloadAddress = data.data.url;
        }
    })

    var articleWidth = document.body.clientWidth;
    if (articleWidth > 930) {
        $(".download").hide();
        $(".pc-download").show();
    } else {
        $(".download").show();
        $(".pc-download").hide();
    }

    $(window).on("resize", function() {
        articleWidth = document.body.clientWidth;
        if (articleWidth > 930) {
            $(".download").hide();
            $(".pc-download").show();
        } else {
            $(".download").show();
            $(".pc-download").hide();
        }
    });

    // toggle language
    if (window.location.href.indexOf('en') >= 0) {
        $('.dropbtn span').text('English');
    } else {
        $('.dropbtn span').text('中文简体');
    }
    $('.dropbtn').on('click', function() {
        $('.dropdown-content').fadeIn('normal');
    })
    $('.dropbtn').on('touchstart', function() {
        $('.dropdown-content').fadeIn('normal');
    })

    // toggle language dropcontent
    $('body').on('click', function(e) {
        e = e || window.event;
        var obj = e.target || e.srcElement;
        if ($(obj).closest(".dropbtn").length <= 0) { // If the clicked area has no id comment, it will hide the explain
            $('.dropdown-content').fadeOut('normal');
        }
    })
    $('body').on('touchend', function(e) {
        e = e || window.event;
        var obj = e.target || e.srcElement;
        if ($(obj).closest(".dropbtn").length <= 0) { // If the clicked area has no id comment, it will hide the explain
            $('.dropdown-content').fadeOut('normal');
        }
    })

    // android download
    $('.btn-android').on('click', function() {
        if (is_weixn()) {
            var winHeight = $(window).height();
            $(".weixin-tip").css("height", winHeight);
            if (window.location.href.indexOf('en') >= 0) {
                $(".weixin-tip img").attr("src", "../assets/guide-en.png");
            }
            $(".weixin-tip").fadeIn();
        } else {
            if (downloadAddress) {
                window.location.href = downloadAddress;
            }
        }
    });

    $('.weixin-tip button').on('click', function() {
        $(".weixin-tip").fadeOut();
    })

    // is wechat browser
    function is_weixn() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
})