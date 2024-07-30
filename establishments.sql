-- Create the table
CREATE TABLE establishments (
    establishment_id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),
    place_name VARCHAR(100) NOT NULL,
    short_description VARCHAR(255),
    rating DECIMAL(2, 1) CHECK (rating <= 5.0),
    dining_type VARCHAR(50),
    address VARCHAR(255) NOT NULL,
    opening_hours VARCHAR(100),
    menu VARCHAR(255)
);

INSERT INTO establishments (
    image, place_name, short_description, rating, dining_type, address, opening_hours, menu
) VALUES
    ('columbus coffee(cafe).jpg', 'Columbus coffee', 'Casual corner cafe offering brunch staples, waffles & a global menu, plus coffee & pressed juice.', 4.2, 'Cafe', '220 Upper Thomson Rd, Singapore 574352', '9:00AM - 10:00PM', 'https://www.columbuscoffeeco.com/menus'),
    ('Daizu(cafe).jpg', 'Daizu Cafe', 'Sustainable, Japanese-Western fusion dishes offered in a pared-back, compact eatery with a terrace.', 4.1, 'Cafe', '129 Rangoon Rd, Singapore 218407', '10:00Am - 10:00PM', 'https://www.daizucafe.com/menu/' ),
    ('Atlas Coffeehouse(cafe).jpg', 'ATLAS Coffeehouse', 'Hip cafe offering specialty craft coffee & tea, all-day brunch, pasta dishes & waffles.', 4.2, 'Cafe', '6 Dukes Rd, Singapore 268886', '08:00Am - 07:00PM', 'https://www.atlascoffeehouse.com.sg/menus' ),
    ('ATLAS(bar).jpg', 'ATLAS', 'Luxurious 1920s-inspired venue for European cuisine, afternoon tea & cocktails, plus art deco decor.', 4.5, '$40-$50', 'Ground floor, 600 North Bridge Rd, Parkview Square, 188778', '12:00PM - 00:00AM', 'https://atlasbar.sg/storage/app/media/EditionOne_ATLAS_OpeningMenu.pdf'),
    ('Nutmeg_Clove(bar).jpg', 'Nutmeg & Clove', 'Low-key, cozy bar offering artisanal cocktails with creative names inspired by Singapore history.', 4.5, 'Bar', '8 Purvis St, Singapore 188587', '5:00PM - 00:00AM', 'https://www.nutmegclove.com/nutmegmenu'),
    ('Tippling_club(bar).jpg', 'Tippling Club', 'Contemporary, artful spot offering an inventive, gourmet tasting menu & ambitious cocktails.', 4.6, 'Bar', '38 Tg Pagar Rd, Singapore 088461', '12:00PM - 00:00AM', 'https://www.tipplingclub.com/menus' ),
    ('Burnt_ends(restuarant).jpg', 'Burnt ends', 'Australian-style BBQ restaurant with an open kitchen & counter seating in a lively, stylish space.', 4.5, 'Restaurant', '7 Dempsey Rd, #01-02, Singapore 249671', '6:00PM - 11:00PM', 'https://burntends.com.sg/gallery/'),
    ('Carpenter and Cook(reataurant).jpg', 'Carpenter and Cook', 'Serves up tasty brunches and handmade, freshly baked pastries daily.', 4.1, 'Restaurant', '19 Lor Kilat, #01-06, Singapore 598120', '8:00AM - 6:00PM', 'https://www.carpenterandcook.com/menu'),
    ('White grass(restuarant).jpg', 'White Grass', 'Stylish eatery offering elevated & modern French fare with Japanese techniques plus cocktails.', 4.7, 'Restaurant', '30 Victoria St, #01-26/27 CHIJMES, Singapore 187996', '12:00PM - 2:30PM & 6:00PM - 10:30PM', 'https://www.whitegrass.com.sg/menus'),
    ('My awesome cafe.jpg', 'My awesome cafe', 'Handcrafted salads & sandwiches, plus wine & spirits, in a cosy spot with repurposed decor.', 4.6, 'cafe', '202 Telok Ayer St, Singapore 068639', '11:00AM - 12:00AM', 'https://www.myawesomecafe.com/#foodpre')
