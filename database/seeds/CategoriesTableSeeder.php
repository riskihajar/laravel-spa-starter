<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                "name" => "Pertanian",
                "slug" => "pertanian"
            ],
            [
                "name" => "Pertanian Dalam Arti Luas",
                "slug" => "pertanian-dalam-arti-luas"
            ],
            [
                "name" => "Pendidikan",
                "slug" => "pendidikan"
            ],
            [
                "name" => "Infrastruktur",
                "slug" => "infrastruktur"
            ],
            [
                "name" => "Kesehatan",
                "slug" => "kesehatan"
            ],
            [
                "name" => "Industri",
                "slug" => "industri"
            ]
        ];

        \App\Category::truncate();
        foreach($data as $item) \App\Category::create($item);
    }
}
