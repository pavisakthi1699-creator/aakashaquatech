// Spares: tabs + products, taken from https://aakashaquatech.in/spares/
const IMG = 'https://aakashaquatech.in/wp-content/uploads/2026/05/'
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// [key, label shown in the left list]
export const spareTabs = [
  ['inline', 'INLINE FILTER CARTRIDGE'],
  ['alkaline', 'ALKALINE FILTER'],
  ['membrane', 'MEMBRANE ELEMENT'],
  ['prefilter', 'PRE FILTER HOUSING'],
  ['memhousing', 'MEMBRANE HOUSING'],
  ['float', 'FLOAT VALVE'],
  ['smps', 'SMPS'],
  ['booster', 'BOOSTER PUMP'],
  ['teflon', 'TEFLON TAPE'],
  ['uvled', 'UV LED OLIVAR'],
  ['solenoid', 'SOLENOID VALVE'],
  ['pp', 'PP SPUN FILTER'],
  ['kit', 'REPLACABLE FILTER CARTRIDGE KIT'],
  ['uvchamber', 'UV CHAMBER'],
  ['mineral', 'MINERAL CARTRIDGE'],
  ['uf', 'UF MEMBRANE'],
]

// [tab, product name, image file, price, max price (only when the live site shows a range)]
const rows = [
  ['inline', 'CYCLONE - INLINE FILTER CARTRIDGE', 'Untitled-4-03.png', 499],
  ['inline', 'STORM - INLINE FILTER CARTRIDGE', 'Untitled-4-02.png', 599],
  ['inline', 'THUNDER - INLINE FILTER CARTRIDGE', 'Untitled-4-01.png', 699],
  ['inline', 'VOLCANO - INLINE FILTER CARTRIDGE', 'VOLCANO.jpg', 699],
  ['inline', 'TORNADO - INLINE FILTER CARTRIDGE', 'TORNADO.jpg', 799],

  ['alkaline', 'CYCLONE - ALKALINE FILTER', 'Cyclone20Alkaline20Inline.png', 1499],
  ['alkaline', 'STORM - ALKALINE FILTER', 'Storm20Alkaline20Inline.png', 1699],
  ['alkaline', 'THUNDER - ALKALINE FILTER', 'Thunder20Alkaline20Inline.png', 1999],
  ['alkaline', 'CYCLONE 3 IN 1 COPPER ALKALINE ZINC - ALKALINE FILTER', 'Copper20Alkaline20Inline.png', 1999],

  ['membrane', 'CYCLONE - MEMBRANE ELEMENT', 'membrane20cyclone208020GPD20new20color.png', 1999, 2999],
  ['membrane', 'STORM - MEMBRANE ELEMENT', 'MEMBRANE20Storm2080.png', 2499, 3999],
  ['membrane', 'THUNDER - MEMBRANE ELEMENT', 'Membraine20Thunder2080.png', 2999],

  ['prefilter', 'STORM - PRE FILTER HOUSING', 'Untitled-10-04.png', 2999],
  ['prefilter', 'CYCLONE - PRE FILTER HOUSING', 'cyclone20bowl.jpg', 699],

  ['memhousing', 'CYCLONE - MEMBRANE HOUSING', 'Strom20Membrane20housing.png', 499],
  ['memhousing', 'THUNDER - MEMBRANE HOUSING', 'Untitled-5-01.png', 599],

  ['float', 'CYCLONE - FLOAT VALVE', 'Untitled-3-06-02.png', 299],
  ['float', 'STORM - FLOAT VALVE', 'Untitled-3-06-03.png', 299],
  ['float', 'THUNDER - FLOAT VALVE', 'Untitled-3-06-01.png', 299],

  ['smps', 'THUNDER - SMPS', 'Untitled-12-02.png', 999],
  ['smps', 'TORNADO - SMPS', 'TORNADO-1.jpg', 1199],

  ['booster', 'CYCLONE - BOOSTER PUMP', 'Cyclone.png', 2699],
  ['booster', 'STORM - BOOSTER PUMP', 'Storm2010020new.png', 2999],
  ['booster', 'THUNDER - BOOSTER PUMP', 'Thunder20300.png', 3499, 4599],
  ['booster', 'VOLCANO - BOOSTER PUMP', 'VOLCANO_PUMP.481.png', 3299],

  ['teflon', 'THUNDER - TEFLON TAPE', 'Asset203-100.png', 39],
  ['uvled', 'UV LED OLIVAR - UV LED OLIVAR', 'uv20led.png', 249],
  ['solenoid', 'STORM - SOLENOID VALVE', 'Untitled-13-02.png', 599],

  ['pp', 'CYCLONE - PP SPUN FILTER', 'Cyclone20PP.png', 249],
  ['pp', 'STORM - PP SPUN FILTER', 'Strom20PP.png', 299, 699],
  ['pp', 'THUNDER - PP SPUN FILTER', 'Thunder20PP.png', 349],

  ['kit', 'THUNDER - REPLACABLE FILTER CARTRIDGE KIT', 'Thunder20Replacable20Filter.png', null], // no price on the live site

  ['uvchamber', 'STORM - UV CHAMBER', 'UV20Chamber20stroma.png', 599],
  ['uvchamber', 'THUNDER - UV CHAMBER', 'Thunder20UV20Chamber.png', 799],

  ['mineral', 'Mineral Cartridge 4 Inch - MINERAL CARTRIDGE', 'mineral20cartridge20420Inch.png', 299, 499],
  ['mineral', 'Mineral Cartridge 8 Inch - MINERAL CARTRIDGE', 'mineral20cartridge.png', 299, 499],

  ['uf', 'Olivar - UF MEMBRANE', 'uf20membrane.png', 599],
]

export const spares = rows.map(([cat, name, file, price, max]) => {
  const itemSlug = slug(name)
  return {
    cat,
    name,
    slug: itemSlug,
    img: IMG + file,
    price,
    max,
    url: '/product/' + itemSlug,
  }
})