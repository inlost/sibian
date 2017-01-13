(function(window, undefined){
    var blog = {
        q: function(selector){
            return document.querySelector(selector);
        },
        /**
         * 发送ajax
         *
         * @param {String} method http方法
         * @param {String} url 请求地址
         * @param {String} data 发送的数据
         * @param {Function} callback 成功后的回调函数
         */
        sendRequest: function(method, url, data, callback){
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            method = method.toUpperCase();
            if(method !== 'GET'){
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }

            xhr.onreadystatechange = function(){
                var result = null;
                if(xhr.readyState === 4){
                    try{
                        result = JSON.parse(xhr.responseText)
                        callback(result);
                    }catch(e){
                        //callback(xhr.responseText)
                    }
                }
            };
            xhr.send(data);
        },
        /**
         * 获取url中的参数列表
         *
         * @returns {Object} 参数列表对象
         */
        getParams: function(){
            //获取查询字符串并转换成数组
            var arrQuery = window.location.search
                .replace('?', '')
                .split('&');
            //保存处理好的查询参数键值对
            var queryParams = {};
            //格式化参数列表
            arrQuery.forEach((item, index, list) => {
                var tmpArr = item.split('=');

                queryParams[tmpArr[0]] = tmpArr[1]
            });

            return queryParams;
        },

        isLogin: function(){
            return document.cookie.includes('isLogin')
        },

        edit: {
            __tmpPost: {
                title: '',
                content: ''
            },
            __timmer: 0,
            domElm: {
                postContenElm: null,
                postTitleElm: null,
                btnSaveElm: null,
                priviewElm: null
            },
            initDoms: function(){
                this.domElm.postContenElm = document.getElementById('textEditor');
                this.domElm.postTitleElm = document.querySelector('.post-title');
                this.domElm.btnSaveElm = document.querySelector('.btn-save');
                this.domElm.priviewElm = document.querySelector('.priview');
            },
            savePost: function(){
                const checkRst = this.checkInput('save');
                const post = this.__tmpPost;

                if(checkRst.isPassInputCheck){
                    let saveStatus = null;

                    blog.sendRequest(
                        'post',
                        '/post',
                        `content=${post.content}&title=${post.title}&type=save`,
                        function(result){
                            if(!result.success){
                                alert(result.errorMessage);
                            }else{
                                location.pathname = '/list.html';
                            }
                        }
                    );
                }
            },
            getPriview: function(){
                let timmer = this.__timmer;
                const _doms = this.domElm;
                const post = this.__tmpPost;
                const checkRst = this.checkInput();

                clearTimeout(timmer);
                console.log(`clear timmer ${timmer}`);

                /*
                    定时器
                    设置定时器 的时间
                    定时器执行 的时间
                    清除定时器 的时间
                */

                this.__timmer = setTimeout(function(){
                    if(checkRst.isPassInputCheck && checkRst.isChange){
                        blog.sendRequest(
                            'post',
                            '/post',
                            `content=${post.content}`,
                            function(result) {

                                _doms.priviewElm.innerHTML = result;
                            });
                    }
                }, 400);
                console.log(`set timmer ${timmer}`);
            },
            checkInput: function(type){
                const post = this.__tmpPost;

                const rst = {
                    isChange: false,
                    isPassInputCheck: false
                };

                const oldContent = post.content;

                this.getInput();
                rst.isChange = oldContent !== post.content;

                if(!post.content.length){
                    rst.isPassInputCheck = false;
                }else{
                    rst.isPassInputCheck = true;
                }

                if(type === 'save' && rst.isPassInputCheck && !post.title.length){
                    rst.isPassInputCheck = false;
                }

                return rst;
            },
            getInput: function () {
                var _ = this.domElm;
                this.__tmpPost.content = _.postContenElm.value;
                this.__tmpPost.title = _.postTitleElm.value;
            },
            initPage: function() {
                this.initDoms();

                const queryParams = blog.getParams();
                const _ = this.domElm;
                if(queryParams.hasOwnProperty('p')){
                    _.postTitleElm.value =  decodeURI( queryParams.p );

                    blog.sendRequest(
                        'get',
                        `/post?p=${queryParams.p}`,
                        null,
                        function(result){
                            _.priviewElm.innerHTML = result.data.strHtml;
                            _.postContenElm.value = result.data.strMd;
                        })
                };

                this.bindDomEvent();
            },
            bindDomEvent: function(){
                const _ = this.domElm;
                const _this = this;

                _.postContenElm.addEventListener('input', function(e){
                    _this.getPriview();
                });
                _.btnSaveElm.addEventListener('click', function(e){
                    e.preventDefault();
                    _this.savePost();
                });
            }
        }
    };

    window.__ = blog;
})(window)
