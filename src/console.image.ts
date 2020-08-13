class Box {
  string: string;
  style: string;
}

interface Console {
  image: any;
}

/**
 * Since the console.log doesn't respond to the `display` style,
 * setting a width and height has no effect. In fact, the only styles
 * I've found it responds to is font-size, background-image and color.
 * To combat the image repeating, we have to get a create a font bounding
 * box so to speak with the unicode box characters.
 * @param width The height of the box
 * @param height The width of the box
 * @returns {object} {string, css}
 */
const _getBox = (width: number, height: number): Box => {
  return {
    string: "+",
    style:
      "font-size: 1px; padding: 0 " +
      Math.floor(width / 2) +
      "px; line-height: " +
      height +
      "px;",
  };
};

/**
 * Display an image to the console.
 * @param url The url of the image.
 * @param scale Scale factor on the image (defaults to 1)
 * @return {null}
 */
console.image = (url: string, scale: number = 1) => {
  const img = new Image();

  img.onload = () => {
    const dim = _getBox(img.width * scale, img.height * scale);
    console.log(
      "%c" + dim.string,
      dim.style +
        "background: url(" +
        url +
        "); background-size: " +
        img.width * scale +
        "px " +
        img.height * scale +
        "px; color: transparent;"
    );
  };

  img.src = url;
};
