document.addEventListener('alpine:init', () => {
    Alpine.data('table', () => ({
        data: [],
        obj: {a:"",b:"",c:""},
        async init() {
            try {
                const response = await fetch('/api/data/');
                if (!response.ok) throw response.status;
                this.data = await response.json();
            } catch (e) {
                console.log(e);
            }
        },
        async del(id) {
            try {
                const response = await fetch('/api/data/' + id, {
                    method: 'DELETE'
                });
                if (!response.ok) throw response.status;
                this.data = await response.json();
            } catch (e) {
                console.log(e);
            }
        },
        async insert() {
            try {
                const response = await fetch('/api/data/', {
                    method: 'POST',
                    body: JSON.stringify(this.obj),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw response.status;
                this.data = await response.json();
                this.obj = { a: "", b: "", c: "" };
            } catch (e) {
                console.log(e);
            }
        }
    }));
});