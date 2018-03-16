Module.register('MMM-smartcity-h5k-demo', {
	// Default module config.
	defaults: {
		socket: null,
		ready: false,
		data: {
			temperature: 0,
	    humidity: 0,
	    field: 0,
			parking1: 1,
			parking2: 1
		}
	},

  // Define required scripts.
	getStyles: function() {
		return ['MMM-style.css', 'icomoon.css'];
	},

	// Define required scripts.
	getScripts: function() {
		return ['socketio.slim.2.0.4.js'];
	},

	start: function() {
		this.defaults.socket = io(this.config.socketServer, {
    	transports: ['websocket']
		});

		this.defaults.socket.on('ready', () => {
			Log.log('[SOCKET IO] Ready');
			this.defaults.ready = true;
			this.updateDom();
			this.listenSocketEvents();
		});
	},

	listenSocketEvents: function() {
		Log.log('[SOCKET IO] Listening for events');
		const socket = this.defaults.socket;

		// Get the incomming sensor's data
	  socket.on('data', (d) => {
			const data = JSON.parse(d.payload.data)
	    Log.log('[SOCKET IO] data : ', data);
			this.defaults.data = Object.assign({}, data);
			this.updateDom();
	  });
	},

	// Override getHeader method.
	getHeader: function() {
		return this.data.header;
	},

	// To Fixed
	toFixed: function(d, n) {
		return d > 0 ? d.toFixed(n) : d;
	},

	// Override dom generator.
	getDom: function() {
		const data = this.defaults.data;
		let wrapper = document.createElement("div");
    wrapper.className = "wrapper small";

    wrapper.appendChild(this.createRow('temp', this.toFixed(data.temperature, 2), 'C°', 'icon-shine'));
		wrapper.appendChild(this.createRow('hum', this.toFixed(data.humidity, 2), '%', 'icon-calculate'));
		wrapper.appendChild(this.createRow('cactus', this.toFixed(data.field), '%', 'icon-hurt'));

		wrapper.appendChild(this.createParking('p1', data.parking1));
		wrapper.appendChild(this.createParking('p2', data.parking2));

		return wrapper;
	},

	/**
	 * Create a data row
	 * @param  {String}		n Name of the row
	 * @param  {Integer} 	v Value
	 * @param  {String} 	s Symbol
	 * @param  {Stinrg} 	i Icon
	 */
	createRow: function(n, v, s, i) {
		// Vars
		let name = n ? `<span class='light dimmed'>${n}</span>` : '';
		let value = v || 0;
		let symbol = s ? `<sup class='small normal'>${s}</sup>` : '';

		// Add row
		let rowEl = this.createRawEl();

		// Add icon
		if (i) { rowEl.appendChild(this.createIconEl(i)); }

		let contentEl = document.createElement('div');
		contentEl.innerHTML = `${name} <span class='medium bright'>${value}</span>${symbol}`;

		rowEl.appendChild(contentEl);

		return rowEl;
	},

	/**
	 * Create a parking row
	 * @param  {String}		n Name of the row
	 * @param  {Integer} 	v Value
	 * @param  {String} 	s Symbol
	 * @param  {Stinrg} 	i Icon
	 */
	createParking: function(n,v) {
		// Vars
		let name = n ? `<span class='light dimmed'>${n}</span>` : '';
		let value = v ? 'out' : 'in';

		// Add row
		let rowEl = this.createRawEl();

		// Add icon
		rowEl.appendChild(this.createIconEl('icon-drive'));

		// Add content
		let contentEl = document.createElement('div');
		contentEl.innerHTML = `${name} <span class='parking medium bright ${value}'></span>`;
		rowEl.appendChild(contentEl);

		return rowEl;
	},

	/**
	 * Create a row element
	 * @return {Object}	row
	 */
	createRawEl: function() {
		let rowEl = document.createElement('div');
		rowEl.className = 'row';
		return rowEl;
	},

	/**
	 * Create a inco element
	 * @param  {[type]} i icon name
	 * @return {Object}   icon
	 */
	createIconEl: function(i) {
		let iconEl = document.createElement('i');
		iconEl.className = `normal icon ${i}`;
		return iconEl;
	}
});
