<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
echo "Office count: " . App\Models\Office::count() . "\n";
echo "User count: " . App\Models\User::count() . "\n";
echo "Admin user: " . (App\Models\User::where('username', 'admin')->exists() ? 'Exists' : 'Missing') . "\n";
