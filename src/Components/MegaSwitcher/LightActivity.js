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


class LightActivity extends Activity {
  constructor(props) {
    super(props);

    request
      .get(`http://${ServerURL()}/scenes/${this.props.id}`)
      .end((err, res) => {
        const lightStates = JSON.parse(res.text).lightstates;
        const colors = [];

        _.forIn(lightStates, (state) => {
          if (state.xy) {
            const rgb = xyBriToRgb(state.xy[0], state.xy[1], state.bri);
            const isWhite = rgb.r >= 240 && rgb.g >= 240 && rgb.b >= 240;

            if (!isNaN(rgb.r) && !isNaN(rgb.g) && !isNaN(rgb.b) && !isWhite) {
              colors.push(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
            }
          }
        });

        this.setState({
          background: colors.length === 1 ? colors[0] : `linear-gradient(to right, ${colors.join(', ')})`
        });
      });
  }

  render() {
    return super.render();
  }
}

export default LightActivity;
