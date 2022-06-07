Window.GetMaxWidth = function() {
    i = 0;
    width = 0;
    while (Window.GetWidth(i)) {
        width = Math.Max(width, Window.GetWidth(i));
        i++;
    }
    return width;
};

Window.GetMaxHeight = function() {
    i = 0;
    height = 0;
    while (Window.GetHeight(i)) {
        height = Math.Max(height, Window.GetHeight(i));
        i++;
    }
    return height;
};
