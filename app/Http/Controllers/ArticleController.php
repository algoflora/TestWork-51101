<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::latest()
            ->where('public', true)
            ->orWhere('user_id', Auth::user() ? Auth::user()->id : null)
            ->select('id', 'title', 'description', 'user_id', 'public')
            ->paginate(5);

        return response()->json($articles);
            // ->with('i', (request()->input('page', 1) - 1) * 5);
    }

    // /**
    //  * Show the form for creating a new resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Auth::user()) {
            return response(null, 401);
        }

        $request->validate([
            'title' => 'required',
            'description' => 'required|nullable',
            'content' => 'required',
            'public' => 'required'
        ]);

        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        unset($data['id']);

        $article = Article::create($data);

        return response()->json($article->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        if (!$article->public && $article->user_id != Auth::user()['id']) {
            return response(null, 401);
        }

        return response()->json($article);
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  *
    //  * @param  \App\Models\Article  $article
    //  * @return \Illuminate\Http\Response
    //  */
    // public function edit(Article $article)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        if ($article->user_id != Auth::user()->id) {
            return response(null, 401);
        }

        $request->validate([
            'title' => 'required',
            'description' => 'required|nullable',
            'content' => 'required',
            'user_id' => 'required',
            'public' => 'required'
        ]);

        $article->update($request->all());

        return response(null, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        if ($article->user_id != Auth::user()->id) {
            return response(null, 401);
        }

        $article->delete();
        return response(null, 200);
    }
}
