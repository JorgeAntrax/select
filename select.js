class Listbox {
    constructor(obj) {
        this.id = `#${obj.el}--input`;
        this.props = obj.props || '';
        this.classes = obj.classes || '';
        this.el = document.querySelector(`[data-id="${obj.el}"]`);
        this.list = this.el.querySelector('list .list-container');
        this.el.innerHTML += `<input type="text" ${obj.props} name="${obj.name}" id="${obj.el}--input" class="oh-input oh-black ${this.classes}" /><span class="toggleListbox"><span></span></span>`;
        this._call = obj.call || null;
        this.val = '';
        this.editable = obj.editable;
        this.init(this.id, this._call);
    }
  
    init(id, call) {
        this.watch(id, call);
    }

    addList(text, value) {
        this.list.innerHTML += `<list-item text="${text}" value="${value}">${text}</list-item>`;
    }

    getId() {
        return this.id;
    }
    /* this method added interactivity for component listbox */
    watch(id, callback) {
        let _this = this;
        let input = document.querySelector(id);
        let list = input.previousElementSibling;
        let listItems = list.querySelectorAll('list-item');
        input.value = listItems[0].hasAttribute('text') ? listItems[0].getAttribute('text') : listItems[0].getAttribute('value');

        input.readOnly = this.editable;
        listItems[0].classList.add('is-active');

        input.addEventListener('focus', function() {
            list.classList.toggle('is-visible');
        }, false);

        input.addEventListener('keyup', function(e) {
            const $input = e.target;
            const $_value = $input.value.toLowerCase();


            listItems.forEach($sow => {
                    $sow.hidden = false
            });

            listItems.forEach($item => {
                let $option = $item.textContent.toLowerCase();

                if(!$option.includes($_value) || $option.indexOf($_value) == -1){
                    $item.hidden = true
                }else {
                    $item.hidden = false
                }
            });

        }, false);

        input.addEventListener('change', (e) => {
            this.val = e.target.value;
        }, false);

        let toggle = input.nextElementSibling;

        toggle.addEventListener('click', function() {
            list.classList.toggle('is-visible');
        }, false);

        let activo;

        let _loop_1 = function(i) {
            listItems[i].addEventListener('click', function() {
                const $__current = listItems[i];
                for (let j = 0; j < listItems.length; j++) {
                    const $__siblings = listItems[j];
                    if ($__siblings.classList.contains('is-active')) {
                        $__siblings.classList.remove('is-active');
                    }
                }
                $__current.classList.add('is-active');
                activo = $__current;
                list.classList.remove('is-visible');
                _this.update(input, activo);
                if(callback != null) {
                    callback.call(this);
                }
            }, false);
        };

        for (let i = 0; i < listItems.length; i++) {
            _loop_1(i);
        }
    }
    
    update(input, activo) {
        input.value = activo.getAttribute('text');
        this.val = input.value;
    }

    getVal() {
        return this.val;
    }

}
