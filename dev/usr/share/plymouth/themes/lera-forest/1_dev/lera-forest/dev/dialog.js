function dialog_opacity(opacity) {
    dialog.box.sprite.SetOpacity(opacity);
    dialog.lock.sprite.SetOpacity(opacity);
    dialog.entry.sprite.SetOpacity(opacity);
    dialog.text.sprite.SetOpacity(opacity);
    dialog.prompt_sprite.SetOpacity(opacity);

    for(index = 0; dialog.bullet[index]; index++) {
        dialog.bullet[index].sprite.SetOpacity(opacity);
    }
}

function dialog_setup() {
    local.box;
    local.lock;
    local.entry;
    local.text;

    box.image = Image("BOX.PNG");
    lock.image = Image("LOCK.PNG");
    entry.image = Image("ENTRY.PNG");

    box.sprite = Sprite(box.image);
    box.x = percent(75, screen.width) - box.image.GetWidth() / 2;
    box.y = percent(60, screen.height) - box.image.GetHeight() / 2;
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
    dialog_opacity(1);
}
