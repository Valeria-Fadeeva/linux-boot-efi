Spinner = function() {
    // FIXME: try to use this=
    spinner = global.Spinner | [];
    spinner.count = 120;
    spinner.current_idx = 0;
    spinner.last_time = 0;
    spinner.steps = 10.0; // We render degrees in increments of 10 to save disk.
    spinner.duration = 3.0; // Seconds per rotation.
    for(i = 0; i <= spinner.count; ++i) {
        if (i % spinner.steps != 0) {
            continue;
        }

        spinner[i] = SpriteImage(assets.spinner_base + "THROBBER-ANIM-" + i + ".PNG");
        spinner[i].x = logo.sp_x + logo.sc_width - spinner[i].GetImage().GetWidth();
        spinner[i].y = logo.sp_y + logo.sc_height + 10;
        spinner[i].SetPosition(spinner[i].x, spinner[i].y, 9);
        spinner[i].SetOpacity(0);
    }
    return spinner;
} | [];

Spinner.Animate = function(time) {
    degrees = Math.Int(((2 * Math.Pi / duration) * time) *(180 / Math.Pi));
    new_ = degrees % count;
    old_ = current_idx;

    if (Math.Int(new_) < Math.Int((old_ + steps) % count)) {
        // Every $steps degrees we can render a frame, all others we skip.
        return;
    }

    // We set a second new which is now a correct index bump by coercing it
    // into a multiple of 10.
    new_ = Math.Int(new_ / steps) * steps;
    // Debug("going from " + old_ + " to " + new_);
    // dps = time - last_time;
    // DebugMedium("dps " + dps*35);
    // last_time = time;

    this[old_].SetOpacity(0);
    this[new_].SetOpacity(1);
    current_idx = new_;
    return this;
};

Spinner.GetY = function() {
    return this[0].GetY();
};

Spinner.GetHeight = function() {
    return this[0].height;
};
