const EventEmitter = require('events');
class Timer extends EventEmitter {
  constructor(total, interval) {
    super();
    this.total = total;
    this.interval = interval;
    this.ticks = 0;
  }
  _tick() {
    this.ticks += 1;
    if (this.ticks <= this.total) {
      this.emit('tick', this.ticks);
      if (this.total / 2 === this.ticks) {
        this.emit('ekvator', 'это половина');
      }
    } else {
      this.end();
    }
  }
  start() {
    this.intervalId = setInterval(() => this._tick(), this.interval);
    this.emit('start');
  }
  end() {
    clearInterval(this.intervalId);
    this.emit('end');
  }
}

const timer = new Timer(10, 1000);
timer.once('start', () => console.log('start'));
timer.on('tick', (tick) => console.log(tick));
timer.once('ekvator', (tick) => console.log(tick));
timer.once('end', () => console.log('конец'));

timer.start();
