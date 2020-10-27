class TransactionDropDown extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let shadow = this.attachShadow({ mode: 'open' });
        let wrapper = document.createElement('div');

        wrapper.setAttribute('class', 'name');

        let dropDown = document.createElement('select');
        dropDown.value= "Select Transaction";

        let opts = JSON.parse(this.getAttribute('transArr'));

        opts.map(t => {
            let option = document.createElement('option');
                option.appendChild(document.createTextNode(`${t.text}`));
                option.value = `${t.text}`;
                dropDown.appendChild(option);
        })

        dropDown.onchange = e => { this.value = e.target.value };

        shadow.appendChild(wrapper);
        wrapper.appendChild(dropDown);
    }
}
customElements.define('transaction-dropdown', TransactionDropDown);

/*class TransactionDropDown extends HTMLElement {
        constructor() {
            super();

            let shadow = this.attachShadow({ mode: 'open' });
            let wrapper = document.createElement('div');

            wrapper.setAttribute('class', 'name');

            let dropDown = document.createElement('select');
            dropDown.value = selectedTransaction;

            transactions.forEach(t => {
                let option = document.createElement('option');
                option.appendChild(document.createTextNode(`${t.text}`));
                option.value = `${t.text}`;
                dropDown.appendChild(option);
            })

            dropDown.onchange = e => { setSelected(e.target.value) };
            shadow.appendChild(wrapper);
            wrapper.appendChild(dropDown);
            VerifyState();
        }
    }*/