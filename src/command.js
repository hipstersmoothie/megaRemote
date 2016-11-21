import request from 'superagent';

export default function command(url) {
  request
    .post(url)
    .end((err, res) => console.log(err, res));
}
