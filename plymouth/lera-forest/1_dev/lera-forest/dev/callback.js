function progress_callback(duration, progress) {
    if (progress_bar.width != Math.Int(346 * progress)) {
        progress_bar.sc_image = progress_bar.image.Scale(346 * progress, progress_bar.height);
        progress_bar.sprite.SetImage(progress_bar.image);
    }
}

function boot_progress_callback(time, progress) {
    spin.Animate(time);
    //main_logo.sp_sprite.SetOpacity(time * 2.0);
    progress_callback(duration, progress);
}

function update_status_callback(status__) {
    if (status__ == "failed") msg_color = [1,0,0];
    if (status__ == "warning") msg_color = [0.8,0.8,0];
    if (status__ == "normal") msg_color = [0.5,0.5,0.5];
}

function display_normal_callback() {
    global.status__ = "normal";
    if (global.dialog) {
        dialog_opacity(0);
    }
}

function display_message_callback(prompt) {
    prompt = Image.Text(prompt,0.0,0.0,0.0,1);
    sprite_prompt.SetImage(prompt);
    sprite_prompt.SetPosition(x0 +(screen_width - prompt.GetWidth()) / 2, y0 + screen_height * 0.10, 2);
}

function scroll_message_callback(text) {
    nobreak = 0;
    if (text.CharAt(0) == ">") {
        // "no linebreak" flag, like "-n"
        // remove ">" at front
        text = text.SubString(1, StringLength(text));
        nobreak = 1;
    }

    if ((pretext == "") || (StringLength(text) > 2)) {
        // ignore messages of only a single dot
        if (text == ".") {
            return;
        }

        if (nobreak == 1) {
            pretext = text;
        }

        // Truncate the message if too long
        if (StringLength(text) > LINE_WIDTH) {
            text = text.SubString(0, LINE_WIDTH - 3);
            text += "...";
        }

        // Shift message one up
        for(i = 0; i < NUM_SCROLL_LINES - 1; i++) {
            lines[i] = lines[i+1];
        }
    } else {
    // the previous message was flagged to have no linebreak

    // Truncate the message if too long
    if (StringLength(text) > LINE_WIDTH - 5) {
        // leave min. 5 for pretext
        text = text.SubString(0, LINE_WIDTH - 8);
        text += "...";
    }

    // Truncate the previous message if too long
    if (StringLength(pretext) >(LINE_WIDTH - StringLength(text))) {
        pretext = pretext.SubString(0, LINE_WIDTH - StringLength(text) - 3);
        pretext += "...";
    }

    text = pretext + text;
        if (nobreak == 1) {
            pretext = text;
        } else {
            pretext = ">";
        }
    }

    // Create the image for the latest message
    lines[i] = Image.Text(text, msg_color[0], msg_color[1], msg_color[2]);

    // Re-positioning the text images
    for(i = 0; i < NUM_SCROLL_LINES; i++) {
        message_sprite[i].SetImage(lines[i]);
    }
}

function display_password_callback(prompt, bullets) {
    global.status__ = "password";

    if (!global.dialog) {
        dialog_setup();
    } else {
        dialog_opacity(1);
    }

    dialog.prompt_sprite.SetImage(Image.Text(prompt, 0.8,0.8,0.8,1, passwordfont));

    for(index = 0; dialog.bullet[index] || index < bullets; index++) {
        if (!dialog.bullet[index]) {
            dialog.bullet[index].sprite = Sprite(dialog.bullet_image);
            // отступ точки от точки и от поля(modified)
            dialog.bullet[index].x = dialog.entry.x + index * dialog.bullet_image.GetWidth() / 0.8 - dialog.entry.image.GetHeight() * -0.2;
            dialog.bullet[index].y = dialog.entry.y + dialog.entry.image.GetHeight() / 1.9 - dialog.bullet_image.GetHeight() / 2;
            dialog.bullet[index].z = dialog.entry.z + 1;
            dialog.bullet[index].sprite.SetPosition(dialog.bullet[index].x, dialog.bullet[index].y, dialog.bullet[index].z);
        }

        if (index < bullets) {
            dialog.bullet[index].sprite.SetOpacity(1);
        } else {
            dialog.bullet[index].sprite.SetOpacity(0);
        }
    }
}

function refresh_callback() {
    if (status__ == "normal" && Plymouth.GetMode() == "boot") {
        progress_fade.sp_sprite.SetOpacity(0); // полностью прозрачный
        progress_bar.sp_sprite.SetOpacity(1);
    } else {
        progress_fade.sp_sprite.SetOpacity(1);
        progress_bar.sp_sprite.SetOpacity(0);
    }

    progress_fade.sp_sprite.SetPosition(counter + progress_bar.sp_x, progress_bar.sp_y, 6);

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

    if ((fsck_running == 1) &&(fsck_done_fading == 0)) {
        fsck_progress_meter.sp_sprite.SetOpacity(fsck_fade_in_counter);
        fsck_progress_fade.sp_sprite.SetOpacity(fsck_fade_in_counter);

        if (fsck_fade_in_counter < 1) {
            fsck_fade_in_counter+= 0.025;
        } else {
            fsck_done_fading = 1;
        }
    }

    update();
}

function quit_callback() {
    progress_fade_sprite.SetOpacity(1);
    progress_bar.sprite.SetOpacity(0);
}
