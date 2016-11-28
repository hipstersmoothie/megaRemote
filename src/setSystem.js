import request from 'superagent';
import _ from 'lodash';

import command from './command';
import ServerURL from './Server';

export default function setSystem(inputs, extraCommands) {
  const serverURL = ServerURL();

  // Toggle Xbox because we can!
  if (inputs.mainTv === 'InputGame2' || inputs.secondaryTv === 'InputGame2') {
    command(`http://${serverURL}/devices/Samsung%20TV/PowerOn`);
  }

  // Set Main TV
  if (inputs.mainTv) {
    command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/PowerOn`);
    command(`http://${serverURL}/devices/Samsung%20TV/PowerOn`);
    command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver/${inputs.mainTv}`);
  }

  // Set Secondary TV
  if (inputs.secondaryTv) {
    if (inputs.turnOnSecondaryTv) {
      command(`http://${serverURL}/devices/Vizio%20TV/PowerToggle`);
    }

    command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver%20(2)/PowerOn`);
    command(`http://${serverURL}/devices/Onkyo%20AV%20Receiver%20(2)/${inputs.secondaryTv}`);
  }

  if (extraCommands) {
    _.forEach(extraCommands, extraCommand => command(`http://${serverURL}${extraCommand}`));
  }

  // Set Audio
  if (inputs.mainTv !== inputs.mainAudio && inputs.mainAudio) {
    if (inputs.mainAudio === 'InputBluetooth' || inputs.mainAudio === 'InputAirplay') {
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
