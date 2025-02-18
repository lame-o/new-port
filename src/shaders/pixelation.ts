export const pixelationVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const pixelationFragmentShader = `
  uniform float pixelSize;
  uniform vec2 resolution;
  varying vec2 vUv;

  vec3 dither(vec2 uv, vec3 color) {
    // Simple ordered dithering pattern
    float pattern = (mod(uv.x * resolution.x, 2.0) * 0.5 + 
                    mod(uv.y * resolution.y, 2.0) * 0.5) * 0.25;
    return color + pattern;
  }

  void main() {
    vec2 normalizedPixelSize = vec2(pixelSize) / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(vUv / normalizedPixelSize);

    // Create a pixelated color effect
    vec3 color = vec3(uvPixel.x, uvPixel.y, 1.0);
    color = dither(uvPixel, color);

    gl_FragColor = vec4(color, 1.0);
  }
`
