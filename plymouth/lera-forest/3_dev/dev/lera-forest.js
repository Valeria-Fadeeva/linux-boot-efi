/*
Theme Name: lera-forest
Version: 1.0
Description: My theme
Author: Valeria Fadeeva - https://github.com/Valeria-Fadeeva
Date: 2022.05.04
License: GNU AFFERO GENERAL PUBLIC LICENSE, see <http://www.gnu.org/licenses/>
*/

Percent = function(perc, pixels) {
    result = Math.Int(Math.Abs(Math.Int(pixels)) / 100 * Math.Abs(Math.Int(perc)));
    return result;
};

Limit = function(width, height, perc) {
    local.this;
    this.width = width;
    this.height = height;
    this.perc = perc;

    this.GetWidth = function() {
        width = Percent(this.perc, this.width);
        return width;
    };

    this.GetHeight = function() {
        height = Percent(this.perc, this.height);
        return height;
    };

    return this;
};

ScaleImage = function(image1, image2) {
    img1.width = image1.GetWidth();
    img1.height = image1.GetHeight();
    img1.ratio = img1.width / img1.height;

    img2.width = image2.GetWidth();
    img2.height = image2.GetHeight();
    img2.ratio = img2.width / img2.height;

    if (img1.ratio == 1 || (img1.width < 200 && img1.height < 200)) {
        img1.scaled = image1.Scale(img2.width, img2.height);
        return img1.scaled;
    }

    if (img1.width == img2.width && img1.height == img2.height) {
        return image1;
    }

    if (img2.ratio < img1.ratio) {
        factor = img2.height / img1.height;
    } else {
        factor = img2.width / img1.width;
    }

    img1.scaled = image1.Scale(img1.width * factor, img1.height * factor);

    return img1.scaled;
};

FitIntoDimensions = function(image1, image2) {
    img1.width = image1.GetWidth();
    img1.height = image1.GetHeight();

    img2.width = image2.GetWidth();
    img2.height = image2.GetHeight();

    ma = Math.Max(img1.width, img2.height);
    mi = Math.Min(img1.height, img2.height);
    factor = ma / mi;

    img1.fit = image1.Scale(Math.Int(img1.width / factor), Math.Int(img1.height / factor));

};

SetSpriteImage = function(asset, x, y, z) {
    local.sprite = Sprite();
    sprite.image = Image(asset);
    sprite.width = sprite.image.GetWidth();
    sprite.height = sprite.image.GetHeight();
    sprite.SetImage(sprite.image);
    sprite.SetPosition(x, y, z);
    return sprite;
};

x0 = Window.GetX();
y0 = Window.GetY();
z0 = Window.GetZ();

Window.SetBackgroundTopColor(0, 0, 0);
Window.SetBackgroundBottomColor(0, 0, 0);

screen.width = Window.GetWidth();
screen.height = Window.GetHeight();

// BACKGROUND
background.image = Image("BACKGROUND.PNG");
background.image = ScaleImage(background.image, Limit(screen.width, screen.height, 100));
//background.image = ScaleImage(background.image, Window);

background.width = background.image.GetWidth();
background.height = background.image.GetHeight();

background.x = x0 + screen.width / 2 - background.width / 2;
background.y = y0 + screen.height / 2 - background.height / 2;

background.sprite = SpriteNew();
background.sprite.SetImage(background.image);
background.sprite.SetPosition(background.x, background.y, 0);
background.sprite.SetOpacity(1);

// **************************************** //

per.image = Image.Text("Lera forest v8",0.5,0.5,0.5,1, perfont);
per.sprite = Sprite(per.image);
per.x = x0 + screen.width  / 1 - per.image.GetWidth() / 0.91;
per.y = y0 + screen.height / 1.01  - per.image.GetHeight() / 1;
per.sprite.SetPosition(per.x, per.y, 1);
per.sprite.SetOpacity(1);

// **************************************** //

// LOGO
logo.image = Image("MAIN_LOGO.PNG");
logo.image = FitIntoDimensions(logo.image, Limit(screen.width, screen.height, 35));

logo.sprite = Sprite(logo.image);
logo.x = screen.width / 2  -  logo.image.GetWidth() / 2;             // позиция логотипа X
logo.y = Percent(10, screen.height);         // позиция логотипа Y
logo.sprite.SetPosition(logo.x, logo.y, 2);
logo.sprite.SetOpacity(1);

// PROGRESS BAR
progress_bar.original_image = Image("PROGRESS_BAR.PNG");
progress_bar.sprite = Sprite();

progress_bar.x = Percent(50, screen.width) - progress_bar.original_image.GetWidth() / 2;
progress_bar.y = Percent(95, screen.height) - progress_bar.original_image.GetHeight() / 2;
progress_bar.sprite.SetPosition(progress_bar.x, progress_bar.y, 6);

progress_box.image = Image("PROGRESS_BOX.PNG");
progress_box.sprite = Sprite(progress_box.image);

