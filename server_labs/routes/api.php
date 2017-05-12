<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::group(['prefix' => 'v1', 'middleware' => 'auth:api'], function () {
	
	Route::get('user-list', 'UsersController@getUserList');

	// Chat urls
	Route::post('get-user-conversation', 'ChatsController@getUserConversationById');
	

	Route::post('chat-save', 'ChatsController@saveUserChat');

	// Private messeages urls
	Route::post('get-private-message-notifications', 'PrivateMessagesController@getUserNotifications');

	Route::post('get-private-messages', 'PrivateMessagesController@getPrivateMessages');
	
	Route::post('get-private-message', 'PrivateMessagesController@getPrivateMessageById');
	
	Route::post('get-private-messages-sent', 'PrivateMessagesController@getPrivateMessageSent');
	
	Route::post('send-private-message', 'PrivateMessagesController@sendPrivateMessage');
});