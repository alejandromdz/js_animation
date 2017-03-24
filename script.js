var timers = {
	timerID: 0,
	timers: [],
	add: function (fn) {
		this.timers.push(fn);
	},
	start: function () {
		if (this.timerID) return;
		(function runNext() {
			if (timers.timers.length > 0) {
				timers.timers[0]();
				timers.timers.splice(0, 1);
				timers.timerID = setTimeout(runNext, 5);
			}
			else {
				timers.timerID = 0;
				return;
			}
		})();
	},
	stop: function () {
		clearTimeout(this.timerID);
		this.timers = [];
		this.timerID = 0;
	}
};

const box = document.getElementById('box');
box.style.right = '200px';
box.onclick = function () {
	timers.stop();
	for (let i = 0; i < 100; i++) {
		timers.add(function () {
			const right = box.style.right;
			box.style.right = (parseInt(right, 10) + 1) + 'px';
		});
	}
	timers.start();
}