<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with(['category', 'tags'])->latest()->get();
        return Inertia::render('Articles/Index', ['articles' => $articles]);
    }

    public function create()
    {
        return Inertia::render('Articles/Form', [
            'categories' => Category::all(),
            'tags' => Tag::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id'
        ]);
        
        $validated['slug'] = Str::slug($validated['title']);
        $validated['is_published'] = $request->boolean('is_published');
        
        $article = Article::create($validated);
        
        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }
        
        return redirect()->route('articles.index')->with('success', 'Article created successfully.');
    }

    public function edit(Article $article)
    {
        $article->load('tags');
        return Inertia::render('Articles/Form', [
            'article' => $article,
            'categories' => Category::all(),
            'tags' => Tag::all()
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id'
        ]);
        
        $validated['slug'] = Str::slug($validated['title']);
        $validated['is_published'] = $request->boolean('is_published');
        
        $article->update($validated);
        
        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        } else {
            $article->tags()->detach();
        }
        
        return redirect()->route('articles.index')->with('success', __('Article updated successfully.'));
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->route('articles.index')->with('success', __('Article deleted successfully.'));
    }
}