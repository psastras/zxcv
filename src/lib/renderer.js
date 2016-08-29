class CameraRay {
  constructor(screenX, screenY) {
    this.screenX = screenX;
    this.screenY = screenY;
  }

  trace() {
    return {
      r: 128,
      g: 128,
      b: 128,
      a: 255,
    };
  }
}


export default class Renderer {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pixels = new Uint8ClampedArray(width * height * 4);
  }

  render() {
    for (let y = 0, i = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++, i += 4) {
        const ray = new CameraRay(x, y);
        const color = ray.trace();

        this.pixels[i] = color.r;
        this.pixels[i + 1] = color.g;
        this.pixels[i + 2] = color.b;
        this.pixels[i + 3] = color.a;
      }
    }
  }

  foo() {
    return {
      r: 0,
      theta: 0,
      phi: 0,
      t: 0,
      p_r: 0,
      p_theta: 0,
    };
  }

}

