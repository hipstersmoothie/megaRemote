/* eslint no-mixed-operators:0 no-restricted-properties:0 */
import _ from 'lodash';
import request from 'superagent';

import ServerURL from './../../Server';
import Activity from './../customActivities/Activity';

function xyBriToRgb(x, y, bri) {
  const z = 1.0 - x - y;
  const Y = bri / 255.0; // Brightness of lamp
  const X = (Y / y) * x;
  const Z = (Y / y) * z;
  let r = X * 1.612 - Y * 0.203 - Z * 0.302;
  let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
  let b = X * 0.026 - Y * 0.072 + Z * 0.962;
  r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
  g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
  b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
  const maxValue = Math.max(r, g, b);
  r /= maxValue;
  g /= maxValue;
  b /= maxValue;

  r *= 255;
  if (r < 0) {
    r = 255;
  }

  g *= 255;
  if (g < 0) {
    g = 255;
  }

  b *= 255;
  if (b < 0) {
    b = 255;
  }

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b)
  };
}

// Convert a decimal value between 0 and 1 to an integer 0-255
function colorNormalizedToEightBit(value) {
  return Math.round(value * 255);
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR
 * h, s, v
*/
function HSVtoRGB(hue, sat, value) {
  const satNormal = sat / 255;
  const valueNormal = value / 255;
  const hueNormal = (hue / 65535) * 360;
  const c = valueNormal * satNormal;
  const x = c * (1 - Math.abs(((hueNormal / 60) % 2) - 1));
  const m = valueNormal - c;

  let red = 0;
  let green = 0;
  let blue = 0;

  if ((hueNormal >= 0) && (hueNormal < 60)) {
    red = c;
    green = x;
    blue = 0;
  } else if ((hueNormal >= 60) && (hueNormal < 120)) {
    red = x;
    green = c;
    blue = 0;
  } else if ((hueNormal >= 120) && (hueNormal < 180)) {
    red = 0;
    green = c;
    blue = x;
  } else if ((hueNormal >= 180) && (hueNormal < 240)) {
    red = 0;
    green = x;
    blue = c;
  } else if ((hueNormal >= 240) && (hueNormal < 300)) {
    red = x;
    green = 0;
    blue = c;
  } else {
    red = c;
    green = 0;
    blue = x;
  }

  return {
    r: colorNormalizedToEightBit(red + m),
    g: colorNormalizedToEightBit(green + m),
    b: colorNormalizedToEightBit(blue + m)
  };
}

class LightActivity extends Activity {
  constructor(props) {
    super(props);

    request
      .get(`http://${ServerURL()}/scenes/${this.props.id}`)
      .end((err, res) => {
        const lightStates = JSON.parse(res.text).lightstates;
        const colors = [];

        _.forIn(lightStates, (state) => {
          let rgb;

          if (state.xy) {
            rgb = xyBriToRgb(state.xy[0], state.xy[1], state.bri);
          } else if (state.hue && state.sat) {
            rgb = HSVtoRGB(state.hue, state.sat, 255);
          }

          const isWhite = rgb && rgb.r >= 240 && rgb.g >= 240 && rgb.b >= 240;

          if (rgb && !isNaN(rgb.r) && !isNaN(rgb.g) && !isNaN(rgb.b) && !isWhite) {
            colors.push(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
          }
        });

        const allSame = _.reduce(colors, (equal, color) => (color === equal ? equal : false), colors[0]);

        this.setState({
          background: colors.length === 1 || allSame ? colors[0] : `linear-gradient(to right, ${colors.join(', ')})`
        });
      });
  }

  render() {
    return super.render();
  }
}

export default LightActivity;
