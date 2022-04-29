#!/usr/bin/env python3


class W_obj:
    def __init__(self, width, height):
        self.width = int(width)
        self.height = int(height)

        if self.width > 0 and self.height > 0:
            self.ratio = max(self.width, self.height) / \
                min(self.width, self.height)
        else:
            self.ratio = 0

    def __str__(self):
        return f"{self.__class__.__name__} {self.__dict__}"


class Screen(W_obj):
    pass


class Image(W_obj):
    pass


class Limit(W_obj):
    pass


def percent(perc, pixels):
    result = int(abs(int(pixels)) / 100 * abs(int(perc)))
    return result


screen = Screen(1920, 1080)

perc = 30

limit = Limit(percent(perc, 1920), percent(perc, 1080))

a = 1
if a == 1:
    image = Image(704, 906)
elif a == 2:
    image = Image(906, 704)
else:
    image = Image(300, 200)

ma = max(image.__dict__['width'], image.__dict__['height'])
mi = min(limit.__dict__['width'], limit.__dict__['height'])
m_factor = ma / mi
print(f'ratio ma {ma} / mi {mi} = m_factor {m_factor}')

image2 = Image(image.__dict__['width'] / m_factor, image.__dict__['height'] / m_factor)

print(screen)
print(limit)
print(image)
print(image2)

