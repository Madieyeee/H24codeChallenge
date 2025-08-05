<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Snippet;

class SnippetController extends Controller
{
        public function index(Request $request)
    {
        $query = Snippet::query();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return $query->latest()->paginate(5);
    }

    public function show(Snippet $snippet)
    {
        return $snippet;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|in:PHP,HTML,CSS',
            'code' => 'required|string',
        ]);

        $snippet = Snippet::create($validated);

        return response()->json($snippet, 201);
    }

    public function update(Request $request, Snippet $snippet)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|in:PHP,HTML,CSS',
            'code' => 'required|string',
        ]);

        $snippet->update($validated);

        return response()->json($snippet);
    }

    public function destroy(Snippet $snippet)
    {
        $snippet->delete();

        return response()->json(null, 204);
    }
}
