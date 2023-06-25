import Vue from "vue";
import picker from "./picker";

let BoxConstructor = Vue.extend(picker)
let $picker = function (columns, config) {
    let defaultConfig = Object.assign({
        title: this.$t('common.select')
    }, config)
    return new Promise((res, err) => {
        let instance = new BoxConstructor({
            el: document.createElement('div'),
            data() {
                return {
                    show: false,
                    columns: [
                        {
                            values: columns.map(item => item.label),
                            defaultIndex: columns.findIndex(item => item.value == defaultConfig.value) || 0
                        }
                    ],
                    title: defaultConfig.title
                }
            },
            methods: {
                close() {
                    this.show = false
                    let $el = instance.$el
                    setTimeout(() => {
                        instance.$destroy()
                        if ($el.parentNode) {
                            $el.parentNode.removeChild($el)
                        }
                    }, 600)
                },
                input(boo) {
                    if (boo) {
                        this.show = boo
                    } else {
                        this.close()
                    }
                },
                onConfirm(value, index) {
                    this.close()
                    res(columns[index].value, value)
                },
                onCancel() {
                    this.close()
                    err()
                },
                onChange() { }
            },
            mounted() {
                this.$nextTick(() => {
                    this.show = true
                })
            },
        })
        document.body.appendChild(instance.$el);
    })


}
export {
    $picker
}