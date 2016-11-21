export function prepare(control) {
  return control.join ? control.join(',') : control;
}

export function getControl(type, control) {
  const command = prepare(control);
  return command.indexOf(type) > -1;
}
