(function($) {

    //carrousel为插件名， options外部配置
    $.fn.carrousel = function(options) {

        var itemList = $(this).find('.content-item');
        var length = itemList.length;
        var sh = 0;

        //默认配置
        var dft = {
            index: 0,         //默认显示索引
            time: 2000,       //自动切换的时间
            autoPlay: 1,      //是否开启自动切换 1-开启,0-关闭
            preText: '<',     //向前切换的按钮内容
            nextText: '>',    //向后切换的按钮内容
            plusClass: '',    //附加样式类
            isShowDot: 1,     //是否显示小圆点 1-显示,0-隐藏
            isShowChange: 1   //是否显示切换按钮 1-显示，0-隐藏
        }

        //合并配置(options 是外部传入的配置)
        var opt = $.extend(dft, options);

        //附加样式类
        $(this).addClass(opt.plusClass);

        //初始化,补充DOM结构
        if(opt.isShowChange) {
            $(this).append('<div class="carrousel-pre">' + opt.preText + '</div>');
            $(this).append('<div class="carrousel-next">' + opt.nextText + '</div>');
        }

        if(opt.isShowDot) {
            var s = '';
            for(var i = 0; i < length; i++) {
                s = s + '<li></li>';
            }
            $(this).append('<div class="carrousel-dot">' + s + '</div>');
        }

        //初始化切换
        change();

        //如果自动播放
        if(opt.autoPlay == 1) {
            sh = setInterval(function() {
                next();
            }, opt.time);
        }

        //当点击下一个时
        $(this).find('.carrousel-next').click(function() {
            sh = clearInterval(sh);
            next();
            if(opt.autoPlay == 1) {
                sh = setInterval(function() {
                    next();
                }, opt.time);
            }
        })

        //当点击上一个时
        $(this).find('.carrousel-pre').click(function() {
            sh = clearInterval(sh);
            pre();
            if(opt.autoPlay == 1) {
                sh = setInterval(function() {
                    next();
                }, opt.time);
            }
        })

        //当点击小圆点时候
        $(this).find(".carrousel-dot li").each(function(i, o) {
            $(this).click(function() {
                sh = clearInterval(sh);
                opt.index = i;
                change();
                if(opt.autoPlay == 1) {
                    sh = setInterval(function() {
                        next();
                    }, opt.time);
                }
            });
        });

        //切换
        function change() {
            itemList.each(function(i, o) {
                if(i == opt.index) {
                    $(this).fadeIn();
                } else {
                    $(this).fadeOut();
                }
            })
        }

        //下一个
        function next() {
            opt.index = opt.index + 1;
            if(opt.index == length) {
                opt.index = 0;
            }
            change();
        }

        //上一个
        function pre() {
            opt.index = opt.index - 1;
            if(opt.index == -1) {
                opt.index = length - 1;
            }
            change();
        }

    }
})(window.jQuery);