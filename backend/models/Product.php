<?php
class Product
{
    private $db;

    public function __construct($dbConnection = null)
    {
        $this->db = $dbConnection;
    }

    public function getAll($category = null)
    {
        // Static mock data fallback when DB is freshly initialized
        $items = [
            [
                'id' => 1,
                'title' => 'Industrial RO Plant 10,000 LPH',
                'category' => 'industrial-ro',
                'capacity' => '10,000 Liters / Hour',
                'description' => 'Heavy-duty multi-stage reverse osmosis plant designed for manufacturing facilities, food processing, and pharmaceuticals with SS304/SS316 high-pressure piping and automated PLC controls.',
                'recoveryRate' => '65% - 75%',
                'features' => ['FRP / Stainless Steel Skid', 'High rejection Dow Filmtec membranes', 'Grundfos / CNP High Pressure Pump', 'Automatic backwash sand & carbon filters'],
                'tag' => 'Heavy Industrial'
            ],
            [
                'id' => 2,
                'title' => 'Commercial RO Plant 2,000 LPH',
                'category' => 'commercial-ro',
                'capacity' => '2,000 Liters / Hour',
                'description' => 'Ideal for educational institutions, corporate tech parks, hospitals, and residential townships. Provides crystal-clear pure drinking water adhering to WHO & BIS standards.',
                'recoveryRate' => '60% - 70%',
                'features' => ['TDS Controller & UV disinfection', 'Low energy consumption', 'Stainless steel skid frame', 'Digital flow meters & pressure gauges'],
                'tag' => 'Most Popular'
            ],
            [
                'id' => 3,
                'title' => 'Automatic Commercial Water Softener',
                'category' => 'water-softeners',
                'capacity' => '5,000 - 50,000 LPD',
                'description' => 'Ion exchange water softener prevents scaling in pipes, boilers, heat exchangers, cooling towers, and bathroom fixtures, dramatically extending appliance lifespan.',
                'recoveryRate' => '98%',
                'features' => ['Automatic multiport control valve', 'High-capacity virgin cation resin', 'Brine tank with salt float valve', 'Zero maintenance design'],
                'tag' => 'Hard Water Solution'
            ],
            [
                'id' => 4,
                'title' => 'Dual Bed Demineralization (DM) Plant',
                'capacity' => '1,000 - 15,000 LPH',
                'category' => 'dm-plants',
                'description' => 'Produces ultra-pure water with conductivity < 5 microsiemens/cm for chemical labs, electroplating, power plants, and battery manufacturing.',
                'recoveryRate' => '95%',
                'features' => ['Cation & Anion FRP columns', 'Degasser tower option', 'Hydrochloric acid and caustic soda regeneration system', 'Conductivity meter monitor'],
                'tag' => 'High Purity'
            ],
            [
                'id' => 5,
                'title' => 'Sewage Treatment Plant (STP - MBR/MBBR)',
                'capacity' => '20 KLD - 500 KLD',
                'category' => 'stp-etp',
                'description' => 'Advanced membrane bioreactor (MBR) and moving bed biofilm reactor (MBBR) STP for residential communities, resorts, and industrial complexes to recycle wastewater for flushing and gardening.',
                'recoveryRate' => '85% - 90%',
                'features' => ['Meets PCB standards', 'Odorless operation & compact footprint', 'Biological digestion with diffused aeration', 'Zero Liquid Discharge (ZLD) compatible'],
                'tag' => 'Eco Friendly'
            ],
            [
                'id' => 6,
                'title' => 'RO Membranes & Spares Supply',
                'capacity' => 'Standard Industrial Sizes (4040 / 8040)',
                'category' => 'spares-accessories',
                'description' => 'Original membrane elements from top brands, high-pressure pumps, micron cartridges, antiscalant chemicals, and automatic multi-port valves.',
                'recoveryRate' => 'High Rejection 99.5%',
                'features' => ['Filmtec, Hydranautics, Toray elements', 'Rotameters and pressure switches', 'FRP pressure vessels 300 - 1000 PSI', 'Dosing pumps and level sensors'],
                'tag' => 'Genuine Spares'
            ]
        ];

        if ($category) {
            $items = array_values(array_filter($items, function($item) use ($category) {
                return $item['category'] === $category;
            }));
        }

        return $items;
    }
}