progress_box.x = Percent(50, screen.width) - progress_box.image.GetWidth() / 2;
progress_box.y = Percent(95, screen.height) - progress_box.image.GetHeight() / 2;
progress_box.sprite.SetPosition(progress_box.x, progress_box.y, 5);

// **************************************** //

progress_text.image = Image.Text(progress_t + "%",255,255,255,1,progressfont);
progress_text.sprite = Sprite();

progress_text.x = progress_box.x + progress_box.image.GetWidth() - progress_text.image.GetWidth(); // позиция % по X
progress_text.y = progress_box.y - progress_text.image.GetHeight() * 2; // позиция % по Y
progress_text.sprite.SetPosition(progress_text.x, progress_text.y, 6);

function progress_callback(duration, progress) {
    /*if (progress_bar.image.GetWidth() != Math.Int(249 * progress)) {
        progress_bar.image = progress_bar.original_image.Scale(249 * progress, progress_bar.original_image.GetHeight());
        progress_bar.sprite.SetImage(progress_bar.image);
    }*/

    if (progress_bar.image.GetWidth() != Math.Int(progress_bar.original_image.GetWidth() * progress)) {
        progress_bar.image = progress_bar.original_image.Scale(progress_bar.original_image.GetWidth(progress_bar.original_image) * progress, progress_bar.original_image.GetHeight());
        progress_bar.sprite.SetImage(progress_bar.image);

        f = Math.Int(progress_bar.image.GetWidth() /progress_bar.original_image.GetWidth() * 100);
        progress_t.image = Image.Text(f + "%",255,255,255,1,progressfont);
        progress_text.sprite.SetImage(progress_t.image);
    }
}

Plymouth.SetBootProgressFunction(progress_callback);

// SPINNER
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

Spinner = function() {
    // FIXME: try to use this=
    spinner = global.Spinner | [];
    spinner.count = 120;
    spinner.current_idx = 0;
    spinner.last_time = 0;
    spinner.steps = 10.0; // We render degrees in increments of 10 to save disk.
    spinner.duration = 3.0; // Seconds per rotation.
    for (i = 0; i <= spinner.count; ++i) {
        if (i % spinner.steps != 0) {
            continue;
        }
        spinner[i] = SpriteImage("THROBBER-ANIM-" + i + ".PNG");
        spinner[i].x = boot_x + 374;
        spinner[i].y = boot_y + 247;
        spinner[i].SetPosition(spinner[i].x, spinner[i].y, 9);
        spinner[i].SetOpacity(0);
    }
    return spinner;
} | [];

Spinner.Animate = function(time) {
    degrees = Math.Int(((2 * Math.Pi / duration) * time) * (180 / Math.Pi));
    new__ = degrees % count;
    old__ = current_idx;
    if (Math.Int(new__) < Math.Int((old__ + steps) % count)) {
        // Every $steps degrees we can render a frame, all others we skip.
        return;
    }
    // We set a second new__ which is now a correct index bump by coercing it
    // into a multiple of 10.
    new__ = Math.Int(new__ / steps) * steps;
    this[old__].SetOpacity(0);
    this[new__].SetOpacity(1);
    current_idx = new__;
    return this;
};

Spinner.GetY = function() {
    return this[0].GetY();
};

Spinner.GetHeight = function() {
    return this[0].height;
};

global.spin = Spinner();

function boot_progress_cb(time, progress)
{
    spin.Animate(time);
    logo.SetOpacity_(time * 2.0);
    progress_callback (duration, progress);
}

Plymouth.SetBootProgressFunction (boot_progress_cb);

// PROGRESS FADE
status = "normal";
screen_width = Window.GetWidth(0);
screen_height = Window.GetHeight(0);

logotype_image = Image("");
progress_meter_image = Image("");
progress_fade_image = Image("PROGRESS_FADE.PNG");
fsck_progress_meter_image = Image("");
fsck_progress_fade_image = Image("");

progress_meter_sprite = Sprite(progress_meter_image);
progress_fade_sprite = Sprite(progress_fade_image);

counter = 0;

fade_dir = 0; // 0 = right, 1 = left


progress_meter.x = boot_x + backdrop.GetWidth()/2 - progress_meter_image.GetWidth()/2;
progress_meter.y = boot_y + 448;
progress_meter_sprite.SetPosition(progress_meter.x, progress_meter.y, 6);

