/*
* Allows the bot user to set a time limit between uses of a command
*/

class Limit {
	constructor(period) {
		this.list = new Map();
		this.period = period || 30000; // in milliseconds
	}

	add(key) {
		if(!this.exists(key)) {
			this.list.set(key, new Date(new Date().getTime() + this.period));
			console.log(`${key} timeout will expire at ${this.list.get(key)}`);
			setTimeout(() => {this.remove(key)}, this.period);
		} else {
			console.log(`${key} needs to wait another ` + ( new Date().getTime() - this.list.get(key) ));
		}
	};

	remove(key) {
		this.list.delete(key);
		console.log(`${key} is now able to call the bot again`);
	};

	exists(key) {
		return this.list.has(key);
	};
}

module.exports = Limit;