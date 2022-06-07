function StringLength(string) {
    index = 0;
    str = String(string);
    while (str.CharAt(index)) index++;
    return index;
}
