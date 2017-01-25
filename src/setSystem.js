import request from 'superagent';
import _ from 'lodash';

import command from './command';
import ServerURL from './Server';

export default function setSystem(inputs, extraCommands) {
  const serverURL = ServerURL();

  // Toggle Xbox because we can!
  if (inputs.mainTv === 'InputGame2' || inputs.secondaryTv === 'InputGame2') {
    command(`http://${serverURL}/devices/Microsoft%20Xbox%20One/PowerOn`);
  }

  // Set Main TV
  if (inputs.mainTv) {
    command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/PowerOn`);
    command(`http://${serverURL}/devices/Samsung%20TV/PowerOn`);
    command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/${inputs.mainTv}`);
  }

  // Set Secondary TV
  if (inputs.secondaryTv) {
    command(`http://${serverURL}/devices/Vizio%20TV/PowerOn`);
    command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver%20(2)/PowerOn`);
    command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver%20(2)/${inputs.secondaryTv}`);
  }

  let index = 0;
  function runExtra(commands) {
    if (!commands || !commands.length) {
      return;
    }

    const extraCommand = _.first(commands);

    if (extraCommand === 'timeout') {
      setTimeout(() => {
        runExtra(_.rest(commands));
      }, 1000 * index);
    } else {
      command(`http://${serverURL}${extraCommand}`);
      runExtra(_.rest(commands));
    }

    index += 1;
  }

  if (extraCommands) {
    runExtra(extraCommands);
  }

  // Set Audio
  if (inputs.mainTv !== inputs.mainAudio && inputs.mainAudio) {
    if (inputs.mainAudio === 'InputBluetooth' || inputs.mainAudio === 'InputAirplay') {
      if (inputs.mainAudio === 'InputAirplay') {
        command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/InputNet`);
        command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/Enter`);
      }

      command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/${inputs.mainAudio}`);

      setTimeout(() => {
        command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/Mode`);
      }, 8000);
    } else {
      command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/${inputs.mainTv}`);
      command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/${inputs.mainAudio}`);
    }
  }

  // Lights!
  if (inputs.scene) {
    request
      .post(`http://${serverURL}/scenes/${inputs.scene}`)
      .end(() => {});
  }
}