function refreshHandler() {
    if (status == "normal" && Plymouth.GetMode() == "boot") {
        progress_fade_sprite.SetOpacity (0); // полностью прозрачный
        progress_bar.sprite.SetOpacity (1);
    } else {
        progress_fade_sprite.SetOpacity (1);
        progress_bar.sprite.SetOpacity (0);
    }

    progress_fade.x = boot_x + 81;
    progress_fade.y = boot_y + 217;

    progress_fade_sprite.SetPosition(counter + progress_fade.x, progress_fade.y, 6);

    if (fade_dir == 0) {
        counter++;

        if (counter >= 290) {
            fade_dir = 1;
        }
    } else {
        counter--;

        if (counter <= 0) {

            fade_dir = 0;
        }
    }

    if ((fsck_running == 1) && (fsck_done_fading == 0)) {
        fsck_progress_meter_sprite.SetOpacity(fsck_fade_in_counter);
        fsck_progress_fade_sprite.SetOpacity(fsck_fade_in_counter);

        if (fsck_fade_in_counter < 1) {
            fsck_fade_in_counter+= 0.025;
        } else {
            fsck_done_fading = 1;
        }
    }

    update ();
}

Plymouth.SetRefreshFunction (refreshHandler);

// DIALOGUE
status = "normal";

function dialog_setup() {
    local.box;
    local.lock;
    local.entry;
    local.text;
    
    box.image = Image("BOX.PNG");
    lock.image = Image("LOCK.PNG");
    entry.image = Image("ENTRY.PNG");

    box.sprite = Sprite(box.image);
    box.x = Window.GetWidth()  / 2 - box.image.GetWidth ()/2;
    box.y = Window.GetHeight() / 1.15 - box.image.GetHeight()/2;
    box.z = 100;
    box.sprite.SetPosition(box.x, box.y, box.z);
    
    lock.sprite = Sprite(lock.image);
    lock.x = box.x + 25;
    lock.y = box.y + 30;
    lock.z = box.z + 1;
    lock.sprite.SetPosition(lock.x, lock.y, lock.z);
    
    entry.sprite = Sprite(entry.image);
    entry.x = box.x + 80;
    entry.y = box.y + 35;
    entry.z = box.z + 1;
    entry.sprite.SetPosition(entry.x, entry.y, entry.z);
    
    prompt_sprite = SpriteNew();
    prompt_sprite.SetPosition(prompt_sprite.x, prompt_sprite.y, prompt_sprite.z);
    prompt_sprite.SetPosition(box.x + 46, box.y - 21, box.z);

    global.dialog.box = box;
    global.dialog.lock = lock;
    global.dialog.entry = entry;
    global.dialog.text = text_pass;
    global.dialog.bullet_image = Image("BULLET.PNG");
    global.dialog.prompt_sprite = prompt_sprite;
    dialog_opacity (1);
}
    
function dialog_opacity(opacity) {
    dialog.box.sprite.SetOpacity (opacity);
    dialog.lock.sprite.SetOpacity (opacity);
    dialog.entry.sprite.SetOpacity (opacity);
    dialog.text.sprite.SetOpacity (opacity);
    dialog.prompt_sprite.SetOpacity(opacity);

    for (index = 0; dialog.bullet[index]; index++) {
        dialog.bullet[index].sprite.SetOpacity(opacity);
    }
}

function display_normal_callback () {
    global.status = "normal";

    if (global.dialog)
        dialog_opacity (0);
}

function display_password_callback (prompt, bullets) {
    global.status = "password";
    if (!global.dialog)
        dialog_setup();
    else
        dialog_opacity(1);

    dialog.prompt_sprite.SetImage(Image.Text(prompt, 0.8,0.8,0.8,1, passwordfont));

    for (index = 0; dialog.bullet[index] || index < bullets; index++) {
        if (!dialog.bullet[index]) {
            dialog.bullet[index].sprite = Sprite(dialog.bullet_image);
            dialog.bullet[index].x = dialog.entry.x + index * dialog.bullet_image.GetWidth() / 0.8 - dialog.entry.image.GetHeight() * -0.2; // отступ точки от точки и от поля (modified)
            dialog.bullet[index].y = dialog.entry.y + dialog.entry.image.GetHeight() / 1.9 - dialog.bullet_image.GetHeight() / 2;
            dialog.bullet[index].z = dialog.entry.z + 1;
            dialog.bullet[index].sprite.SetPosition(dialog.bullet[index].x, dialog.bullet[index].y, dialog.bullet[index].z);
        }

        if (index < bullets)
            dialog.bullet[index].sprite.SetOpacity(1);
        else
            dialog.bullet[index].sprite.SetOpacity(0);
    }
}

function display_message_callback (prompt) {
    prompt = Image.Text(prompt,0.0,0.0,0.0,1);
    sprite_prompt.SetImage(prompt);
    sprite_prompt.SetPosition(Window.GetX() + (Window.GetWidth() - prompt.GetWidth()) / 2, Window.GetY() + Window.GetHeight() * 0.10, 2);
}

Plymouth.SetDisplayNormalFunction(display_normal_callback);
Plymouth.SetDisplayPasswordFunction(display_password_callback);
Plymouth.SetMessageFunction(display_message_callback);

// QUIT
function quit_callback () {
    progress_fade_sprite.SetOpacity (1);
    progress_bar.sprite.SetOpacity (0);
}

Plymouth.SetQuitFunction(quit_callback);  
