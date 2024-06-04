<?php

namespace App\Http\Controllers\API;

use App\Events\PostCommentCountEvent;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $postId = $request->get('post_id');
        $comments = Comment::select('id', 'user_id', 'comment', 'created_at', 'post_id')->where('post_id', $postId)->with('user')->orderByDesc('id')->cursorPaginate(15);
        return response()->json($comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $payload = $request->validate([
            'post_id' => 'required',
            'comment' => 'required|min:2|max:2000'
        ]);

        try {
            $user = $request->user();
            $payload['user_id'] = $user->id;
            Post::where('id', $payload['post_id'])->increment('comment_count', 1);
            $comment = Comment::create($payload)->with('user')->orderByDesc('id')->first();
            PostCommentCountEvent::dispatch($payload['post_id']);
            return response()->json(['comment' => $comment, 'message' => 'Comment created successfully'], 201);
        } catch (\Throwable $err) {
            Log::info('Comment error =>' . $err->getMessage());
            return response()->json(['message' => 'Something went wrong. Please try again leter!'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}