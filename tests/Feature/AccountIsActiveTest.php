<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccountIsActiveTest extends TestCase
{
    use RefreshDatabase;

    public function test_active_user_can_access_home(): void
    {
        $user = User::factory()->create([
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->get('/');

        $response->assertStatus(200);
    }

    public function test_inactive_user_is_redirected_to_login(): void
    {
        $user = User::factory()->create([
            'is_active' => false,
        ]);

        $response = $this->actingAs($user)->get('/');

        $response->assertRedirect(route('login'));
        $response->assertSessionHasErrors(['username']);
        $this->assertGuest();
    }
}
