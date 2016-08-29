const Pool = require('threads').Pool;

export default class Renderer {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pixels = new Uint8ClampedArray(width * height * 4);

    this.blockSize = 32;
  }

  render(callback) {
    const pool = new Pool();

    for (let y = 0; y < this.height; y += this.blockSize) {
      for (let x = 0; x < this.width; x += this.blockSize) {
        const bh = y + this.blockSize > this.height ? this.height - y : this.blockSize;
        const bw = x + this.blockSize > this.width ? this.width - x : this.blockSize;
        pool.run((input, done) => {
          function sleep(milliseconds) {
            const start = new Date().getTime();
            for (let i = 0; i < 1e7; i++) {
              if ((new Date().getTime() - start) > milliseconds) {
                break;
              }
            }
          }

          sleep(1000);
          const pixels = new Uint8ClampedArray(input.w * input.h * 4);
          for (let i = 0; i < input.w * input.h; i++) {
            const idx = i * 4;
            pixels[idx] = input.x;
            pixels[idx + 1] = input.y;
            pixels[idx + 2] = 0;
            pixels[idx + 3] = 255;
          }
          done({ pixels, x: input.x, y: input.y, h: input.h, w: input.w });
        })
        .on('done', (job, output) => {
          for (let yy = 0; yy < output.h; yy++) {
            for (let xx = 0; xx < output.w; xx++) {
              const i = ((output.y + yy) * this.width + output.x + xx) * 4;
              const j = (yy * output.w + xx) * 4;
              this.pixels[i] = output.pixels[j];
              this.pixels[i + 1] = output.pixels[j + 1];
              this.pixels[i + 2] = output.pixels[j + 2];
              this.pixels[i + 3] = output.pixels[j + 3];
            }
          }
          if (callback) callback(this.pixels);
        })
        .send({ x, y, w: bw, h: bh });
      }
    }

    pool.on('error', (job, err) => console.error('Job errored:', err))
        .on('finished', () => {
          console.log('Everything done, shutting down the thread pool.');
          pool.killAll();
        });
  }
}

