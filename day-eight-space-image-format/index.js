const data = "123456789012";
const createLayers = (image, width, height) => {
  const layers = [];
  const length = width * height;
  const imageLength = image.length;
  let step = 0;
  while (step < imageLength) {
    const part = data.slice(step, step + length);
    console.log(part);
    step += length;
  }
};

createLayers(data, 25, 6);
