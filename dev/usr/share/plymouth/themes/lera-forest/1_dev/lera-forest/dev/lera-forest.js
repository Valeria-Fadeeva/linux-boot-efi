/*
Theme Name: lera-forest
Version: 1.0
Description: My theme
Author: Valeria Fadeeva - https://github.com/Valeria-Fadeeva
Date: 2022.05.02
License: GNU AFFERO GENERAL PUBLIC LICENSE, see <http://www.gnu.org/licenses/>
*/

import 'window.js';
import 'math.js';
import 'string.js';
import 'sprite.js';
import 'animate.js';
import 'dialog.js';
import 'callback.js';

global.screen;
global.background;
global.progress_bar;
global.progress_box;
global.progress_fade;
global.show_details;
global.percent = 30;
global.limit;

global.x0 = Window.GetX();
global.y0 = Window.GetY();
global.z0 = Window.GetY();

global.counter = 0;
global.fade_dir = 0;

global.NUM_SCROLL_LINES = 10;
global.LINE_WIDTH = 55;
global.CHAR_WIDTH = 7;
global.CHAR_HEIGHT = 10;
global.msg_color = [1, 1, 1];
global.pretext = String("");
global.status__ = "normal";

// ----------------------------------

screen.width =  Window.GetMaxWidth();
screen.height = Window.GetMaxHeight();

background.image = Image("BACKGROUND.PNG");
background.image = ScaleImage(background.image, Window)

if(background.image.GetWidth() == screen.width && background.image.GetHeight() == screen.height) {
    background.sprite = SetSpriteImage_(background.image, x0, y0, z0);
} else {
    background.x = Math.Int(screen.width / 2 - background.image.GetWidth() / 2);
    background.y = Math.Int(screen.height / 2 - background.image.GetHeight() / 2);
    background.sprite = SetSpriteImage_(background.image, background.x, background.y, z0);
}

limit = Limit(screen.width, screen.height, percent);

logo.image = Image("MAIN-LOGO.PNG");
logo.image = ScaleImage(logo.image, limit);

logo.width = logo.image.GetWidth();
logo.height = logo.image.GetHeight();

logo.sprite = Sprite(logo.image);
logo.sprite.SetOpacity(1);
logo.x = percent(50, screen.width) - logo.sc_width / 2;
logo.y = percent(50, screen.height) - logo.sc_height / 2;
logo.sprite.SetPosition(logo.x, logo.y, 1);

show_details.image = Image("SHOW-DETAILS.PNG");
show_details.sprite = Sprite(show_details.image);
show_details.x = logo.x;
show_details.y = logo.y + logo.sc_height + 10;
show_details.sprite.SetPosition(show_details.x, show_details.y, 5);

assets.spinner_base = "";

global.spin = Spinner();

progress_bar.image = Image("PROGRESS_BAR.PNG");
progress_bar.width = progress_bar.image.GetWidth();
progress_bar.height = progress_bar.image.GetHeight();

progress_bar.sprite = Sprite();
progress_bar.x = percent(50, screen.width) - progress_bar.width / 2;
progress_bar.y = show_details.y + show_details.height + 10 + progress_bar.height / 2;
progress_bar.sprite.SetPosition(progress_bar.x, progress_bar.y, 6);

progress_box.image = Image("PROGRESS_BOX.PNG");
progress_box.width = progress_box.image.GetWidth();
progress_box.height = progress_box.image.GetHeight();

progress_box.sprite = Sprite(progress_box.image);
progress_box.x = percent(50, screen.width) - progress_box.width / 2;
progress_box.y = show_details.y + show_details.height + 10 + progress_box.height / 2;
progress_box.sprite.SetPosition(progress_box.x, progress_box.y, 5);

logotype.image = Image("");

progress_fade.image = Image("PROGRESS_FADE.PNG");
progress_fade.sprite = Sprite(progress_fade.image);
fsck_progress_fade.image = Image("");

progress_meter.image = Image("");
progress_meter.sprite = Sprite(progress_meter.image);
fsck_progress_meter.image = Image("");

progress_meter.x = progress_bar.x;
progress_meter.y = progress_bar.y;
progress_meter.sprite.SetPosition(progress_meter.x, progress_meter.y, 6);


// Initialising text images and their positions
// 20 is the height(including line spacing) of each line
for(i=0; i < NUM_SCROLL_LINES; i++) {
    lines[i]= Image.Text("", msg_color[0], msg_color[1], msg_color[2]);
    message_sprite[i] = Sprite();
    message_sprite[i].SetPosition(progress_bar.x,(progress_bar.y + progress_bar.height + 10) +(i * 20), 10000);
}


Plymouth.SetBootProgressFunction(boot_progress_callback);
Plymouth.SetBootProgressFunction(progress_callback);
Plymouth.SetRefreshFunction(refresh_callback);
Plymouth.SetUpdateStatusFunction(update_status_callback);
Plymouth.SetUpdateStatusFunction(scroll_message_callback);
Plymouth.SetDisplayNormalFunction(display_normal_callback);
Plymouth.SetDisplayPasswordFunction(display_password_callback);
Plymouth.SetDisplayMessageFunction(display_message_callback);
Plymouth.SetQuitFunction(quit_callback);
