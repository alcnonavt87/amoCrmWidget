define(['jquery', 'lib/components/base/modal'], function ($, Modal) {
    var CustomWidget = function () {
        var self = this;
        this.sendData = function (data) {
            $(".message-result.message-error").remove();
            $(".message-result.message-success").remove();
            console.log(data);
            self.crm_post(
                'http://d2984bac.ngrok.io/',
                {
                    data
                },
                function (msg) {
                    if (msg['error']) {
                        var error = '';
                        $.each((msg['error']), function (key, value) {
                            error += '<div class="message-result message-error">' + value + '</div>'
                        });
                        $(error).insertAfter(".form-control.center-inner");
                    } else if (msg['success']) {
                        $('<div class="message-result message-success">' + msg['success'] + '</div>').insertAfter(".form-control.center-inner");
                    } else {
                        console.log(msg)
                    }
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
                    self.renderModal('<div class="card-modal"><form name="cardPrice" action="">' +
                        '<div class="form-control right-inner">' +
                        '<label class="form-label" for="price">Сумма:</label>' +
                        '<input class="form-input" id="price" name="price" type="text">' +
                        '</div>' +
                        '<div class="form-control right-inner">' +
                        '<label class="form-label" for="date">Дата покупки:</label>' +
                        '<input class="form-input" id="date" name="date" type="date">' +
                        '</div>' +
                        '<div class="form-control center-inner">' +
                        '<input class="form-button" type="button" id="send_modal" value="Отправить">' +
                        '</div>' +
                        '</form></div>');
                });
                $("body").off("click", "#send_modal", createData);
                $('body').on('click', '#send_modal', createData);

                function createData() {
                    var data = {};
                    $.each($('form[name="cardPrice"]').serializeArray(), function (_, item) {
                        data[item.name] = item.value;
                    });
                    data['amoCardId'] = $("input[name='lead[ID]']").val();
                    self.sendData(data);
                }
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




