@extends('layouts.layout')

@section('content')
<h1 class="text-center my-5">
    Questions And Answers
</h1>

<div class="container">
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <form class="pb-4 border-bottom" action="/" method="POST">
            @csrf
                <div class="form-group">
                    <label>Ask a question (must be at least 5 characters long and end with a '?'):</label>
                    <textarea name="question" class="form-control" placeholder="ex: {{ $exampleQuestion->exampleQuestion }}">{{ session('text') }}</textarea>
                </div>

                <div class="text-right">
                    <button class="btn btn-primary" type="submit">
                        Ask Question
                    </button>
                </div>
            </form>
            
            <h2 class="mb-3 p-3 border m-xl-auto">Answer a question:</h2>
            @foreach($questions as $question)
                <div class="p-xl-2 m-xl-auto border-bottom pb-3 mb-3">
                    <a href="{{ route('questions.show', $question->id) }}" class="text-dark card-link">
                        <h3>
                            {{ $question->question }}
                        </h3>
                        <p class="text-info font-italic">
                            Answers: {{ isset(array_count_values(array_column($answers, 'question_id'))[$question->id])
                                ? array_count_values(array_column($answers, 'question_id'))[$question->id] : 0 }}
                        </p>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
</div>
@endsection