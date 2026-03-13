<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->get();
        return Inertia::render('Categories/Index', ['categories' => $categories]);
    }

    public function create()
    {
        return Inertia::render('Categories/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);
        $validated['slug'] = Str::slug($validated['name']);
        
        Category::create($validated);
        return redirect()->route('categories.index')->with('success', __('Category created successfully.'));
    }

    public function edit(Category $category)
    {
        return Inertia::render('Categories/Form', ['category' => $category]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);
        $validated['slug'] = Str::slug($validated['name']);
        
        $category->update($validated);
        return redirect()->route('categories.index')->with('success', __('Category updated successfully.'));
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('success', __('Category deleted successfully.'));
    }
}