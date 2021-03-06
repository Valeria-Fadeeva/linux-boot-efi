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
logo.x = screen.width / 2  -  logo.image.GetWidth() / 2;             // ?????????????? ???????????????? X
logo.y = Percent(10, screen.height);         // ?????????????? ???????????????? Y
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

progress_text.x = progress_box.x + progress_box.image.GetWidth() - progress_text.image.GetWidth(); // ?????????????? % ???? X
progress_text.y = progress_box.y - progress_text.image.GetHeight() * 2; // ?????????????? % ???? Y
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

// DIALOG
status = "normal";
//count = 0;

function dialog_setup() {
    local.box;
    local.lock;
    local.entry;
    local.prompt_sprite;

    box.image = Image("BOX.PNG");
    lock.image = Image("LOCK.PNG");
    entry.image = Image("ENTRY.PNG");

    box.sprite = Sprite(box.image);
    box.x = Percent(50, screen.width) - box.image.GetWidth() / 2;
    box.y = Percent(85, screen.height) - box.image.GetHeight() / 1.10;
    box.z = 10000;
    box.sprite.SetPosition(box.x, box.y, box.z);

    lock.sprite = Sprite(lock.image);
    //lock.x = box.x + box.image.GetWidth()/3 -(lock.image.GetWidth() + entry.image.GetWidth()) / 30;
    lock.x = box.x + 230;
    lock.y = box.y + box.image.GetHeight()/2 - lock.image.GetHeight()/2;
    lock.z = box.z + 2;
    lock.sprite.SetPosition(lock.x, lock.y, lock.z);

    entry.sprite = Sprite(entry.image);
    //entry.x = lock.x + lock.image.GetWidth();
    entry.x = box.x + 1;
    entry.y = box.y + box.image.GetHeight()/2 - entry.image.GetHeight()/2;
    entry.z = box.z + 1;
    entry.sprite.SetPosition(entry.x, entry.y, entry.z);

    prompt_sprite = SpriteNew();
    prompt_sprite.SetPosition(box.x, box.y - 20, box.z);

    global.dialog.box = box;
    global.dialog.lock = lock;
    global.dialog.entry = entry;
    global.dialog.bullet_image = Image("BULLET.PNG");
    global.dialog.prompt_sprite = prompt_sprite;
    dialog_opacity(1);
}

function dialog_opacity(opacity) {
    dialog.box.sprite.SetOpacity(opacity);
    dialog.lock.sprite.SetOpacity(opacity);
    dialog.entry.sprite.SetOpacity(opacity);
    dialog.prompt_sprite.SetOpacity(opacity);
    for(index = 0; dialog.bullet[index]; index++) {
        dialog.bullet[index].sprite.SetOpacity(opacity);
    }
}

function display_normal_callback() {
    global.status = "normal";

    if (global.dialog)
        dialog_opacity(0);
}

function display_password_callback(prompt, bullets) {
    global.status = "password";

    if (!global.dialog)
        dialog_setup();
    else
        dialog_opacity(1);

    dialog.image = Image.Text(prompt, 1, 1, 1);
    dialog.prompt_sprite.SetImage(dialog.image);
    dialog.prompt_sprite.SetPosition(Percent(50, screen.width) - dialog.image.GetWidth() / 2, Percent(85, screen.height) - 50 - 20, 10000);

    for(index = 0; dialog.bullet[index] || index < bullets; index++) {
        if (!dialog.bullet[index]) {
            dialog.bullet[index].sprite = Sprite(dialog.bullet_image);
            dialog.bullet[index].x = dialog.entry.x + index * dialog.bullet_image.GetWidth() / 0.9 - dialog.entry.image.GetHeight() * -0.2; // ???????????? ?????????? ???? ?????????? ?? ???? ????????(modified)
            dialog.bullet[index].y = dialog.entry.y + dialog.entry.image.GetHeight() / 2 - dialog.bullet_image.GetHeight() / 2;
            dialog.bullet[index].z = dialog.entry.z + 1;
            dialog.bullet[index].sprite.SetPosition(dialog.bullet[index].x, dialog.bullet[index].y, dialog.bullet[index].z);
        }
        if (index < bullets)
            dialog.bullet[index].sprite.SetOpacity(1);
        else
            dialog.bullet[index].sprite.SetOpacity(0);
    }
}

function display_message_callback(prompt) {
    prompt = Image.Text(prompt,0.5,0.5,0.5,1);
    sprite_prompt.SetImage(prompt);
    sprite_prompt.SetPosition(x0 +(screen.width - prompt.GetWidth()) / 2, y0 + screen.height * 0.90, 2);
}

Plymouth.SetDisplayNormalFunction(display_normal_callback);
Plymouth.SetDisplayPasswordFunction(display_password_callback);
Plymouth.SetMessageFunction(display_message_callback);

// TEXT
maximum_msg = 5;
ubuntufont = "Ubuntu Mono Regular 10";
perfont = "Ubuntu Regular 12";
progressfont = "Ubuntu Mono Regular 10";
starting_text = "Starting up...";
bye_text = "System is shutting down";
progress_t= 0;
fun_curve_linear = 0;
fun_curve_in = 1;
fun_curve_out = 2;
fun_curve_in_out = 3;
radiant_factor = Math.Pi / 180;
math_pi2 = Math.Pi / 2;
dots = 5;
show_progress = 0;
fade_out_dots = 1;
fps = 13;
//anim_duration = 1600;
//anim_frames = anim_duration / 1000 * fps;

