import { createCanvas, Image } from "canvas";
import request from "sync-request";

/**
 * Extracts the dominant color from an image synchronously.
 *
 * @param {string} imageUrl - The URL of the image.
 * @returns {string} - The hex code of the dominant color.
 */
export default function accentColor(imageUrl: string): string {
    // Fetch the image data from the URL
    const res = request("GET", imageUrl);
    const imgBuffer = res.getBody();

    const canvas = createCanvas(1, 1);
    const ctx = canvas.getContext("2d");

    // Create an Image instance from the 'canvas' package
    const image = new Image();
    image.src = imgBuffer;

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0, 1, 1);

    // Get the image data from the canvas
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    if (!r || !g || !b) return "#FFFFFF";
    return rgbToHex(r, g, b);
}

/**
 * Converts RGB values to a hex color code.
 *
 * @param {number} r - The red value.
 * @param {number} g - The green value.
 * @param {number} b - The blue value.
 * @returns {string} - The hex color code.
 */
function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
