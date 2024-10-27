export default function wait(ms) {
  return new Promise((resolve, _) => {
    setTimeout(resolve, ms);
  });
}