// **************************************** //

if (Plymouth.GetMode() == "boot") {
    text.image = Image.Text(starting_text,1.0,1.0,1.0,1, ubuntufont);
    text.sprite = Sprite(text.image);
    text.x = progress_box.x;
    text.y = progress_box.y - progress_text.image.GetHeight() * 2;
    text.sprite.SetPosition(text.x, text.y, 2);
} else {
    text_end.image = Image.Text(bye_text,1.0,1.0,1.0,1, ubuntufont);
    text_end.sprite = Sprite(text_end.image);
    text_end.x = progress_box.x;
    text_end.y = progress_box.y - progress_text.image.GetHeight() * 2;
    text_end.sprite.SetPosition(text_end.x, text_end.y, 6);
}

// ******** //

// SPINNER
spin = 0;

/* this function only goes up to 100
because thats all thats needed for
the progress meter bar */
function atoi(str) {
    int = -1;

    for(i = 0; i <= 100; i++) {
        if (i + "" == str) {
            int = i;
            break;
        }
    }

    return int;
}

/* This handler will/can be invoked
50 times per second.

According to the previous author of the
plash script, without this callback
the screen is not updated correctly */
spinner_sprite;
spinner;

function refreshHandler() {
    if (spin < 3.14 * 2) {
        spin = spin + 0.14;
    } else {
        spin = 0;
    }

    /* if fsck is running or the password is prompted, hide the spinner */
    if (fsck_running == 1 || passw_dialog_input_sprite.GetOpacity() == 1) {
        spinner_sprite.SetOpacity(0);
    } else {
        spinner = Image("SPINNER.PNG");
        spinner = ScaleImage(spinner, Limit(screen.width, screen.width, 1));
        spinner = spinner.Rotate(spin);
        spinner_sprite = Sprite(spinner);
        spinner_sprite.x = progress_text.x + progress_text.image.GetWidth() / 2+ spinner.GetWidth();
        spinner_sprite.y = progress_text.y;
        spinner_sprite.SetPosition(spinner_sprite.x, spinner_sprite.y, 5); // ?????????????? ???? ?????? ??????????
    }

    if (fade_dir == 0) {
        counter++;
        if (counter >= 200) {
            fade_dir = 1;
        }
    }
    else {
        counter--;
        if (counter <= 0) {
            fade_dir = 0;
        }
    }

    if ((fsck_running == 1) &&(fsck_done_fading == 0)) {
        fsck_progress_meter_sprite.SetOpacity(fsck_fade_in_counter);
        fsck_progress_fade_sprite.SetOpacity(fsck_fade_in_counter);

        if (fsck_fade_in_counter < 1) {
            fsck_fade_in_counter+= 0.025;
        } else {
            fsck_done_fading = 1;
        }
    }
}

Plymouth.SetRefreshFunction(refreshHandler);

// LOG //
NUM_SCROLL_LINES=19; //???????????????????? ?????????? ????????
LINE_WIDTH=9999; //???????????? ?????????? ????????

message_sprite=SpriteNew();

function message_callback(prompt) {
    message = Image.Text(prompt, 1.0, 1.0, 1.0);
    message_sprite.SetImage(message);
    message_sprite.SetPosition(Percent(1, screen.width), Percent(90, screen.height), 9);
    message_sprite.SetOpacity(1);
}

Plymouth.SetMessageFunction(message_callback);

// Initialising text images and their positions
// 20 is the height(including line spacing) of each line
for(i=0; i < NUM_SCROLL_LINES; i++) {
    lines[i]= Image.Text("", 1.0, 1.0, 1.0); //???????? ??????????
    message_sprite[i] = SpriteNew();
    message_sprite[i].SetPosition(Percent(1, screen.width), Percent(50, screen.height) + (i * 17), 9);
}                                    //???????????? ??????????           //???????????? ??????????

function StringLength(string) {
    index = 0;
    str = String(string);
    while(str.CharAt(index)) index++;
    return index;
}

function scroll_message_callback(text) {
    //  Truncate the message if too long
    if (StringLength(text) > LINE_WIDTH) {
        text = text.SubString(0, LINE_WIDTH - 3);
        text += "...";
    }

    //  Shift message one up
    for(i = 0; i < NUM_SCROLL_LINES - 1; i++) {
        lines[i] = lines[i+1];
    }

    //  Create the image for the latest message
    lines[i] = Image.Text(text, 1.0, 1.0, 1.0);

    //  Re-positioning the text images
    for(i = 0; i < NUM_SCROLL_LINES; i++) {
        message_sprite[i].SetImage(lines[i]);
    }
}

Plymouth.SetUpdateStatusFunction(scroll_message_callback);

// QUIT
function quit_callback()
{
    anim.sprite.SetOpacity(0);
    if (Plymouth.GetMode() == "shutdown") {
        //logo.sprite.SetOpacity(0);
    }
}

Plymouth.SetQuitFunction(quit_callback);
