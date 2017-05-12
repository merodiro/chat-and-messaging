<?php

namespace App\Http\Controllers;

use App\Chat;
use Illuminate\Http\Request;
use Vinkla\Pusher\Facades\Pusher;

class chatsController extends Controller
{
    public function getUserConversationById (Request $request)
    {
    	$userId = $request->input('id');
    	$authUserId = $request->user()->id;
    	$chats = Chat::whereIn('sender_id', [$authUserId, $userId])
    		->whereIn('receiver_id', [$authUserId, $userId])
    		->orderBy('created_at', 'asc')
    		->get();
    		return response(['data' => $chats], 200);
    }

    public function saveUserChat(Request $request)
    {
        $sender_id = $request->user()->id;   
        $receiver_id = $request->input('receiver_id');   
        $chatText = $request->input('chat');


        $data = [
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'chat' => $chatText,
            'read' => 1

        ];

        $chat = Chat::create($data);
        $finalData = Chat::where('id', $chat->id)->first();

        Pusher::trigger('chat_channel', 'chat_saved', ['message' => $finalData]);

        return response(['data' => $finalData], 201);
    }
}
