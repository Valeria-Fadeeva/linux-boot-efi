ScaleImage = function(image1, image2) {
    img1.width = image1.GetWidth();
    img1.height = image1.GetHeight();
    img1.ratio = img1.width / img1.height;

    img2.width = image2.GetWidth();
    img2.height = image2.GetHeight();
    img2.ratio = img2.width / img2.height;

    if(img1.width > img2.width && img1.height > img2.height) {
        ma = Math.Max(img1.width, img1.height);
        mi = Math.Min(img2.width, img2.height);
        factor = ma / mi;

        img1.scaled = img1.image.Scale(img1.width / factor, img1.height / factor);
    } else {
        if (img1.ratio == 1 || (img1.width < 200 && img1.height < 200)) {
            img1.sc_scaled = img1.image.Scale(img2.width, img2.height);
        } else {
            factor = 0;

            if (img2.ratio < img1.ratio) {
                factor = img2.height / img1.height;
            } else {
                factor = img2.width / img1.width;
            }

            img1.scaled = img1.image.Scale(img1.width * factor, img1.height * factor);
        }
    }

    return img1.scaled;
}

Limit = function(width, height, perc) {
    GetWidth = function(width) {
        width = percent(perc, width);
        return width;
    }

    GetHeight = function(height) {
        height = percent(perc, height);
        return height;
    }
}


SetSpriteImage_ = function(asset, x, y, z) {
    local.sprite = Sprite();
    sprite.image = Image(asset);
    sprite.width = sprite.image.GetWidth();
    sprite.height = sprite.image.GetHeight();
    sprite.SetImage(sprite.image);
    sprite.SetPosition(x, y, z);
    return sprite;
}

SpriteImage = function(asset) {
    local.sprite = Sprite();
    sprite.image = Image(asset);
    sprite.width = sprite.image.GetWidth();
    sprite.height = sprite.image.GetHeight();
    sprite.SetImage(sprite.image);
    return sprite | global.SpriteImage;
} | Sprite;

SpriteImage.SetSpriteImage = function(image) {
    this.image = image;
    this.width = image.GetWidth();
    this.height = image.GetHeight();
    this.SetImage(this.image);
};
