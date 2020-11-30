const rgbRegex = /^([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

class Validate {
    constructor() {

        this.rgbRegex = rgbRegex;
    }

    isRGB(rgb) {
        return this.rgbRegex.test(rgb);
    }

}

export default new Validate();

