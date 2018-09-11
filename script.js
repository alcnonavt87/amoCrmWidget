define(['jquery', 'lib/components/base/modal'], function ($, Modal) {
    var CustomWidget = function () {
        var self = this,
        system = self.system;
        self.sendInfo = function () {
            self.crm_post(
					console.log("Send post"),
                'https://8d454a97.ngrok.io/frondevo.loc/index.php',
                {
                    name: 'test',
                    phones: 2,
                    emails: 3
                },
                function (msg) {
					console.log(msg);
                },
                'json'
            );
        };
        self.renderModal = function (data) {
            modal = new Modal({
                class_name: 'modal-window',
                init: function ($modal_body) {
                    var $this = $(this);
                    $modal_body
                        .trigger('modal:loaded')
                        .html(data)
                        .trigger('modal:centrify')
                        .append('<span class="modal-body__close"><span class="icon icon-modal-close"></span></span>');
                },
                destroy: function () {
                }
            });

        };
        this.callbacks = {
            settings: function () {
            },
            dpSettings: function () {
            },
            init: function () {
                return true;
            },
            bind_actions: function () {
                $('.ac-form-button').on('click', function () {
                    self.renderModal('<label for="price"></label><input id="price" name="price" type="text"><input id="cardId" name="cardId" type="hidden"><label for="date"></label><input id="date" name="date" type="date"><input type="button" id="send" value="Отправить">');
                });
				$('body').on('click', '#send', function () {
					self.sendInfo();
				});
                return true;
            },
            render: function () {
                w_code = self.get_settings().widget_code;
                self.render_template({
                    caption: {
                        class_name: 'js-ac-caption',
                        html: ''
                    },
                    body: '',
                    render: '<div class="ac-form"><div id="js-ac-sub-lists-container"></div> <div id="js-ac-sub-subs-container"> </div><div class="ac-form-button ac_sub">' + self.i18n('purchases') + '</div> </div><div class="ac-already-subs"></div><link type="text/css" rel="stylesheet" href="/upl/' + w_code + '/widget/style.css" >'
                });
                return true;
            },
            onSave: function () {
                return true;
            }
        };
        return this;
    };
    return CustomWidget;
});




