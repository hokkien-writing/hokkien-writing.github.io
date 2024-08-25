(function ($) {
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function () {
    isSearchAnim = true;
  };

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
      $('#local-search-input').val('');
      $('#local-search-result').html('');
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function () {
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function () {
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function (e) {
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
        '<input class="article-share-input" value="' + url + '">',
        '<div class="article-share-links">',
        '<a href="http://service.weibo.com/share/share.php?url=' + encodedUrl + '" class="article-share-weibo" target="_blank" title="Weibo"></a>',
        
        '<a href="http://qr.liantu.com/api.php?text=' + encodedUrl + '" class="article-share-weixin" target="_blank" title="Weixin"><i class="fab fa-weixin"></i></a>',
        '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
        '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function () {
    $(this).select();
  }).on('click', '.article-share-box-link', function (e) {
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function (i) {
    $(this).find('img').each(function () {
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function () {
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox) {
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function () {
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function () {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

  jQuery(document).ready(function($) {
    $('#mobile-nav .mobile-nav-main').each(function() {
      // 检查当前项是否有子菜单
      var hasSubmenu = $(this).children('.submenu').length > 0;
  
      if (hasSubmenu) {
        var submenuId = $(this).data('submenu');
        var $submenu = $('#submenu_' + submenuId);
  
        $(this).on('click', function(e) {
          e.preventDefault();
          $submenu.toggle(); // 显示或隐藏对应子菜单
          $(this).toggleClass('active'); // 切换active类
        });
  
        // 如果子菜单初始状态下是隐藏的，确保点击时显示
        if (!$submenu.is(':visible')) {
          $submenu.hide();
        }
  
        // 添加子菜单项的点击事件
        $submenu.find('a').on('click', function(e) {
          e.preventDefault();
          window.location.href = $(this).attr('href'); // 跳转到子菜单项的链接
        });
      }
    });
  });
  

})(jQuery);